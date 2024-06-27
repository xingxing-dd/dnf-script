package info.xingxingdd.dnf.executor;

import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public interface MessageExecutor {

    /**
     * 处理消息
     * @param input 输入
     * @return 返回输出
     */
    Output process(Input input);

}
