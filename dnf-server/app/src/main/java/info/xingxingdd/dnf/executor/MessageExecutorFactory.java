package info.xingxingdd.dnf.executor;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.executor.impl.DebugMessageExecutor;
import info.xingxingdd.dnf.executor.impl.DetectionMessageExecutor;
import info.xingxingdd.dnf.executor.impl.ScreenshotMessageExecutor;

public class MessageExecutorFactory {

    private static final Map<String, MessageExecutor> executors = new HashMap<>(16);

    static {
        executors.put("debug-img-detection", new DebugMessageExecutor());
        executors.put("screenshot", new ScreenshotMessageExecutor());
        executors.put("detection", new DetectionMessageExecutor());
    }

    public static MessageExecutor acquire(String action) {
        return executors.get(action);
    }


}
