package info.xingxingdd.dnf.executor.impl;

import static androidx.core.content.ContextCompat.getSystemService;

import android.content.Context;
import android.graphics.Bitmap;
import android.media.Image;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Environment;
import android.util.Log;

import com.google.gson.Gson;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.YoloV5Ncnn;
import info.xingxingdd.dnf.connection.ConnectionHolder;
import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public class DetectionMessageExecutor extends AbstractMessageExecutor {

    @Override
    public Output doProcess(Input input, Context context) {
        ScreenCapture.getInstance().setConsumer(image -> {
            Image.Plane[] planes = image.getPlanes();
            ByteBuffer buffer = planes[0].getBuffer();

            int pixelStride = planes[0].getPixelStride();
            int rowStride = planes[0].getRowStride();
            int rowPadding = rowStride - pixelStride * image.getWidth();

            // 创建与Image大小相同的Bitmap
            Bitmap bitmap = Bitmap.createBitmap(image.getWidth() + rowPadding / pixelStride, image.getHeight(), Bitmap.Config.ARGB_8888);
            buffer.rewind(); // 确保buffer的position是0
            bitmap.copyPixelsFromBuffer(buffer);
            try {
                YoloV5Ncnn.Obj[] objs = YoloV5Ncnn.getInstance().Detect(bitmap, false);
                Log.i("dnf-server", "Screen capture saved: ");
                Map<String, Object> data = new HashMap<>();
                data.put("objs", new Gson().toJson(objs));
                Output output = Output.success(data);
                output.setRequestId(input.getRequestId());
                ConnectionHolder.getInstance().send(output);
            } catch (Exception e) {
                Log.e("dnf-server", "Failed to save screen capture", e);
            } finally {
                bitmap.recycle();
            }
        });
        return Output.pending();
    }

}
