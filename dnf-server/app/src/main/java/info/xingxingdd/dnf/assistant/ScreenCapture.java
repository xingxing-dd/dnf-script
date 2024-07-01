package info.xingxingdd.dnf.assistant;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.PixelFormat;
import android.hardware.display.DisplayManager;
import android.hardware.display.VirtualDisplay;
import android.media.Image;
import android.media.ImageReader;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Handler;
import android.os.Looper;
import android.util.DisplayMetrics;
import android.util.Log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.utils.BitmapUtils;

public class ScreenCapture implements ImageReader.OnImageAvailableListener {

    private static final Logger log = LoggerFactory.getLogger(ScreenCapture.class);
    private static ScreenCapture instance;

    private final ExecutorService executor = Executors.newFixedThreadPool(5);

    private final Handler handler = new Handler(Looper.getMainLooper());

    private Consumer<Bitmap> consumer;

    private MediaProjectionManager projectionManager;

    private ScreenCaptureTask screenCaptureTask;

    private final List<ScreenCaptureTask> screenCaptureTasks;

    private MediaProjection mediaProjection;

    private VirtualDisplay virtualDisplay;

    private ImageReader imageReader;

    public static ScreenCapture getInstance() {
        if (instance == null) {
            instance = new ScreenCapture();
        }
        return instance;
    }

    private ScreenCapture() {
        this.screenCaptureTasks = new ArrayList<>();
    }

    public void setConsumer(Consumer<Bitmap> consumer) {
        this.consumer = consumer;
    }

    public Consumer<Bitmap> getConsumer() {
        return consumer;
    }


    public void initScreenCaptureService(Context context, Intent intent) {
        projectionManager = (MediaProjectionManager) context.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        int resultCode = intent.getIntExtra("resultCode", Activity.RESULT_CANCELED);
        Intent data = intent.getParcelableExtra("data");
        if (data == null) {
            return;
        }
        mediaProjection = projectionManager.getMediaProjection(resultCode, data);
    }

    public void start(DisplayMetrics metrics) {
        int screenWidth = metrics.widthPixels;
        int screenHeight = metrics.heightPixels;
        int screenDensity = metrics.densityDpi;
        imageReader = ImageReader.newInstance(screenWidth, screenHeight, PixelFormat.RGBA_8888, 2);
        virtualDisplay = mediaProjection.createVirtualDisplay(
                "ScreenCapture",
                screenWidth, screenHeight, screenDensity,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                imageReader.getSurface(), null, handler
        );
        imageReader.setOnImageAvailableListener(this, handler);
    }

    public void resize(DisplayMetrics metrics) {
        if (imageReader != null) {
            virtualDisplay.release();
            virtualDisplay = null;
            imageReader.close();
            imageReader = null;
        }
        start(metrics);
    }
    /**
     * 启动录屏服务
     */
    public void startScreenCaptureService(Context context, Intent intent) {
        projectionManager = (MediaProjectionManager) context.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        int resultCode = intent.getIntExtra("resultCode", Activity.RESULT_CANCELED);
        Intent data = intent.getParcelableExtra("data");
        if (data == null) {
            return;
        }
        mediaProjection = projectionManager.getMediaProjection(resultCode, data);
        DisplayMetrics metrics = context.getResources().getDisplayMetrics();
        int screenWidth = metrics.widthPixels;
        int screenHeight = metrics.heightPixels;
        int screenDensity = metrics.densityDpi;
        imageReader = ImageReader.newInstance(screenWidth, screenHeight, PixelFormat.RGBA_8888, 2);
        Handler handler = new Handler(Looper.getMainLooper());
        virtualDisplay = mediaProjection.createVirtualDisplay(
                "ScreenCapture",
                screenWidth, screenHeight, screenDensity,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                imageReader.getSurface(), null, handler
        );
        imageReader.setOnImageAvailableListener(this, handler);
    }

    @Override
    public void onImageAvailable(ImageReader reader) {
        Log.i("dnf-server", "当前执行task:" + (screenCaptureTask != null) + ",是否可执行:" + (screenCaptureTask != null && screenCaptureTask.isAvailable()));
        try (Image image = reader.acquireLatestImage()) {
            List<ScreenCaptureTask> availableTasks = screenCaptureTasks.stream().filter(ScreenCaptureTask::isAvailable).collect(Collectors.toList());
            if (availableTasks.isEmpty()) {
                return;
            }
            Bitmap screenshot = BitmapUtils.convertImageToBitmap(image);
            List<Future<Boolean>> features = screenCaptureTasks.stream().peek(task -> task.refresh(screenshot)).
                    map(executor::submit).
                    collect(Collectors.toList());
        } catch (Exception e) {
            Log.e("dnf-server", "执行帧处理异常:" + e.getLocalizedMessage());
        }
    }

    public void setScreenCaptureTask(ScreenCaptureTask screenCaptureTask) {
        this.screenCaptureTask = screenCaptureTask;
    }

    public void stop() {
        if (mediaProjection != null) {
            mediaProjection.stop();
        }
        if (imageReader != null) {
            imageReader.close();
        }
        if (virtualDisplay != null) {
            virtualDisplay.release();
        }
    }

}
