// Observer: 监听器
function Observer(data) {
    // 赋值data
    this.data = data;
    // 开始执行监听
    this.walk(data);
}

Observer.prototype = {
    /**
     * 执行defineReactive，即开始监听
     * @param data
     */
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        })
    },
    /**
     * 数据劫持进行绑定监听
     * @param data
     * @param key
     * @param value
     */
    defineReactive: function (data, key, value) {
        // 实例化一个订阅器
        var dep = new Dep();
        // 遍历时递归监听
        var childObj = observe(value);
        // 监听
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return value;
            },
            set: function (newValue) {
                // console.log(value + ' => ' + newValue);
                if (newValue === value) return;
                // 新值代替旧值
                value = newValue;
                // 对新值进行监听
                childObj = observe(newValue);
                // 订阅器通知对应的订阅者数据发生了变化
                dep.notify();
            }
        })
    }
}

// 判断data类型进行监听器实例化
function observe(data) {
    if (Object.prototype.toString.call(data) !== '[object Object]') return
    return new Observer(data);
}

// 订阅器: Dep
function Dep() {
    // 初始化订阅者
    this.subs = []
}

Dep.prototype = {
    /**
     * 添加订阅者
     * @param sub
     */
    addSub: function (sub) {
        this.subs.push(sub);
    },
    // 通知对应的订阅者进行更新动作
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
}

// 保证每个订阅者不一样
Dep.target = null;



