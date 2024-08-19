package info.xingxingdd.dnf.assistant;

import static org.opencv.android.OpenCVLoader.OPENCV_VERSION;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.chinese.ChineseTextRecognizerOptions;

import org.opencv.android.InstallCallbackInterface;
import org.opencv.android.LoaderCallbackInterface;
import org.opencv.android.OpenCVLoader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionAssistant {

    public static YoloV5Ncnn yoloV5Ncnn;

    public static AssetManager assetManager;

    public static TextRecognizer recognizer;

    public static Map<String, Map<String, Float>> templates;

    public static void initDetectionEngine(Context context) {
        try {
            assetManager = context.getAssets();
            //目标检测
            yoloV5Ncnn = YoloV5Ncnn.getInstance(assetManager, "yolov5s");
            //初始化ocr
            recognizer = TextRecognition.getClient(new ChineseTextRecognizerOptions.Builder().build());
            //初始化opencv
            OpenCVLoader.initDebug();
        } catch (Throwable e) {
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
        }
    }

    public static Bitmap readBitmap(String filepath) {
        try (InputStream is = assetManager.open(filepath)) {
            return BitmapFactory.decodeStream(is);
        } catch (Exception e) {
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
            return null;
        }
    }
    public static String readStringFromAssets(String fileName) {
        StringBuilder fileContent = new StringBuilder();
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(assetManager.open(fileName)))) {
            String line;
            while ((line = reader.readLine()) != null) {
                fileContent.append(line).append("\n");
            }
        } catch (IOException e) {
            // 如果发生异常，这里可以记录错误日志
        }
        return fileContent.toString();
    }

}
