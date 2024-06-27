package info.xingxingdd.dnf.assistant;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.hardware.display.DisplayManager;
import android.media.Image;
import android.media.ImageReader;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Handler;
import android.os.Looper;
import android.util.DisplayMetrics;

import java.util.function.Consumer;
import java.util.function.Function;

public class ScreenCapture implements ImageReader.OnImageAvailableListener {

    private static ScreenCapture instance;

    private Consumer<Image> consumer;

    private MediaProjectionManager projectionManager;

    private MediaProjection mediaProjection;

    public static ScreenCapture getInstance() {
        if (instance == null) {
            instance = new ScreenCapture();
        }
        return instance;
    }

    public void setConsumer(Consumer<Image> consumer) {
        this.consumer = consumer;
    }

    public Consumer<Image> getConsumer() {
        return consumer;
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
        try (ImageReader imageReader = ImageReader.newInstance(screenWidth, screenHeight, PixelFormat.RGBA_8888, 2)){
            Handler handler = new Handler(Looper.getMainLooper());
            mediaProjection.createVirtualDisplay(
                    "ScreenCapture",
                    screenWidth, screenHeight, screenDensity,
                    DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                    imageReader.getSurface(), null, handler
            );
            imageReader.setOnImageAvailableListener(this, handler);
        }
    }

    @Override
    public void onImageAvailable(ImageReader reader) {
        try (Image image = reader.acquireLatestImage()) {
            Consumer<Image> consumer = getConsumer();
            if (consumer == null || image == null) {
                return;
            }
            consumer.accept(image);
            setConsumer(null);
        }
    }

}
