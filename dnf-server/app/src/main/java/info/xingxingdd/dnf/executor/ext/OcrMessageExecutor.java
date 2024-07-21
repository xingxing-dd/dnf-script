package info.xingxingdd.dnf.executor.ext;

import android.graphics.Bitmap;
import android.util.Log;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.text.Text;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.ScreenCaptureTask;
import info.xingxingdd.dnf.executor.AbstractAsyncMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;

public class  OcrMessageExecutor  extends AbstractAsyncMessageExecutor {

    @Override
    protected void doAsyncProcess(Input input) {
        ScreenCaptureTask screenCaptureTask = new ScreenCaptureTask(input.getRequestId()) {

            @Override
            protected boolean process(Bitmap screenshot) {
                DetectionAssistant.recognizer.process(screenshot, 0).addOnSuccessListener(new OnSuccessListener<Text>() {
                    @Override
                    public void onSuccess(Text text) {
                        Log.i("dnf-server", "识别到目标:" + text.getText());
                    }
                });
                return true;
            }
        };
        ScreenCapture.getInstance().addScreenCaptureTask(screenCaptureTask);
    }

}
