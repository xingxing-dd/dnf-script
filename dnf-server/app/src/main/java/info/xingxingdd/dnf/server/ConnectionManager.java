package info.xingxingdd.dnf.server;

import android.util.Log;

import com.google.gson.Gson;

import org.java_websocket.WebSocket;

import java.util.HashMap;
import java.util.Map;

import info.xingxingdd.dnf.server.session.Session;

public class ConnectionManager {

    /**
     * 只能允许有一个实例
     */
    private static final ConnectionManager instance = new ConnectionManager();

    private WebSocket connection;

    private Map<String, Session> sessionStore;

    private ConnectionManager() {}

    public static ConnectionManager getInstance() {
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

    public synchronized Session createSession(String requestId) {
        if (sessionStore == null) {
            sessionStore = new HashMap<>();
        }
        if (sessionStore.containsKey(requestId)) {
            return sessionStore.get(requestId);
        }
        Session session = new Session();
        session.setRequestId(requestId);
        sessionStore.put(requestId, session);
        return session;
    }

    public Session acquireSession(String requestId) {
        if (sessionStore == null) {
            sessionStore = new HashMap<>();
        }
        return sessionStore.get(requestId);
    }

    public void closeSession(String requestId) {
        Session session = acquireSession(requestId);
        if (session == null) {
            return;
        }
        sessionStore.remove(requestId);
    }

}
