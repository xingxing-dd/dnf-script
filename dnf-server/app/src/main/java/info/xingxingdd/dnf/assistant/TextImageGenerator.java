package info.xingxingdd.dnf.assistant;

import android.content.Context;
import android.graphics.Bitmap;  
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;  
import android.os.Environment;

import java.io.File;  
import java.io.FileOutputStream;  
import java.io.IOException;  
  
public class TextImageGenerator {  
  
    public static Bitmap generateTextImage(String text) {
        // 创建Paint对象  
        Paint paint = new Paint();  
        paint.setColor(Color.WHITE); // 文字颜色
        paint.setTextSize(48); // 文字大小  
        paint.setTypeface(Typeface.createFromAsset(DetectionAssistant.assetManager, "fonts/msyh.ttc"));
        float textWidth = paint.measureText(text);
        // 创建Bitmap
        Bitmap bitmap = Bitmap.createBitmap((int) textWidth + 10, 80, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawColor(Color.BLACK);
        canvas.drawText(text, 5, 60, paint);
        return bitmap;
    }  
}