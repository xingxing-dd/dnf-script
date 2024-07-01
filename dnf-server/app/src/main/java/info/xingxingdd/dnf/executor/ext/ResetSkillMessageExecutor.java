package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.benjaminwan.ocrlibrary.OcrResult;
import com.benjaminwan.ocrlibrary.Point;
import com.benjaminwan.ocrlibrary.TextBlock;
import com.google.gson.Gson;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Consumer;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.ConnectionManager;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.dnf.server.session.Session;

public class ResetSkillMessageExecutor extends AbstractAsyncMessageExecutor {

    private final List<List<String>> skillSteps = Arrays.asList(
            Arrays.asList("拔能", "技能"),
            Collections.singletonList("初始化"),
            Collections.singletonList("应用"),
            Collections.singletonList("自动加点"),
            Collections.singletonList("应用")
    );


    @Override
    protected void doAsyncProcess(Input input) {
//        ScreenCapture.getInstance().setScreenCaptureTask(new ScreenCaptureTask(input.getRequestId(), 2000) {
//            @Override
//            protected boolean doProcess(Bitmap bitmap) {
//                Log.i("dnf-server", "宽:" + bitmap.getWidth() + ",高:" + bitmap.getHeight());
//                Session session = connectionManager.acquireSession(input.getRequestId());
//                int step = (int) session.getOrDefault("step", 1);
//                List<String> steps = skillSteps.get(step - 1);
//                Bitmap out =Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Bitmap.Config.ARGB_8888);
//                OcrResult ocrResult = DetectionAssistant.ocrEngine.detect(bitmap, out, Math.max(bitmap.getWidth(), bitmap.getHeight()));
//                Log.i("dnf-server", "识别字符数量:" + ocrResult.component2().size());
//                bitmap.recycle();
//                TextBlock targetBlock = ocrResult.component2().stream().filter(t -> {
//                    for (String s: steps) {
//                        if (t.getText().contains(s)) {
//                            return true;
//                        }
//                    }
//                    return false;
//                }).findFirst().orElse(null);
//                if (targetBlock == null) {
//                    return false;
//                }
//                Log.i("dnf-server", "找到需要点击block:" + targetBlock.getText() + ":" + new Gson().toJson(targetBlock.getBoxPoint()));
//                Point leftTop = targetBlock.getBoxPoint().get(0);
//                Point rightBottom = targetBlock.getBoxPoint().get(2);
//                int x = (rightBottom.getX() + leftTop.getX()) / 2 + 10 - new Random().nextInt(20);
//                int y = (rightBottom.getY() + leftTop.getY()) / 2 + 10 - new Random().nextInt(20);
//                Output output = Output.processing();
//                output.setRequestId(input.getRequestId());
//                output.setRequiredAck(true);
//                Map<String, Object> data = new HashMap<>();
//                data.put("operation", "click");
//                data.put("x", x);
//                data.put("y", y);
//                output.setData(data);
//                doAfter(input, output);
//                connectionManager.send(new Gson().toJson(output));
//                session.put("step", step + 1);
//                return true;
//            }
//        });
//        Consumer<Bitmap> consumer = bitmap -> {
//            Log.i("dnf-server", "宽:" + bitmap.getWidth() + ",高:" + bitmap.getHeight());
//            Session session = connectionManager.acquireSession(input.getRequestId());
//            int step = (int) session.getOrDefault("step", 1);
//            List<String> steps = skillSteps.get(step - 1);
//            Bitmap out =Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Bitmap.Config.ARGB_8888);
//            OcrResult ocrResult = DetectionAssistant.ocrEngine.detect(bitmap, out, Math.max(bitmap.getWidth(), bitmap.getHeight()));
//            Log.i("dnf-server", "识别字符数量:" + ocrResult.component2().size());
//            bitmap.recycle();
//            TextBlock targetBlock = ocrResult.component2().stream().filter(t -> {
//                for (String s: steps) {
//                    if (t.getText().contains(s)) {
//                        return true;
//                    }
//                }
//                return false;
//            }).findFirst().orElse(null);
//            if (targetBlock == null) {
//                return;
//            }
//            Log.i("dnf-server", "找到需要点击block:" + targetBlock.getText() + ":" + new Gson().toJson(targetBlock.getBoxPoint()));
//            Point leftTop = targetBlock.getBoxPoint().get(0);
//            Point rightBottom = targetBlock.getBoxPoint().get(2);
//            int x = (rightBottom.getX() + leftTop.getX()) / 2 + 10 - new Random().nextInt(20);
//            int y = (rightBottom.getY() + leftTop.getY()) / 2 + 10 - new Random().nextInt(20);
//            Output output = Output.processing();
//            output.setRequestId(input.getRequestId());
//            output.setRequiredAck(true);
//            Map<String, Object> data = new HashMap<>();
//            data.put("operation", "click");
//            data.put("x", x);
//            data.put("y", y);
//            output.setData(data);
//            doAfter(input, output);
//            connectionManager.send(new Gson().toJson(output));
//            session.put("step", step + 1);
//        };
//        ScreenCapture.getInstance().setConsumer(consumer);
    }

}
