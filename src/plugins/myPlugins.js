//自定义插件，向外暴露一个对象，该对象必须要有install方法
const myPlugins = {}
myPlugins.install = function (Vue, options) {//第一个参数是Vue,后面接收Vue.use()中传入的参数
    //Vue.directive:全局指令
    Vue.directive(options.name, (element, params) => {
        console.log(params)
        element.innerText = params.value
    })
}
export default myPlugins