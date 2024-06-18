package info.xingxingdd.dnf.connection;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

import info.xingxingdd.dnf.connection.client.ClientConnectHolder;

public class DnfWebSocketServer extends WebSocketServer {

    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    private final Context context;

    private final ClientConnectHolder connectHolder = ClientConnectHolder.getInstance();

    public DnfWebSocketServer(Context context, InetSocketAddress inetSocketAddress) {
        super(inetSocketAddress);
        this.context = context;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        connectHolder.set(conn);
        mainHandler.post(() -> Toast.makeText(context, "客户端连接成功", Toast.LENGTH_LONG).show());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        connectHolder.remove();
        mainHandler.post(() -> Toast.makeText(context, "客户端连接断开", Toast.LENGTH_LONG).show());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if (message == null || message.isEmpty()) {
            return;
        }

    }

    @Override
    public void onError(WebSocket conn, Exception ex) {

    }

    @Override
    public void onStart() {
        mainHandler.post(() -> Toast.makeText(context, "服务已启动", Toast.LENGTH_LONG).show());

    }

}
