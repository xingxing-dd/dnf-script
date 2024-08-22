package info.xingxingdd.dnf.script.plugin.utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import java.io.InputStream;

public class DnfScriptPluginUtils {

    public static Bitmap loadBitmap(Context context, String path) {
        try (InputStream is = context.getAssets().open(path)) {
            return BitmapFactory.decodeStream(is);
        } catch (Exception e) {
            Log.e("dnf-server", "加载错误：" + e.getLocalizedMessage());
            return null;
        }
    }

}
