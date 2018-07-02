import Button from './button'
import Input from './input'

const components = {
    Button,
    Input
}

/**
 * Vue.use() 就是执行的install函数
 * @param Vue
 * @param options
 */
const install = (Vue, options = {}) => {
    if (install.installed) return;

    // 遍历注册组件
    Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    install,
    ...components
};

export default API


