var variable = []
var executors = {}

exports.addTask = (name, task, delay) => {
    let executor = {
        "task": task, 
        "status": "pening",
        "delay": delay,
        //下一次可执行时间
        "next": Date.now() + delay
    }
    executors[name] = executor
}
exports.execTask = () => {
    for (var name in executors) {
        let executor = executors[name]
        let current = Date.now()
        if (executor.next > current) {
            continue
        }
        if(executor.status != 'pening') {
            continue
        } 
        executor.task()
        executor.next = current + executor.delay
    }
}
exports.removeTask = (name) => {
    if (!executors[name]) {
        return
    }
    delete executors[name]
}