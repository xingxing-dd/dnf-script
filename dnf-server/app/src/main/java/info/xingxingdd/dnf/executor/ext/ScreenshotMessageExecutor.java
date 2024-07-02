package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.os.Environment;
import android.util.Log;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

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
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return false;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
