package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.media.Image;
import android.util.Log;

import com.google.gson.Gson;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.server.ConnectionManager;
import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DetectionMessageExecutor extends AbstractMessageExecutor {

    @Override
    public Output doProcess(Input input) {
//        ScreenCapture.getInstance().setConsumer(bitmap -> {
//            try {
//                YoloV5Ncnn.Obj[] objs = YoloV5Ncnn.getInstance().detect(bitmap, false);
//                Log.i("dnf-server", "Screen capture saved: ");
//                Map<String, Object> data = new HashMap<>();
//                data.put("objs", new Gson().toJson(objs));
//                Output output = Output.success(data);
//                output.setRequestId(input.getRequestId());
//                ConnectionManager.getInstance().send(output);
//            } catch (Exception e) {
//                Log.e("dnf-server", "处理屏幕截图失败", e);
//            } finally {
//                bitmap.recycle();
//            }
//        });
        return Output.processing();
    }

}
