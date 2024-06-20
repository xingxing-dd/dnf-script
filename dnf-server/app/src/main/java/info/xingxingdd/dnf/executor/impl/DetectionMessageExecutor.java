package info.xingxingdd.dnf.executor.impl;

import static androidx.core.content.ContextCompat.getSystemService;

import android.content.Context;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;

import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public class DetectionMessageExecutor extends AbstractMessageExecutor {

    @Override
    public Output process(Input input, Context context) {
        return Output.success();
    }

}
