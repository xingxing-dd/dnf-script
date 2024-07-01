package info.xingxingdd.dnf.executor.ext;

import info.xingxingdd.dnf.executor.AbstractMessageExecutor;
import info.xingxingdd.dnf.executor.MessageExecutor;
import info.xingxingdd.dnf.executor.MessageExecutorFactory;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;
import info.xingxingdd.dnf.server.session.Session;

public class ClientAckMessageExecutor extends AbstractMessageExecutor {

    @Override
    protected Output doProcess(Input input) {
        Session session = connectionManager.acquireSession(input.getRequestId());
        if (session == null) {
            return Output.failure("会话已关闭");
        }
        input.setAction(session.getAction());
        MessageExecutor messageExecutor = MessageExecutorFactory.acquire(input.getAction());
        if (messageExecutor == null) {
            return Output.failure("消息类型错误");
        }
        return messageExecutor.process(input);
    }

}
