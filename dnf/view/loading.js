exports.view = () => {
    const view = ui.inflate(
        <vertical gravity="center">
            <progressbar />
            <text text="检查更新中..." textColor="black" textSize="16sp"  gravity="center" margin="30"/>
        </vertical>
    )
    return view
}