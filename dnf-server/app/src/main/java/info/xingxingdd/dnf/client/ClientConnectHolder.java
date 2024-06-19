package info.xingxingdd.dnf.client;

import com.google.gson.Gson;

import org.java_websocket.WebSocket;

public class ClientConnectHolder {

    /**
     * 只能允许有一个实例
     */
    private static ClientConnectHolder instance;

    private WebSocket connection;

    private ClientConnectHolder() {}

    public static ClientConnectHolder getInstance() {
        if (instance == null) {
            instance = new ClientConnectHolder();
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
        this.connection.send(new Gson().toJson(message));
    }

}
