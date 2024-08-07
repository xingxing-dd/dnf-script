package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class OperationMessageExecutor extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {
        Log.i("dnf-server", "开出处理:" + new Gson().toJson(input));

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {

                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(null));
                    Output output = Output.success();
                    output.setRequestId(getRequestId());
                    Map<String, Object> data = new HashMap<>();
                    data.put("result", null);
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
