package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.gson.Gson;

import org.opencv.core.Rect;
import org.opencv.matcher.MatcherTemplate;
import org.opencv.matcher.TemplateMatcher;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class OperationMessageExecutor extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {
        Log.i("dnf-server", "开出处理:" + new Gson().toJson(input));

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId(), input.getData()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    Log.i("dnf-server", "开始:" + new Gson().toJson(getData()));
                    MatcherTemplate target = new MatcherTemplate(Objects.requireNonNull(DetectionAssistant.readBitmap((String) getData().get("operation") + ".png")));
                    Log.i("dnf-server", "开始:1");
                    MatcherTemplate source = new MatcherTemplate(screenshot);
                    Log.i("dnf-server", "开始:2");
                    Map<String, Float> region = (Map<String, Float>) getData().get("region");
                    if (region != null) {
                        if (region.get("left") != null) {
                            source.setLeft((int) (screenshot.getWidth() * region.get("left")));
                        }
                        if (region.get("right") != null) {
                            source.setRight((int) (screenshot.getWidth() * region.get("right")));
                        }
                        if (region.get("top") != null) {
                            source.setTop((int) (screenshot.getHeight() * region.get("top")));
                        }
                        if (region.get("bottom") != null) {
                            source.setBottom((int) (screenshot.getHeight() * region.get("bottom")));
                        }
                    }
                    Log.i("dnf-server", "开始:" + new Gson().toJson(source));
                    Rect rect = TemplateMatcher.match(target, source, 0.8f);
                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(rect));
                    Output output = Output.success();
                    output.setRequestId(getRequestId());
                    Map<String, Object> data = new HashMap<>();
                    data.put("result", rect);
                    output.setData(data);
                    connectionManager.send(output);
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return true;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }
}
