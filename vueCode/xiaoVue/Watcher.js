/**
 * 订阅者: Watcher
 * @param vm  vue实例
 * @param attributeValue 属性值，如name,handleClick  v-model="name" v-on:click="handleClick"
 * @param callback 订阅器通知订阅者数据发生变化之后的回调函数
 * @constructor
 */
function Watcher(vm, attr, callback) {
    this.vm = vm;
    this.attr = attr;
    this.callback = callback;
    this.value = this.getValue();
}

Watcher.prototype = {
    // 强制执行属性的get,把每个属性的订阅者添加到订阅器
    getValue: function () {
        // 缓存自己
        Dep.target = this;
        // console.log(Dep.target);
        // 强制执行属性里面的get函数
        var value = this.vm.data[this.attr];
        // 释放自己
        Dep.target = null;
        return value;
    },
    // 数据变化后执行回调
    update: function () {
        this.run()
    },
    // 执行回调
    run: function () {
        var value = this.vm.data[this.attr],
            oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.callback.call(this.vm, value, oldValue)
        }
    }

}