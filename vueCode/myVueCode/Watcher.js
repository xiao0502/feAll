// 订阅者
function Watcher(vm, exp, cb) {
    this.cb = cb; // 更新函数
    this.vm = vm; // 实例对象 类似于new Vue()
    this.exp = exp; // node节点的属性值name、handleClick，比如v-model="name" v-on:click="handleClick"
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal)
        }
    },
    get: function () {
        Dep.target = this; // 缓存自己
        // console.log(Dep.target);
        var value = this.vm.data[this.exp]; // 强制执行监听器里面的get函数
        Dep.target = null; // 释放自己
        return value;
    }
}


