package info.xingxingdd.dnf.executor;

import android.util.Log;

import com.google.gson.Gson;

import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public abstract class AbstractMessageExecutor implements MessageExecutor {

    private final MessageExecutorContext executorContext = new MessageExecutorContext();

    @Override
    public Output process(Input input) {
        doBefore(input);
        Output output = doProcess(input);
        doAfter(input, output);
        return output;
    }

    protected void doBefore(Input input) {
        executorContext.setValue("requestId", input.getRequestId());
        Log.i("dnf-server", new Gson().toJson(input));
    }

    protected abstract Output doProcess(Input input);

    protected void doAfter(Input input, Output output) {
        output.setRequestId(input.getRequestId());
        Log.i("dnf-server", new Gson().toJson(output));
    }

}
