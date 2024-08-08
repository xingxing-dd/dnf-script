package info.xingxingdd.dnf.assistant;

import static org.opencv.android.OpenCVLoader.OPENCV_VERSION;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.Toast;

import org.opencv.android.InstallCallbackInterface;
import org.opencv.android.LoaderCallbackInterface;
import org.opencv.android.OpenCVLoader;

import java.io.InputStream;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionAssistant {

    public static YoloV5Ncnn yoloV5Ncnn;

    public static AssetManager assetManager;

    public static void initDetectionEngine(Context context) {
        try {
            assetManager = context.getAssets();
            //目标检测
            yoloV5Ncnn = YoloV5Ncnn.getInstance(assetManager, "yolov5s");
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

}
