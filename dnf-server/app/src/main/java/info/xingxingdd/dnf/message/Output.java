package info.xingxingdd.dnf.message;

import java.util.Map;

public class Output {

    private String requestId;

    private String status;

    private String desc;

    private Map<String, Object> data;

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }


    public static Output success() {
        Output output = new Output();
        output.setStatus("success");
        output.setDesc("操作成功");
        return output;
    }


    public static Output success(Map<String, Object> data) {
        Output output = new Output();
        output.setStatus("success");
        output.setDesc("操作成功");
        output.setData(data);
        return output;
    }


    public static Output failure(String desc) {
        Output output = new Output();
        output.setStatus("failure");
        output.setDesc(desc);
        return output;
    }


    public static Output pending() {
        Output output = new Output();
        output.setStatus("pending");
        output.setDesc("操作待处理");
        return output;
    }

}
