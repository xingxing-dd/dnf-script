export function view() {
    const view = ui.inflate(
        <vertical h="100dp" weightSum="5">
            <text layout_weight="1" text="控件1" bg="#ff0000"/>
            <text layout_weight="2" text="控件2" bg="#00ff00"/>
            <text layout_weight="1" text="控件3" bg="#0000ff"/>
        </vertical>
    )
    return view
}