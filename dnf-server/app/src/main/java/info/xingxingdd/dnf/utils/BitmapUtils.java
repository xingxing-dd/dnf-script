package info.xingxingdd.dnf.utils;

import android.graphics.Bitmap;
import android.media.Image;

import java.nio.ByteBuffer;

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

}
