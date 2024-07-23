package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.text.Text;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class  OcrMessageExecutor  extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {
        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                DetectionAssistant.recognizer.process(screenshot, 90).addOnSuccessListener(new OnSuccessListener<Text>() {
                    @Override
                    public void onSuccess(Text text) {
                        Log.i("dnf-server", "识别到目标:" + text.getText());
                        List<Text.TextBlock> textBlocks = text.getTextBlocks();
                        Map<String, Object> data = new HashMap<>();
                        List<Map<String, Object>> mapList = new ArrayList<>();
                        if (!textBlocks.isEmpty()) {
                            for (int index = 0; index < textBlocks.size(); index++) {
                                Map<String, Object> item = new HashMap<>();
                                item.put("box", textBlocks.get(index).getBoundingBox());
                                item.put("text", textBlocks.get(index).getText());
                                mapList.add(item);
                            }
                            data.put("textBlocks", mapList);
                        }
                        Output output = Output.success();
                        output.setRequestId(getRequestId());
                        output.setData(data);
                        connectionManager.send(output);
                    }
                });
                return true;
            }
        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
