package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.gson.Gson;
import com.google.mlkit.vision.text.Text;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class InitializeMessageExecutor extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {

        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            private boolean processCompleted = false;

            @Override
            protected boolean process(Bitmap screenshot) {
                try {
                    Bitmap croppedBitmap = Bitmap.createBitmap(screenshot,
                            (int) getData("x"), (int) getData("y"),
                            (int) getData("w"), (int) getData("h")
                    );
                    DetectionAssistant.recognizer.process(croppedBitmap, 0).addOnSuccessListener(text -> {
                        List<Text.TextBlock> textBlocks = text.getTextBlocks();
                        for (Text.TextBlock textBlock: textBlocks) {
                            Log.i("dnf-server", textBlock.getText());
                        }
                    }).addOnCompleteListener( task -> processCompleted = true);
                } catch (Exception e) {
                    Log.e("dnf-server", "生成截图文件异常: " + e.getLocalizedMessage());
                }
                return processCompleted;
            }

        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
