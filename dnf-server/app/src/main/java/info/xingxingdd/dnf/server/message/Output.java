package info.xingxingdd.dnf.server.message;

import java.util.Map;

public class Output {

    private String requestId;

    private String status;

    private String desc;

    private boolean requiredAck;

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

    public boolean isRequiredAck() {
        return requiredAck;
    }

    public void setRequiredAck(boolean requiredAck) {
        this.requiredAck = requiredAck;
    }

    public static Output success() {
        Output output = new Output();
        output.setStatus("success");
        output.setDesc("操作成功");
        output.setRequiredAck(false);
        return output;
    }


    public static Output success(Map<String, Object> data) {
        Output output = new Output();
        output.setStatus("success");
        output.setDesc("操作成功");
        output.setData(data);
        output.setRequiredAck(false);
        return output;
    }


    public static Output failure(String desc) {
        Output output = new Output();
        output.setStatus("failure");
        output.setDesc(desc);
        output.setRequiredAck(false);
        return output;
    }


    public static Output processing() {
        Output output = new Output();
        output.setStatus("processing");
        output.setDesc("操作处理中");
        output.setRequiredAck(false);
        return output;
    }

}
