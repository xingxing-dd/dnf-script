package info.xingxingdd.dnf.executor.impl;

import android.content.Context;

import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public class SettingMessageExecutor extends AbstractMessageExecutor {

    @Override
    public Output process(Input input, Context context) {
        return new Output();
    }

}
