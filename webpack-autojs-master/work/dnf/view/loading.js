exports.view = () => {
    const view = ui.inflate(
        <vertical gravity="center">
            <progressbar />
            <text text="正在启动..." textColor="black" textSize="16sp"  gravity="center" margin="30"/>
        </vertical>
    )
    return view
}