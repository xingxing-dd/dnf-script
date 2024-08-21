package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Environment;
import android.util.Log;

import com.google.gson.Gson;

import org.opencv.core.Rect;
import org.opencv.matcher.MatchResult;
import org.opencv.matcher.MatchTemplate;
import org.opencv.matcher.TemplateMatcher;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class OperationMessageExecutor extends AbstractAsyncMessageExecutor {

    private final String screenshotFileDir = Environment.getExternalStorageDirectory().getAbsolutePath();

    @Override
    protected void doAsyncProcess(Input input) {
        Log.i("dnf-server", "开出处理:" + new Gson().toJson(input));
        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId(), input.getData()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    Map<String, Object> data = getData();
                    Bitmap targetImg = DetectionAssistant.readBitmap("template/" + data.get("template") + ".jpg");
                    assert targetImg != null;
                    MatchTemplate target = new MatchTemplate(targetImg);
                    MatchTemplate source = new MatchTemplate(screenshot);
                    List<Double> bounds = (List<Double>) data.get("bounds");
                    assert bounds != null;
                    source.setLeft((int) (screenshot.getWidth() * bounds.get(0)));
                    source.setRight((int) (screenshot.getWidth() * bounds.get(1)));
                    source.setTop((int) (screenshot.getHeight() * bounds.get(2)));
                    source.setBottom((int) (screenshot.getHeight() * bounds.get(3)));
                    MatchResult matchResult = TemplateMatcher.match(target, source, 0.6f);
                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(matchResult));
                    //saveResult(screenshot, matchResult);
                    Output output = Output.success();
                    output.setRequestId(getRequestId());
                    Map<String, Object> resultData = new HashMap<>();
                    if (matchResult != null) {
                        resultData.put("x", matchResult.getX());
                        resultData.put("y", matchResult.getY());
                        resultData.put("w", matchResult.getW());
                        resultData.put("h", matchResult.getH());
                        resultData.put("label", data.get("label"));
                    }
                    output.setData(resultData);
                    connectionManager.send(output);
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return true;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

    private void saveResult(Bitmap bitmap, Rect rect) {
        try(FileOutputStream fos = new FileOutputStream(screenshotFileDir + "/dnf-server-detect.jpeg")) {
            Bitmap c = bitmap.copy(Bitmap.Config.ARGB_8888, true);
            Canvas canvas = new Canvas();
            canvas.setBitmap(c);
            // 创建一个Paint对象，用于设置点的样式
            Paint paint = new Paint();
            paint.setColor(Color.RED); // 设置点的颜色
            paint.setAntiAlias(true); // 抗锯齿
            paint.setStyle(Paint.Style.STROKE);
            paint.setStrokeWidth(3);
            canvas.drawRect(
                    rect.x,
                    rect.y,
                    rect.x + rect.width,
                    rect.y + rect.height,
                    paint
            );
            c.compress(Bitmap.CompressFormat.JPEG, 100, fos);
        } catch (Exception e) {
            Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
        }
    }
}
