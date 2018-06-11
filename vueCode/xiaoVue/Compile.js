// 编译器: Compile

function Compile(el, vm) {
    // 获取vue生效区域
    this.el = document.querySelector(el);
    this.vm = vm;
    // 初始化fragment元素
    this.fragment = null;
    // 初始化
    this.init();
}

Compile.prototype = {
    // 初始化
    init: function () {
        if (this.el) {
            // 将绑定的dom元素整个添加到fragment元素
            this.fragment = this.nodeToFragment(this.el);
            // 编译fragment元素
            this.compileElement(this.fragment)
        }
    },
    /**
     * 将绑定的dom元素整个添加到fragment元素
     * @param el
     */
    nodeToFragment: function (el) {
        // 新建虚拟节点对象
        var fragment = document.createDocumentFragment(),
            child = el.firstChild;
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild;
        }
        return fragment;
    },
    /**
     * 编译fragment元素
     * @param fragment
     */
    compileElement: function (fragment) {
        // console.log(fragment.childNodes);
        var childNodes = fragment.childNodes,
            childNodesArr = [],
            self = this;
        // 遍历节点
        childNodesArr.slice.call(childNodes).forEach(function (node) {
            var text = node.textContent,
                reg = /\{\{(.*)\}\}/;
            if (self.isElementNode(node)) {
                self.compile(node);
            }else if (self.isTextNode(node) && reg.test(text)) {
                console.log(reg.exec(text)[1]);
                //第 0 个元素是与正则表达式相匹配的文本 reg.exec(text)[0] 为 '{{data}}'
                //第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本 reg.exec(text)[1]为'data'
                self.compileText(node, reg.exec(text)[1]);
            }
        })
    },
    /**
     * 编译节点
     * @param node
     */
    compile: function (node) {
        var nodeAttrs = node.attributes,
            self = this;
        // console.log(nodeAttrs);
        // 取出节点的属性与属性值，例如v-model="name", v-on:click="handleClick"
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            // console.log(attr);
            var attrName = attr.name;
            // 判断是否是vue指令
            if (self.isDirective(attrName)) {
                // 取出属性值，即各种事件或者数据之类
                var attrValue = attr.value;
                // 取出指令类型
                var dir = attrName.substring(2);
                // 事件指令
                if (self.isEventDirective(dir)) {
                    self.compileEvent(node, self.vm, attrName, dir);
                } else {
                // v-model 指令
                    self.compileModel(node, self.vm, attrName, dir);
                }
                node.removeAttribute(attrName);
            } 
        })
    },
    /**
     * 是否是元素节点
     * @param node
     */
    isElementNode: function (node) {
        return node.nodeType == 1
    },
    /**
     * 判断是否是vue指令
     * @param attrName
     */
    isDirective: function (attrName) {
        return attrName.indexOf('v-') == 0;
    },
    /**
     * 判断是否是指令事件
     * @param dir
     * @returns {boolean}
     */
    isEventDirective: function (dir) {
        return dir.indexOf('on:') === 0;
    },
    /**
     * 判断是否是文本节点
     * @param node
     * @returns {boolean}
     */
    isTextNode: function(node) {
        return node.nodeType == 3;
    },
    /**
     * 编译事件
     * @param dir
     */
    compileEvent: function (node, vm, attrName, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[attrName];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    /**
     * 编译vue数据
     * @param node
     * @param vm
     * @param attrName
     * @param dir
     */
    compileModel: function (node, vm, attrName, dir) {
        var self = this,
            val = this.vm[attrName];
        // 完成挂载，{{ }}中的值被渲染为data中的值
        this.modelUpdater(node, val);
        new Watcher(this.vm, attrName, function (value) {
            console.log(value);
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[attrName] = newValue;
            val = newValue;
        });
    },
    /**
     * 更新vue数据
     * @param node
     * @param value
     */
    modelUpdater: function(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    /**
     * 编译模板数据
     * @param node
     * @param attrName
     */
    compileText: function (node, attrName) {
        var self = this;
        var initText = this.vm[attrName];
        this.updateText(node, initText);
        new Watcher(this.vm, attrName, function (value) {
            console.log(attrName);
            self.updateText(node, value);
        });
    },
    /**
     * 更新模板视图
     * @param node
     * @param value
     */
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
}