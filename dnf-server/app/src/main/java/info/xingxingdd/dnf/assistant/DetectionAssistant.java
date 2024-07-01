package info.xingxingdd.dnf.assistant;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.benjaminwan.ocrlibrary.OcrEngine;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionAssistant {

    public static YoloV5Ncnn yoloV5Ncnn;

    public static OcrEngine ocrEngine;

    public static void initDetectionEngine(Context context) {
        try {
            yoloV5Ncnn = YoloV5Ncnn.getInstance(context.getAssets(), "yolov5s");
        } catch (Throwable e) {
            e.printStackTrace();
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
        }
    }

}
