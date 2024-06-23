package info.xingxingdd.dnf.executor;

import java.util.HashMap;
import java.util.Map;

public class MessageExecutorContext extends ThreadLocal<Map<String, Object>> {

    public Object getValue(String key) {
        Map<String, Object> cache = get();
        if (cache == null) {
            cache = new HashMap<>();
        }
        return cache.get(key);
    }

    public void setValue(String key, Object value) {
        Map<String, Object> cache = get();
        if (cache == null) {
            cache = new HashMap<>();
        }
        cache.put(key, value);
    }

}