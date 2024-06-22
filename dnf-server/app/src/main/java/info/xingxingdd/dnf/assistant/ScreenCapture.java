package info.xingxingdd.dnf.assistant;

import android.media.Image;

import java.util.function.Function;

public class ScreenCapture {

    private static ScreenCapture instance;

    private Function<Image, Void> func;

    public static ScreenCapture getInstance() {
        if (instance == null) {
            instance = new ScreenCapture();
        }
        return instance;
    }

    public void setFunc(Function<Image, Void> func) {
        this.func = func;
    }

    public Function<Image, Void> getFunc() {
        return func;
    }

}
