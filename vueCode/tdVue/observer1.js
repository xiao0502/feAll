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
        // 监听
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return value;
            },
            set: function (newValue) {
                console.log(value + ' => ' + newValue);
                value = newValue;
            }
        })
    }
}

// 判断data类型进行监听器实例化
function observe(data) {
    if (Object.prototype.toString.call(data) !== '[object Object]') return
    return new Observer(data);
}

let data = {
    name: 'xiaojin',
    age: 18
}

observe(data);


