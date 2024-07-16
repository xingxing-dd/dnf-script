package info.xingxingdd.dnf.server;

import android.util.Log;

import com.google.gson.Gson;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.executor.MessageExecutor;
import info.xingxingdd.dnf.executor.MessageExecutorFactory;
import info.xingxingdd.dnf.server.message.Input;
import info.xingxingdd.dnf.server.message.Output;

public class DnfSocketServer extends WebSocketServer {

    private final Gson gson = new Gson();

    private final ConnectionManager connectHolder = ConnectionManager.getInstance();

    public DnfSocketServer(InetSocketAddress inetSocketAddress) {
        super(inetSocketAddress);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        WebSocket history = connectHolder.getConnection();
        if (history != null) {
            history.close();
        }
        connectHolder.set(conn);
        Log.i("dnf-server", "客户端连接成功");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        connectHolder.remove();
        Log.i("dnf-server", "客户端连接断开");
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if (message == null || message.isEmpty()) {
            return;
        }
        Input input = gson.fromJson(message, Input.class);
        MessageExecutor messageExecutor = MessageExecutorFactory.acquire(input.getAction());
        Output output = messageExecutor.process(input);
        if (output == null) {
            return;
        }
        conn.send(gson.toJson(output));
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    @Override
    public void onStart() {
        Log.i("dnf-server", "服务已启动" );
    }

}
