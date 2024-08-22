package info.xingxingdd.dnf.script.plugin;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import org.autojs.plugin.sdk.Plugin;
import org.opencv.android.OpenCVLoader;
import org.opencv.matcher.MatchResult;
import org.opencv.matcher.MatchTemplate;
import org.opencv.matcher.TemplateMatcher;

import java.util.List;

import info.xingxingdd.dnf.script.plugin.utils.DnfScriptPluginUtils;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DnfScriptPlugin extends Plugin {

    private static YoloV5Ncnn yoloV5Ncnn;

    public DnfScriptPlugin(Context context, Context selfContext, Object runtime, Object topLevelScope) {
        super(context, selfContext, runtime, topLevelScope);
        OpenCVLoader.initDebug();
    }

    @Override
    public String getAssetsScriptDir() {
        return "plugin";
    }

    public YoloV5Ncnn.Obj[] detect(Bitmap source) {
        if (yoloV5Ncnn == null) {
            yoloV5Ncnn = YoloV5Ncnn.getInstance(getSelfContext().getAssets(), "model/yolov5s");
        }
        return yoloV5Ncnn.detect(source, false);
    }

    public MatchResult match(Bitmap sourceImg, String template, Double[] bounds) {
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
    }

}
