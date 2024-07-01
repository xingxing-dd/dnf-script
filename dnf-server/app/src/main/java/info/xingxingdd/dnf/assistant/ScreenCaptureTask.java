package info.xingxingdd.dnf.assistant;

import android.graphics.Bitmap;
import android.util.Log;

import java.util.concurrent.Callable;

public abstract class ScreenCaptureTask implements Callable<Boolean> {

    private final String requestId;

    private final long interval;

    private long nextTime;

    private Bitmap screenshot;

    public ScreenCaptureTask(String requestId, long interval) {
        this.interval = interval;
        this.nextTime = System.currentTimeMillis();
        this.requestId = requestId;
    }

    public void refresh(Bitmap screenshot) {
        this.screenshot = screenshot;
    }

    @Override
    public Boolean call() {
        this.nextTime = System.currentTimeMillis() + Integer.MAX_VALUE;
        boolean result = process(screenshot);
        this.nextTime = System.currentTimeMillis() + interval;
        return result;
    }

    public abstract boolean process(Bitmap screenshot);

    public boolean isAvailable() {
        Log.i("dnf-server", "当前时间:" + System.currentTimeMillis() + ",下一次执行时间:" + this.nextTime);
        return System.currentTimeMillis() >= this.nextTime;
    }

    protected abstract boolean doProcess(Bitmap bitmap);

    public String getRequestId() {
        return requestId;
    }

    public long getNextTime() {
        return nextTime;
    }

    public long getInterval() {
        return interval;
    }
}
