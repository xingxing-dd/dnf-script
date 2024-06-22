exports.view = () => {
    const view = ui.inflate(
        <vertical>
            <text layout_weight="1" text="控件1" bg="#ff0000"/>
            <button id="ok" text="启动"/>
        </vertical>
    )
    return view
}