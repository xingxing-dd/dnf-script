package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.YoloV5Ncnn;
import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class DebugMessageExecutor extends AbstractMessageExecutor {
    @Override
    public Output doProcess(Input input) {
        Log.i("dnf-server", "接收到消息");
        long startTime = System.nanoTime();
        Bitmap bitmap = BitmapFactory.decodeFile((String) input.getData().get("filePath"));
        YoloV5Ncnn.Obj[] objs = YoloV5Ncnn.getInstance().Detect(bitmap, false);
        Map<String, Object> data = new HashMap<>();
        data.put("objs", new Gson().toJson(objs));
        data.put("takeUpTime", System.nanoTime() - startTime);
        return Output.success(data);
    }
}
