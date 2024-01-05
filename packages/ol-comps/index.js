import LMap from './map';
import LScale from './control'

// 存储组件列表
const components = [
    LMap,
    LScale,
]
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents = (app) => {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
const install = (app) => {
  installComponents(app)
}

export default {
  ...components, // 按需引入
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
