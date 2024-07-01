"ui";
ui.layout(
    <horizontal>
        <button w="auto" text="自适应宽度" id = "test"/>
    </horizontal>
);
ui.test.click(function() {
    ui.finish()
    threads.start(() => {
        console.show(); 
        console.setCanInput(false)
        console.setTitle("dnf")
        console.setBackgroud("#33ef0000");
        console.info("xc")
    })
})