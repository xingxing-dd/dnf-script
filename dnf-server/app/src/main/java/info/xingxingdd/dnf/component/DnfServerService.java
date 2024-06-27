package info.xingxingdd.dnf.component;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import java.net.InetSocketAddress;
import java.util.Arrays;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.assistant.YoloV5Ncnn;
import info.xingxingdd.dnf.server.DnfSocketServer;
import info.xingxingdd.dnf.R;

public class   DnfServerService extends Service {

    private static final int SERVICE_NOTIFICATION_ID = 1;

    private static final String CHANNEL_ID = "DNF-SERVER";

    private DnfSocketServer dnfSocketServer;

    private MediaProjectionManager projectionManager;

    private MediaProjection mediaProjection;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            Toast.makeText(this, "你当前的操作系统版本过低，无法使用", Toast.LENGTH_LONG).show();
            return;
        }
        //启动后台服务，保证服务存活
        this.startForegroundNotification();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void startForegroundNotification() {
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "dnf-server", NotificationManager.IMPORTANCE_DEFAULT);
        channel.setDescription("dnf-server");
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.createNotificationChannel(channel);
        Intent notificationIntent = new Intent(this, DnfServerActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("DNF助手后台服务")
                .setContentText("DNF助手后台服务运行中")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(pendingIntent)
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
    }

    /**
     * 启动后台websocket服务
     */
    private void startForegroundWebsocket() {
        InetSocketAddress inetSocketAddress = new InetSocketAddress("127.0.0.1", 5005);
        dnfSocketServer = new DnfSocketServer(inetSocketAddress);
        dnfSocketServer.start();
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            //启动websocket
            this.startForegroundWebsocket();
            //启动录屏服务
            ScreenCapture.getInstance().startScreenCaptureService(this, intent);
            //初始化模型
            YoloV5Ncnn.getInstance(getAssets());
        } catch (Exception e) {
            Toast.makeText(this, "打开服务失败:" + Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).collect(Collectors.joining(",")), Toast.LENGTH_LONG).show();
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        try {
            if (dnfSocketServer == null) {
                return;
            }
            dnfSocketServer.stop();
        } catch (InterruptedException e) {
            Log.e("dnf-server", "websocket关闭失败", e);
        }
    }
}
