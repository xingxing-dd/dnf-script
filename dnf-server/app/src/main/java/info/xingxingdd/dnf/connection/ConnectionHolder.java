package info.xingxingdd.dnf.connection;

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
        this.connection.send(new Gson().toJson(message));
    }

}
