// Observer: 监听器
// 观察每个属性，为每个属性添加相应的订阅者，一旦发生变化，通知订阅者做相应的事情
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key])
        })
    },
    defineReactive: function (data, key, val) {
        // 消息订阅器Dep
        var dep = new Dep();
        // 递归遍历监听所有属性
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                // 为每个属性添加一个订阅者
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) return
                val = newVal;
                // 对新值进行监听
                childObj = observe(newVal);
                // 变化时候通知订阅者
                dep.notify();
            }
        })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') return;
    return new Observer(data);
}


// 消息订阅器
// 订阅器Dep主要负责收集订阅者，然后在属性变化的时候执行对应订阅者的更新函数
function Dep() {
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

Dep.target = null;

