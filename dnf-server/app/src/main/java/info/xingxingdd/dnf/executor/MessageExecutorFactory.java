package info.xingxingdd.dnf.executor;

import java.util.HashMap;
import java.util.Map;

public class MessageExecutorFactory {

    private static final Map<String, MessageExecutor> executors = new HashMap<>(16);

    static {
        executors.put("", null);
    }

    public static MessageExecutor acquire(String action) {
        return executors.get(action);
    }

}
