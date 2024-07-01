package info.xingxingdd.dnf.component;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.projection.MediaProjectionManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.stream.Collectors;

import info.xingxingdd.dnf.DnfServerApplication;
import info.xingxingdd.yolov5.library.YoloV5Ncnn;

public class DnfServerActivity extends ComponentActivity implements ActivityResultCallback<ActivityResult> {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
////        boolean result = yoloV5Ncnn.Init(getAssets());
//          AssetManager assetManager = getAssets();
//         YoloV5Ncnn yoloV5Ncnn = YoloV5Ncnn.getInstance(assetManager, "yolov5s");
////
////        // 打开 assets 目录下的图片文件
////        InputStream inputStream = null;
//        try {
//            InputStream inputStream = assetManager.open("frame_000057.jpg");
//            // 将输入流解码为 Bitmap
//            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
//
//            // 关闭输入流
//            inputStream.close();
//            YoloV5Ncnn.Obj[] results = yoloV5Ncnn.detect(bitmap, false);
//            String labels = Arrays.stream(results).map(r -> r.label).collect(Collectors.joining(","));
//
//            Toast.makeText(this, "注册完成:" + labels, Toast.LENGTH_LONG).show();
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

    }

    @RequiresApi(api = Build.VERSION_CODES.TIRAMISU)
    @Override
    protected void onStart() {
        super.onStart();
        requestReadImagePermission();
        DnfServerApplication application = (DnfServerApplication) getApplication();
        if (application.isForegroundServiceRunning()) {
            finishAffinity();
            return;
        }
        MediaProjectionManager projectionManager = (MediaProjectionManager) getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        // 发起屏幕捕获意图
        ActivityResultLauncher<Intent> startActivityForResult = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                this
        );
        startActivityForResult.launch(projectionManager.createScreenCaptureIntent());
    }

    @RequiresApi(api = Build.VERSION_CODES.TIRAMISU)
    private void requestReadImagePermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES)
                != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_MEDIA_IMAGES},
                    1001);
        }
    }

    @Override
    public void onActivityResult(ActivityResult result) {
        if (result.getResultCode() != RESULT_OK) {
            Toast.makeText(this, "未开启录屏权限，无法使用系统", Toast.LENGTH_LONG).show();
            return;
        }
        Intent serviceIntent = new Intent(this, DnfServerService.class);
        serviceIntent.putExtra("resultCode", result.getResultCode());
        serviceIntent.putExtra("data", result.getData());
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            Toast.makeText(this, "操作系统版本过低，请更新操作系统", Toast.LENGTH_LONG).show();
            return;
        }
        //启动后台服务
        startForegroundService(serviceIntent);
        //设置服务启动
        ((DnfServerApplication) getApplication()).setForegroundServiceRunning();
        finishAffinity();
    }

}
