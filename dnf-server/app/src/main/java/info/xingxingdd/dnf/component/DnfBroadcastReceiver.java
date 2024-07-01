package info.xingxingdd.dnf.component;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.Objects;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DnfBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (Objects.equals(intent.getAction(), Intent.ACTION_CONFIGURATION_CHANGED)) {
            Log.i("dnf-server", "屏幕方向发生变化");
            ScreenCapture.getInstance().resize(context.getResources().getDisplayMetrics());
        }
        if (Objects.equals(intent.getAction(), "info.xingxingdd.dnf.action.STOP_SERVICE")) {
            context.stopService(new Intent(context, DnfServerService.class));
        }
    }

}
