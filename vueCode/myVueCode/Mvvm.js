function MyVue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    // key值代理
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    // 监听数据
    observe(this.data);

    // 编译dom
    // 对模板中的{{}} 和事件、指令等 添加订阅者 并 添加到订阅器里面
    new Compile(options.el, this);

    // 所有事情处理好后执行mounted函数
    options.mounted && options.mounted.call(this);
}

MyVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter () {
                return self.data[key];
            },
            set: function setter (newVal) {
                self.data[key] = newVal;
            }
        });
    }
}