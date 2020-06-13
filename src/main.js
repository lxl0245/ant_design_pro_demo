import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";

// 为了解决加载没有使用的组件，造成网络压力的问题
// import { Button, Input } from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";

// 如果需要使用多个组件，每个组件写上边的两行代码实在太繁琐
// 可以借助 Babel 组件，在 babel.config.js 文件中进行配置后，就可以只写一行代码
import { Button, Menu, Layout, Icon, Drawer, Radio } from "ant-design-vue";

import Authorized from "./components/Authorized";
import Auth from "./directives/Auth";

Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Auth);

Vue.component("Authorized", Authorized);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
