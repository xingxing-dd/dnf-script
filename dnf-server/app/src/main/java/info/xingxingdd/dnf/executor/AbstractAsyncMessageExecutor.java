package info.xingxingdd.dnf.executor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public abstract class AbstractAsyncMessageExecutor extends AbstractMessageExecutor {

    @Override
    protected Output doProcess(Input input) {
        try {
            doAsyncProcess(input);
        } catch (Exception e) {
            return Output.failure(e.getLocalizedMessage());
        }
        return Output.processing();
    }

    protected abstract void doAsyncProcess(Input input);

}
