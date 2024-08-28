package info.xingxingdd.dnf.script.plugin;

import static org.opencv.android.OpenCVLoader.OPENCV_VERSION;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import org.autojs.plugin.sdk.Plugin;
import org.opencv.android.InstallCallbackInterface;
import org.opencv.android.LoaderCallbackInterface;
import org.opencv.android.OpenCVLoader;
import org.opencv.matcher.MatchResult;
import org.opencv.matcher.MatchTemplate;
import org.opencv.matcher.TemplateMatcher;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.script.plugin.utils.DnfScriptPluginUtils;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DnfScriptPlugin extends Plugin {

    private static YoloV5Ncnn yoloV5Ncnn;

    public DnfScriptPlugin(Context context, Context selfContext, Object runtime, Object topLevelScope) {
        super(context, selfContext, runtime, topLevelScope);
        //初始化opencv
        OpenCVLoader.initDebug();
    }

    @Override
    public String getAssetsScriptDir() {
        return "plugin";
    }

    public List<YoloV5Ncnn.Obj> detect(Bitmap source, float ratioThreshold) {
        if (yoloV5Ncnn == null) {
            yoloV5Ncnn = YoloV5Ncnn.getInstance(getSelfContext().getAssets(), "model/yolov5s");
        }
        YoloV5Ncnn.Obj[] result = yoloV5Ncnn.detect(source, false);
        if (result == null || result.length == 0) {
            return new ArrayList<>();
        }
        return Arrays.stream(result).filter(r -> r.prob >= ratioThreshold).collect(Collectors.toList());
    }

    public MatchResult match(Bitmap sourceImg, String template, Double[] bounds) {
        try {
            MatchTemplate source = new MatchTemplate(
                    sourceImg,
                    (int) (sourceImg.getWidth() * bounds[0]),
                    (int) (sourceImg.getWidth() * bounds[1]),
                    (int) (sourceImg.getHeight() * bounds[2]),
                    (int) (sourceImg.getHeight() * bounds[3])
            );
            Bitmap targetImg = DnfScriptPluginUtils.loadBitmap(getSelfContext(), "template/" + template + ".jpg");
            if (targetImg == null) {
                return null;
            }
            Log.i("dnf-script-plugin", source.getLeft() + "," + source.getRight() + "," + source.getTop() + "," + source.getBottom());
            MatchTemplate target = new MatchTemplate(targetImg);
            return TemplateMatcher.match(target, source, 0.8f);
        } catch (Throwable e) {
            Log.e("检测失败", e.getLocalizedMessage());
            return null;
        }
    }

}
