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
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.utils.BitmapUtils;

public class ScreenCapture implements ImageReader.OnImageAvailableListener {

    private static final Logger log = LoggerFactory.getLogger(ScreenCapture.class);
    private static ScreenCapture instance;

    private final ExecutorService executor = Executors.newFixedThreadPool(5);

    private final Handler handler = new Handler(Looper.getMainLooper());

    private final ReentrantLock imageProcessTaskLock = new ReentrantLock();

    private Consumer<Bitmap> consumer;

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

    public void initScreenCaptureService(Context context, Intent intent) {
        MediaProjectionManager projectionManager = (MediaProjectionManager) context.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
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

    @Override
    public void onImageAvailable(ImageReader reader) {
        try (Image image = reader.acquireLatestImage()) {
            if (!imageProcessTaskLock.tryLock()) {
                return;
            }
            executeImageProcessTask(image);
        } catch (Exception e) {
            Log.e("dnf-server", "执行帧处理异常:" + e.getLocalizedMessage());
        }
    }

    /**
     * 执行处理图片任务
     * @param image
     */
    private void executeImageProcessTask(Image image) {
        try {
            List<ScreenCaptureTask> availableTasks = screenCaptureTasks.stream().filter(ScreenCaptureTask::isAvailable).collect(Collectors.toList());
            Log.i("dnf-server", "当前执行task:" + screenCaptureTasks.size());
            if (availableTasks.isEmpty()) {
                return;
            }
            Bitmap screenshot = BitmapUtils.convertImageToBitmap(image);
            Map<String, Future<Boolean>> futures = screenCaptureTasks.stream().peek(task -> task.refresh(screenshot)).
                    collect(Collectors.toMap(ScreenCaptureTask::getRequestId, executor::submit, (a, b) -> a));
            screenCaptureTasks.removeIf(task -> {
                try {
                    Future<Boolean> future = futures.get(task.getRequestId());
                    if (future == null) {
                        return false;
                    }
                    return future.get();
                } catch (ExecutionException | InterruptedException e) {
                    return false;
                }
            });
        } finally {
            imageProcessTaskLock.unlock();
        }
    }

    public synchronized void addScreenCaptureTask(ScreenCaptureTask task) {
        ScreenCaptureTask existTask = screenCaptureTasks.stream().filter(t -> t.getClass().getName().equals(task.getClass().getName()))
                .findFirst()
                .orElse(null);
        if (existTask != null) {
            return;
        }
        screenCaptureTasks.add(task);
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
