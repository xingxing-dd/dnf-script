package info.xingxingdd.dnf.component;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.mcxiaoke.bus.Bus;

import java.net.InetSocketAddress;
import java.util.Arrays;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.assistant.DetectionAssistant;
import info.xingxingdd.dnf.assistant.ScreenCapture;
import info.xingxingdd.dnf.server.DnfSocketServer;
import info.xingxingdd.dnf.R;

public class   DnfServerService extends Service {

    private static final int SERVICE_NOTIFICATION_ID = 1;

    private static final String CHANNEL_ID = "DNF-SERVER";

    private DnfSocketServer dnfSocketServer;

    private DnfBroadcastReceiver broadcastReceiver;

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
                .addAction(new NotificationCompat.Action(
                        R.drawable.ic_exit, // 退出按钮的图标资源
                        "退出", // 退出按钮的标签
                        createStopServicePendingIntent() // 退出按钮的PendingIntent
                ))
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
    }

    private PendingIntent createStopServicePendingIntent() {
        Intent stopIntent = new Intent(this, DnfBroadcastReceiver.class);
        stopIntent.setAction("info.xingxingdd.dnf.action.STOP_SERVICE");
        return PendingIntent.getBroadcast(this, 0, stopIntent, PendingIntent.FLAG_IMMUTABLE);
    }

    /**
     * 启动后台websocket服务
     */
    private void startForegroundWebsocket() {
        InetSocketAddress inetSocketAddress = new InetSocketAddress("127.0.0.1", 5005);
        dnfSocketServer = new DnfSocketServer(inetSocketAddress);
        dnfSocketServer.start();
    }

    private void registerDnfBroadcastReceiver() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_CONFIGURATION_CHANGED);
        broadcastReceiver = new DnfBroadcastReceiver();
        registerReceiver(broadcastReceiver, filter);
    }

    private void startScreenCaptureService(Intent intent) {
        ScreenCapture screenCapture = ScreenCapture.getInstance();
        screenCapture.initScreenCaptureService(this, intent);
        screenCapture.start(getResources().getDisplayMetrics());
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            //启动websocket
            this.startForegroundWebsocket();
            //注册广播
            this.registerDnfBroadcastReceiver();
            //启动录屏服务
            this.startScreenCaptureService(intent);
            //初始化模型
            DetectionAssistant.initDetectionEngine(this);
            //初始化消息总线
            Bus.getDefault().register(this);
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
            //关闭资源
            ScreenCapture.getInstance().stop();
            //取消广播注册
            unregisterReceiver(broadcastReceiver);
            //取消消息总线注册
            Bus.getDefault().unregister(this);
        } catch (InterruptedException e) {
            Log.e("dnf-server", "websocket关闭失败", e);
        }
    }
}
