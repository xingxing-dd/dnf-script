package info.xingxingdd.dnf.script.plugin;

import static org.opencv.android.OpenCVLoader.OPENCV_VERSION;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import org.autojs.plugin.sdk.Plugin;
import org.opencv.android.InstallCallbackInterface;
import org.opencv.android.LoaderCallbackInterface;
import org.opencv.android.OpenCVLoader;
import org.opencv.matcher.BlackImageMatcher;
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
        try {
            MatchTemplate sourceTemplate = new MatchTemplate(
                    source,
                    (int) (source.getWidth() * 0.35),
                    (int) (source.getWidth() * 0.65),
                    (int) (source.getHeight() * 0.35),
                    (int) (source.getHeight() * 0.65)
            );
            boolean blackImgDetectResult = BlackImageMatcher.match(sourceTemplate, 10);
            if (blackImgDetectResult) {
                YoloV5Ncnn.Obj obj =  yoloV5Ncnn.new Obj();
                obj.label = "black-screen";
                obj.w = source.getWidth() * 0.3f;
                obj.h = source.getWidth() * 0.3f;
                obj.x = source.getWidth() * 0.35f;
                obj.w = source.getWidth() * 0.35f;
                obj.prob = 1;
                return List.of(obj);
            }
            if (yoloV5Ncnn == null) {
                yoloV5Ncnn = YoloV5Ncnn.getInstance(getSelfContext().getAssets(), "model/best.ncnn");
            }
            YoloV5Ncnn.Obj[] result = yoloV5Ncnn.detect(source, false);
            if (result != null && result.length> 0) {
                return Arrays.stream(result).filter(r -> r.prob >= ratioThreshold).collect(Collectors.toList());
            }
            return List.of();
        } catch (Throwable e) {
            Log.e("检测失败", e.getLocalizedMessage());
            return null;
        }
    }

    public MatchResult match(Bitmap sourceImg, String[] templates, Double[] bounds) {
        try {
            Log.i("dnf-script-plugin",  "宽：" + sourceImg.getWidth() + ",高" + sourceImg.getHeight());
            MatchTemplate source = new MatchTemplate(
                    sourceImg,
                    (int) (sourceImg.getWidth() * bounds[0]),
                    (int) (sourceImg.getWidth() * bounds[1]),
                    (int) (sourceImg.getHeight() * bounds[2]),
                    (int) (sourceImg.getHeight() * bounds[3])
            );
            for (String template: templates) {
                Bitmap targetImg = DnfScriptPluginUtils.loadBitmap(getSelfContext(), "template/" + template + ".jpg");
                if (targetImg == null) {
                    return null;
                }
                Log.i("dnf-script-plugin", source.getLeft() + "," + source.getRight() + "," + source.getTop() + "," + source.getBottom());
                MatchTemplate target = new MatchTemplate(targetImg);
                MatchResult matchResult = TemplateMatcher.match(target, source, 1f);
                Log.i("dnf-script-plugin", "匹配结果:" + matchResult);
                if (matchResult != null) {
                    return matchResult;
                }
            }
        } catch (Throwable e) {
            Log.e("检测失败", e.getLocalizedMessage());
        }
        return null;
    }

    public boolean blackScreenDetect(Bitmap source) {
        MatchTemplate sourceTemplate = new MatchTemplate(
                source,
                (int) (source.getWidth() * 0.4),
                (int) (source.getWidth() * 0.6),
                (int) (source.getHeight() * 0.4),
                (int) (source.getHeight() * 0.6)
        );
        boolean detectResult =  BlackImageMatcher.match(sourceTemplate, 10);
        Log.i("dnf-script-plugin", "识别黑屏结果结果:" + detectResult);
        return detectResult;
    }

}
