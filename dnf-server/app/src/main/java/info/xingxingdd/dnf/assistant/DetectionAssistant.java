package info.xingxingdd.dnf.assistant;

import android.content.Context;
import android.util.Log;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionAssistant {

    public static YoloV5Ncnn yoloV5Ncnn;

    public static void initDetectionEngine(Context context) {
        try {
            //目标检测
            yoloV5Ncnn = YoloV5Ncnn.getInstance(context.getAssets(), "yolov5s");
        } catch (Throwable e) {
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
        }
    }

}
