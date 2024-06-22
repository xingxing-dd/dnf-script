package info.xingxingdd.dnf;

import android.app.Application;
import android.util.Log;

public class DnfServerApplication extends Application {

    private boolean foregroundServiceRunning = false;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("dnf-server", "正在启动程序");
    }

    public void setForegroundServiceRunning() {
        this.foregroundServiceRunning = true;
    }

    public boolean isForegroundServiceRunning() {
        return foregroundServiceRunning;
    }
}
