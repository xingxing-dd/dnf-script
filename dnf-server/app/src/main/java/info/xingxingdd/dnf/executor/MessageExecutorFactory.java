package info.xingxingdd.dnf.executor;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.executor.ext.ClientAckMessageExecutor;
import info.xingxingdd.dnf.executor.ext.DebugMessageExecutor;
import info.xingxingdd.dnf.executor.ext.DetectionMessageExecutor;
import info.xingxingdd.dnf.executor.ext.ResetSkillMessageExecutor;
import info.xingxingdd.dnf.executor.ext.ScreenshotMessageExecutor;

public class MessageExecutorFactory {

    private static final Map<String, MessageExecutor> executors = new HashMap<>(16);

    static {
        executors.put("debug-img-detection", new DebugMessageExecutor());
        executors.put("screenshot", new ScreenshotMessageExecutor());
        executors.put("detection", new DetectionMessageExecutor());
        executors.put("reset-skill", new ResetSkillMessageExecutor());
        executors.put("client-ack", new ClientAckMessageExecutor());
    }

    public static MessageExecutor acquire(String action) {
        return executors.get(action);
    }


}
