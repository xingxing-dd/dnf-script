package info.xingxingdd.dnf.executor.ext;

import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class SettingMessageExecutor extends AbstractMessageExecutor {

    @Override
    public Output doProcess(Input input) {
        return new Output();
    }

}
