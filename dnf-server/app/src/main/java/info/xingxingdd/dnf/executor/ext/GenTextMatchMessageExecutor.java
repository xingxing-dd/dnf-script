package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.gson.Gson;

import org.opencv.matcher.MatchResult;
import org.opencv.matcher.MatchTemplate;
import org.opencv.matcher.TemplateMatcher;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.assistant.TextImageGenerator;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class GenTextMatchMessageExecutor extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId(), input.getData()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    String matchLabelText = (String) getData().get("label");
                    if (Objects.isNull(matchLabelText)) {
                        return true;
                    }
                    MatchTemplate target = new MatchTemplate(TextImageGenerator.generateTextImage(matchLabelText));
                    MatchTemplate source = new MatchTemplate(screenshot);
                    source.setLeft(0);
                    source.setRight(screenshot.getWidth());
                    source.setTop((int) (screenshot.getHeight() * 0.6));
                    source.setBottom((int) (screenshot.getHeight() * 0.9));
                    MatchResult matchResult = TemplateMatcher.match(target, source, 0.7f);
                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(matchResult));
                    //saveResult(screenshot, matchResult);
                    Output output = Output.success();
                    output.setRequestId(getRequestId());
                    Map<String, Object> data = new HashMap<>();
                    if (matchResult != null) {
                        data.put("x", matchResult.getX());
                        data.put("y", matchResult.getY());
                        data.put("w", matchResult.getW());
                        data.put("h", matchResult.getH());
                        data.put("label", matchLabelText);
                    }
                    output.setData(data);
                    connectionManager.send(output);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return true;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
