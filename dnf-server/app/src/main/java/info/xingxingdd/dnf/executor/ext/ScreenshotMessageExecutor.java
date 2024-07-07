package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.os.Environment;
import android.util.Log;

import com.google.gson.Gson;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class ScreenshotMessageExecutor extends AbstractAsyncMessageExecutor {


    @Override
    protected void doAsyncProcess(Input input) {

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            private final String screenshotFileDir = Environment.getExternalStorageDirectory().getAbsolutePath();

            @Override
            protected boolean process(Bitmap screenshot) {
                try(FileOutputStream fos = new FileOutputStream(screenshotFileDir + "/dnf-server.jpeg")) {
                    screenshot.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                    Log.i("dnf-server", "生成截图文件目录: " + screenshotFileDir + "/dnf-server.jpeg");
                    Map<String, Object> data = new HashMap<>();
                    data.put("screenshot", screenshotFileDir + "/dnf-server.jpeg");
                    Output output = Output.processing();
                    output.setRequestId(getRequestId());
                    output.setData(data);
                    connectionManager.send(output);
                    YoloV5Ncnn.Obj[] targets = YoloV5Ncnn.getInstance().detect(screenshot, false);
                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(targets));
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return false;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
