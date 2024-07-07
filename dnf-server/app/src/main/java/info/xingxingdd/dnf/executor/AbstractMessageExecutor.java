package info.xingxingdd.dnf.executor;

import android.util.Log;

import com.google.gson.Gson;

import java.util.Objects;

import info.xingxingdd.dnf.server.ConnectionManager;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.dnf.server.session.Session;

public abstract class AbstractMessageExecutor implements MessageExecutor {

    protected final ConnectionManager connectionManager = ConnectionManager.getInstance();

    @Override
    public Output process(Input input) {
        doBefore(input);
        Output output = doProcess(input);
        doAfter(input, output);
        return output;
    }

    protected void doBefore(Input input) {
        Session session = connectionManager.createSession(input.getRequestId());
        session.setStatus("processing");
        session.setAction(input.getAction());
        Log.d("dnf-server", new Gson().toJson(input));
    }

    protected abstract Output doProcess(Input input);

    protected void doAfter(Input input, Output output) {
        output.setRequestId(input.getRequestId());
        Log.d("dnf-server", new Gson().toJson(output));
        if (Objects.equals("processing", output.getStatus())) {
            return;
        }
        //如果已完成，那么移除session
        connectionManager.closeSession(output.getRequestId());
    }

}
