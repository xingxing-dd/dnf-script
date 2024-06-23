package info.xingxingdd.dnf.assistant;

import android.media.Image;

import java.util.function.Consumer;
import java.util.function.Function;

public class ScreenCapture {

    private static ScreenCapture instance;

    private Consumer<Image> consumer;

    public static ScreenCapture getInstance() {
        if (instance == null) {
            instance = new ScreenCapture();
        }
        return instance;
    }

    public void setConsumer(Consumer<Image> consumer) {
        this.consumer = consumer;
    }

    public Consumer<Image> getConsumer() {
        return consumer;
    }

}
