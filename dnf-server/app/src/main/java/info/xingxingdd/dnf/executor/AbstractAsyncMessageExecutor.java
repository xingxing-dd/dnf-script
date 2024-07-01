package info.xingxingdd.dnf.executor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public abstract class AbstractAsyncMessageExecutor extends AbstractMessageExecutor {

    protected final ExecutorService executor = Executors.newFixedThreadPool(2);

    @Override
    protected Output doProcess(Input input) {
        Runnable executeTask = () -> doAsyncProcess(input);
        executor.execute(executeTask);
        return Output.processing();
    }

    protected abstract void doAsyncProcess(Input input);

}
