package info.xingxingdd.dnf.server;

import android.util.Log;

import com.google.gson.Gson;

import org.java_websocket.WebSocket;

public class ConnectionHolder {

    /**
     * 只能允许有一个实例
     */
    private static ConnectionHolder instance;

    private WebSocket connection;

    private ConnectionHolder() {}

    public static ConnectionHolder getInstance() {
        if (instance == null) {
            instance = new ConnectionHolder();
        }
        return instance;
    }

    public void set(WebSocket connection) {
        this.connection = connection;
    }

    public void remove() {
        if (this.connection.isOpen()) {
            this.connection.close();
        }
        this.connection = null;
    }

    public void send(Object message) {
        String messageBody = new Gson().toJson(message);
        Log.i("dnf-server", "发送消息:" + messageBody);
        this.connection.send(messageBody);
    }

}
