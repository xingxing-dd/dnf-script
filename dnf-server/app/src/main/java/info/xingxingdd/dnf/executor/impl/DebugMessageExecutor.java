package info.xingxingdd.dnf.executor.impl;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.assistant.YoloV5Ncnn;
import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public class DebugMessageExecutor extends AbstractMessageExecutor {
    @Override
    public Output doProcess(Input input, Context context) {
        Log.i("dnf-server", "接收到消息");
        YoloV5Ncnn yoloV5Ncnn = YoloV5Ncnn.getInstance(context.getAssets());
        if (yoloV5Ncnn == null) {
            return Output.failure("初始化模型失败");
        }
        long startTime = System.nanoTime();
        Bitmap bitmap = BitmapFactory.decodeFile((String) input.getData().get("filePath"));
        YoloV5Ncnn.Obj[] objs = yoloV5Ncnn.Detect(bitmap, false);
        Map<String, Object> data = new HashMap<>();
        data.put("objs", new Gson().toJson(objs));
        data.put("takeUpTime", System.nanoTime() - startTime);
        return Output.success(data);
    }
}
