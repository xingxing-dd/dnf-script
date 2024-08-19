package info.xingxingdd.dnf.assistant;

import java.util.HashMap;
import java.util.Map;

public class TemplateConfig {

    public static class Config {

        public float left;

        public float right;

        public float top;

        public float bottom;

        public String desc;


        public Config(float left, float right, float top, float bottom, String desc) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
            this.desc = desc;
        }
    }

    private final static Map<String, Config> configs = new HashMap<>(64);

    static {
        configs.put("1", new Config(0.9f, 1.0f, 0.1f, 0.5f, "对战"));
        configs.put("2", new Config(0.7f, 1.0f, 0.5f, 0.9f, "修炼场"));
        configs.put("3", new Config(0.3f, 0.7f, 0.6f, 0.9f, "底下修炼场"));
        configs.put("4", new Config(0.1f, 0.3f, 0.6f, 0.9f, "操作杆"));
        configs.put("5", new Config(0.9f, 1.0f, 0.0f, 0.1f, "返回主页面"));
        configs.put("6", new Config(0.7f, 0.9f, 0.7f, 1.0f, "普攻键"));
        configs.put("7", new Config(0.5f, 0.9f, 0.7f, 1.0f, "十字斩"));
        configs.put("8", new Config(0.5f, 0.9f, 0.7f, 1.0f, "崩山击"));
        configs.put("9", new Config(0.5f, 0.9f, 0.7f, 1.0f, "愤怒狂刃"));
        configs.put("10", new Config(0.5f, 0.9f, 0.7f, 1.0f, "爆发之刃"));
        configs.put("11", new Config(0.5f, 0.9f, 0.7f, 1.0f, "绝念除恶击"));
        configs.put("12", new Config(0.5f, 0.9f, 0.7f, 1.0f, "怒气爆发"));
        configs.put("13", new Config(0.5f, 0.9f, 0.7f, 1.0f, "捕梦之手"));
        configs.put("14", new Config(0.8f, 0.9f, 0.6f, 0.8f, "滑屏键"));
        configs.put("15", new Config(0.2f, 0.6f, 0.8f, 1.0f, "暴走"));
        configs.put("16", new Config(0.2f, 0.6f, 0.8f, 1.0f, "愤怒"));
        configs.put("17", new Config(0.2f, 0.6f, 0.8f, 1.0f, "毁灭抗拒"));
        configs.put("18", new Config(0.3f, 0.7f, 0.2f, 0.8f, "确认按钮"));
        configs.put("19", new Config(0f, 0.3f, 0.7f, 1f, "皮肤仓库"));
    }

    public static Config getConfig(String templateId) {
        return configs.get(templateId);
    }

}
