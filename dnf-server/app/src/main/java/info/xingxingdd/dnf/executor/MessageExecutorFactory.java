package info.xingxingdd.dnf.executor;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.executor.ext.DetectionMessageExecutor;
import info.xingxingdd.dnf.executor.ext.OperationMessageExecutor;
import info.xingxingdd.dnf.executor.ext.ScreenshotMessageExecutor;
import info.xingxingdd.dnf.executor.ext.TextDetectMessageExecutor;

public class MessageExecutorFactory {

    private static final Map<String, MessageExecutor> executors = new HashMap<>(16);

    static {
        executors.put("screen-match", new OperationMessageExecutor());
        executors.put("screenshot", new ScreenshotMessageExecutor());
        executors.put("screen-detect", new DetectionMessageExecutor());
        executors.put("screen-text", new TextDetectMessageExecutor());
    }

    public static MessageExecutor acquire(String action) {
        return executors.get(action);
    }


}
