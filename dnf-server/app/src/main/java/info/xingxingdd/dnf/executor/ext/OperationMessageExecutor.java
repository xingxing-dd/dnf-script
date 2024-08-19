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
import java.util.Objects;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.assistant.TemplateConfig;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.dnf.utils.BitmapUtils;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class OperationMessageExecutor extends AbstractAsyncMessageExecutor {

    private final String screenshotFileDir = Environment.getExternalStorageDirectory().getAbsolutePath();

    private final List<List<Float>> positions = List.of(
            List.of(0.75f, 1f, 0f, 0.3f),
            List.of(0f, 0.25f, 0.6f, 1f),
            List.of(0f, 0.3f, 0f, 0.5f),
            List.of(0.3f, 0.8f, 0.1f, 0.5f),
            List.of(0f, 0.3f, 0f, 0.3f),
            List.of(0.3f, 0.8f, 0f, 0.3f),
            List.of(0f, 0.5f, 0f, 0.3f),
            List.of(0.6f, 0.9f, 0.7f, 1f),
            List.of(0.7f, 1f, 0.7f, 1f)
    );


    @Override
    protected void doAsyncProcess(Input input) {
        Log.i("dnf-server", "开出处理:" + new Gson().toJson(input));
        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId(), input.getData()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    Bitmap targetImg = DetectionAssistant.readBitmap("template/" + getData().get("target") + ".jpg");
                    assert targetImg != null;
                    MatchTemplate target = new MatchTemplate(targetImg);
                    MatchTemplate source = new MatchTemplate(screenshot);
                    TemplateConfig.Config config = TemplateConfig.getConfig((String) getData().get("target"));
                    source.setLeft((int) (screenshot.getWidth() * config.left));
                    source.setRight((int) (screenshot.getWidth() * config.right));
                    source.setTop((int) (screenshot.getHeight() * config.top));
                    source.setBottom((int) (screenshot.getHeight() * config.bottom));
                    MatchResult matchResult = TemplateMatcher.match(target, source, 0.6f);
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
                        data.put("label", config.desc);
                    }
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
