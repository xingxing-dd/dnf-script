package info.xingxingdd.dnf.assistant;

import android.graphics.Bitmap;
import android.util.Log;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

public abstract class ScreenCaptureTask implements Callable<Boolean> {

    private final String requestId;

    private final Map<String, Object> data;

    private final long interval;

    private long nextTime;

    private Bitmap screenshot;

    public ScreenCaptureTask(String requestId) {
        this.interval = 2000;
        this.data = new HashMap<>();
        this.nextTime = System.currentTimeMillis();
        this.requestId = requestId;
    }

    public ScreenCaptureTask(String requestId, Map<String, Object> data) {
        this.interval = 2000;
        this.requestId = requestId;
        this.data = data;
        this.nextTime = System.currentTimeMillis();
    }

    public ScreenCaptureTask(String requestId, long interval) {
        this.interval = interval;
        this.data = new HashMap<>();
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

    protected abstract boolean process(Bitmap screenshot);

    public boolean isAvailable() {
        Log.d("dnf-server", "当前时间:" + System.currentTimeMillis() + ",下一次执行时间:" + this.nextTime);
        return System.currentTimeMillis() >= this.nextTime;
    }

    public String getRequestId() {
        return requestId;
    }

    public long getNextTime() {
        return nextTime;
    }

    public long getInterval() {
        return interval;
    }

    public Map<String, Object> getData() {
        return this.data;
    }

    public Object getData(String key) {
        if (this.data == null) {
            return null;
        }
        return this.data.get(key);
    }
}
