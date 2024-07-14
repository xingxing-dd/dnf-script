package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.os.Environment;
import android.util.Log;

import com.google.gson.Gson;

import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.dnf.utils.BitmapUtils;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionMessageExecutor extends AbstractAsyncMessageExecutor {

    private final String screenshotFileDir = Environment.getExternalStorageDirectory().getAbsolutePath();

    //"berserker", "unattachable_monsters", "attachable_monsters", "blocked_portal",
    //            "unblocked_portal", "direction_guidance"

    @Override
    protected void doAsyncProcess(Input input) {

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    YoloV5Ncnn.Obj[] targets = YoloV5Ncnn.getInstance().detect(screenshot, false);
                    Map<String, Object> data = new HashMap<>();
                    if (targets != null && targets.length > 0) {
                        data.put("targets", Arrays.stream(targets).collect(Collectors.groupingBy(obj -> obj.label)));
                    }
                    Output output = Output.success();
                    output.setRequestId(getRequestId());
                    output.setData(data);
                    connectionManager.send(output);
                    if (targets != null && targets.length > 0) {
                        saveResult(screenshot, targets);
                    }
                    Log.i("dnf-server", "识别到目标:" + new Gson().toJson(targets));
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return true;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

    private void saveResult(Bitmap bitmap, YoloV5Ncnn.Obj[] targets) {
        try(FileOutputStream fos = new FileOutputStream(screenshotFileDir + "/dnf-server-detect.jpeg")) {
            Bitmap target = BitmapUtils.showObjects(bitmap, targets);
            target.compress(Bitmap.CompressFormat.JPEG, 100, fos);
        } catch (Exception e) {
            Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
        }
    }
}
