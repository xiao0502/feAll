function TdVue(options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    // key值代理
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    })

    // 监听数据
    observe(options.data);

    // 编译模板
    new Compile(options.el, this);

    // 所有事情处理好后执行mounted函数
    options.mounted && options.mounted.call(this);
}

TdVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return self.data[key]
            },
            set: function (newValue) {
                self.data[key] = newValue;
            }
        })
    }
}