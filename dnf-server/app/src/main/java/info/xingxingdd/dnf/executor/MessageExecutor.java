package info.xingxingdd.dnf.executor;

import android.content.Context;

import info.xingxingdd.dnf.message.Input;
import info.xingxingdd.dnf.message.Output;

public interface MessageExecutor {

    /**
     * 处理消息
     * @param input 输入
     * @param context 上下文
     * @return 返回输出
     */
    Output process(Input input, Context context);

}
