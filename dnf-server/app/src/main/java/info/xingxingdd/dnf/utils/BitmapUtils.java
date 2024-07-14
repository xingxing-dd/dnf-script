package info.xingxingdd.dnf.utils;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.media.Image;

import java.nio.ByteBuffer;

import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class BitmapUtils {

    public static Bitmap convertImageToBitmap(Image image) {
        // 获取第一个图像平面
        Image.Plane plane = image.getPlanes()[0];
        ByteBuffer buffer = plane.getBuffer();

        int pixelStride = plane.getPixelStride();
        int rowStride = plane.getRowStride();
        int rowPadding = rowStride - pixelStride * image.getWidth();

        // 创建一个新的Bitmap对象
        Bitmap bitmap = Bitmap.createBitmap(
                image.getWidth() + rowPadding / pixelStride,
                image.getHeight(),
                Bitmap.Config.ARGB_8888);

        // 将ByteBuffer数据复制到Bitmap中
        buffer.rewind();
        bitmap.copyPixelsFromBuffer(buffer);
        // 裁剪Bitmap以移除可能的填充
        return Bitmap.createBitmap(
                bitmap,
                0,
                0,
                image.getWidth(),
                image.getHeight());
    }
    /*
    * File picturesDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
                // 创建保存图片的文件，文件名为当前时间戳
                String fileName = "image_" + System.currentTimeMillis() + ".jpg";
                File imageFile = new File(picturesDirectory, fileName);

                try (FileOutputStream fos = new FileOutputStream(imageFile)) {
                    // 将bitmap压缩成jpeg格式输出到输出流对象中
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                    fos.flush(); // 输出流缓冲区的数据全部写出到文件中
                } catch (IOException e) {
                    e.printStackTrace();
                }
    *
    * */

    public static Bitmap showObjects(Bitmap bitmap, YoloV5Ncnn.Obj[] objects)
    {
        if (objects == null)
        {
            return bitmap;
        }
        Bitmap rgba = bitmap.copy(Bitmap.Config.ARGB_8888, true);

        final int[] colors = new int[] {
                Color.rgb( 54,  67, 244),
                Color.rgb( 99,  30, 233),
                Color.rgb(176,  39, 156),
                Color.rgb(183,  58, 103),
                Color.rgb(181,  81,  63),
                Color.rgb(243, 150,  33),
                Color.rgb(244, 169,   3),
                Color.rgb(212, 188,   0),
                Color.rgb(136, 150,   0),
                Color.rgb( 80, 175,  76),
                Color.rgb( 74, 195, 139),
                Color.rgb( 57, 220, 205),
                Color.rgb( 59, 235, 255),
                Color.rgb(  7, 193, 255),
                Color.rgb(  0, 152, 255),
                Color.rgb( 34,  87, 255),
                Color.rgb( 72,  85, 121),
                Color.rgb(158, 158, 158),
                Color.rgb(139, 125,  96)
        };

        Canvas canvas = new Canvas(rgba);

        Paint paint = new Paint();
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(4);

        Paint textbgpaint = new Paint();
        textbgpaint.setColor(Color.WHITE);
        textbgpaint.setStyle(Paint.Style.FILL);

        Paint textpaint = new Paint();
        textpaint.setColor(Color.BLACK);
        textpaint.setTextSize(26);
        textpaint.setTextAlign(Paint.Align.LEFT);

        for (int i = 0; i < objects.length; i++)
        {
            paint.setColor(colors[i % 19]);

            canvas.drawRect(objects[i].x, objects[i].y, objects[i].x + objects[i].w, objects[i].y + objects[i].h, paint);

            // draw filled text inside image
            {
                String text = objects[i].label + " = " + String.format("%.1f", objects[i].prob * 100) + "%";

                float text_width = textpaint.measureText(text);
                float text_height = - textpaint.ascent() + textpaint.descent();

                float x = objects[i].x;
                float y = objects[i].y - text_height;
                if (y < 0)
                    y = 0;
                if (x + text_width > rgba.getWidth())
                    x = rgba.getWidth() - text_width;

                canvas.drawRect(x, y, x + text_width, y + text_height, textbgpaint);

                canvas.drawText(text, x, y - textpaint.ascent(), textpaint);
            }
        }
        return rgba;
    }

}
