package info.xingxingdd.dnf.script.plugin;

import org.autojs.plugin.sdk.PluginRegistry;
import org.opencv.android.OpenCVLoader;

public class DnfScriptPluginRegistry extends PluginRegistry {

    static {
        // 注册默认插件
        registerDefaultPlugin(DnfScriptPlugin::new);
        //初始化opencv
        OpenCVLoader.initDebug();
    }

}
