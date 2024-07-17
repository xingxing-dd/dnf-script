package info.xingxingdd.dnf.assistant;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.benjaminwan.ocrlibrary.OcrEngine;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.chinese.ChineseTextRecognizerOptions;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionAssistant {

    public static YoloV5Ncnn yoloV5Ncnn;

    public static OcrEngine ocrEngine;

    public static TextRecognizer recognizer;

    public static void initDetectionEngine(Context context) {
        try {
            //目标检测
            yoloV5Ncnn = YoloV5Ncnn.getInstance(context.getAssets(), "yolov5s");
            //ocr识别
            recognizer = TextRecognition.getClient(new ChineseTextRecognizerOptions.Builder().build());
        } catch (Throwable e) {
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
        }
    }

}
