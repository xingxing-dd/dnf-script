package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.graphics.Rect;
import android.util.Log;

import com.google.gson.Gson;
import com.google.mlkit.vision.text.Text;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class TextDetectMessageExecutor extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId(), input.getData()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    Log.i("dnf-server", new Gson().toJson(getData()));
                    Bitmap croppedBitmap = Bitmap.createBitmap(screenshot,
                            (int) ((double)getData("x")),
                            (int) ((double)getData("y")),
                            (int) ((double)getData("w")),
                            (int) ((double)getData("h"))
                    );
                    DetectionAssistant.recognizer.process(croppedBitmap, 0).addOnSuccessListener(text -> {
                        Map<String, Object> data = convertResult(text.getTextBlocks());
                        Output output = Output.success();
                        output.setRequestId(getRequestId());
                        output.setData(data);
                        connectionManager.send(output);
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return true;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

    private Map<String, Object> convertResult(List<Text.TextBlock> textBlocks) {
        Map<String, Object> result = new HashMap<>();
        for (int index = 0; index < textBlocks.size(); index++) {
            Text.TextBlock block = textBlocks.get(index);
            Rect rect = block.getBoundingBox();
            if (rect == null) {
                continue;
            }
            Map<String, Object> item = new HashMap<>();
            item.put("label", block.getText());
            item.put("x", rect.left);
            item.put("y", rect.top);
            item.put("w", rect.right - rect.left);
            item.put("h", rect.bottom - rect.top);
            result.put(block.getText(), item);
        }
        return result;
    }

}
