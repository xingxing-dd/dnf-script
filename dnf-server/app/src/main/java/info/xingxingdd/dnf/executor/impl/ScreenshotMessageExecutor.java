package info.xingxingdd.dnf.executor.impl;

import android.content.Context;
import android.graphics.Bitmap;
import android.media.Image;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public class ScreenshotMessageExecutor extends AbstractMessageExecutor {

    @Override
    protected Output doProcess(Input input, Context context) {
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

            // 裁剪掉可能存在的填充部分
            Bitmap croppedBitmap = Bitmap.createBitmap(bitmap, 0, 0, image.getWidth(), image.getHeight());

            // 保存croppedBitmap到文件中
            File directory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);// 获取内部存储目录
            File file = new File(directory, "screenshot_" + System.currentTimeMillis() + ".png");

            FileOutputStream fos = null;
            try {
                fos = new FileOutputStream(file);
                croppedBitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
                Log.i("dnf-server", "Screen capture saved: " + file.getAbsolutePath());
            } catch (IOException e) {
                Log.e("dnf-server", "Failed to save screen capture", e);
            } finally {
                if (fos != null) {
                    try {
                        fos.close();
                    } catch (IOException ioException) {
                        Log.e("dnf-server", "Error closing FileOutputStream", ioException);
                    }
                }
                bitmap.recycle();
            }
        });
        return Output.success();
    }

}
