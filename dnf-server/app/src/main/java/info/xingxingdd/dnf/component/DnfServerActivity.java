package info.xingxingdd.dnf.component;

import android.content.Context;
import android.content.Intent;
import android.media.projection.MediaProjectionManager;
import android.os.Build;
import android.os.Bundle;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;

public class DnfServerActivity extends ComponentActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(new Intent(this, DnfServerService.class));
        }
        startScreenCaptureRequest();
//        YoloV5Ncnn yoloV5Ncnn = new YoloV5Ncnn();
//        boolean result = yoloV5Ncnn.Init(getAssets());
//        AssetManager assetManager = getAssets();
//
//        // 打开 assets 目录下的图片文件
//        InputStream inputStream = null;
//        try {
//            inputStream = assetManager.open("frame_000057.jpg");
//            // 将输入流解码为 Bitmap
//            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
//
//            // 关闭输入流
//            inputStream.close();
//            YoloV5Ncnn.Obj[] results = yoloV5Ncnn.Detect(bitmap, false);
//            String labels = Arrays.stream(results).map(r -> r.label).collect(Collectors.joining(","));
//            if (!result) {
//                Toast.makeText(this, "注册失败", Toast.LENGTH_LONG).show();
//            } else {
//                Toast.makeText(this, "注册完成:" + labels, Toast.LENGTH_LONG).show();
//            }
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

    }

    private void startScreenCaptureRequest() {
        MediaProjectionManager projectionManager = (MediaProjectionManager) getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        // 发起屏幕捕获意图
        ActivityResultLauncher<Intent> startActivityForResult = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK) {
                        // 处理返回的结果
                        // 例如，从返回的 Intent 中获取数据
                        Intent data = result.getData();
                        // ...
                    }
                }
        );
        startActivityForResult.launch(projectionManager.createScreenCaptureIntent());
    }

    @Override
    protected void onResume() {
        super.onResume();
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
