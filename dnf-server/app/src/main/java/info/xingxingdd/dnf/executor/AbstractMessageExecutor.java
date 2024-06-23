package info.xingxingdd.dnf.executor;

import android.content.Context;
import android.util.Log;

import com.google.gson.Gson;

import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public abstract class AbstractMessageExecutor implements MessageExecutor {

    private final MessageExecutorContext executorContext = new MessageExecutorContext();

    @Override
    public Output process(Input input, Context context) {
        doBefore(input, context);
        Output output = doProcess(input, context);
        doAfter(input, context, output);
        return output;
    }

    protected void doBefore(Input input, Context context) {
        executorContext.setValue("requestId", input.getRequestId());
    }

    protected abstract Output doProcess(Input input, Context context);

    protected void doAfter(Input input, Context context, Output output) {
        output.setRequestId(input.getRequestId());
        Log.i("dnf-server", new Gson().toJson(output));
    }

}
