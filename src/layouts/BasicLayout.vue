<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
  >
    <!-- ant design vue 的官方文档可以看到， layout 有一个 theme 属性，可以指定主题（只能 dark | light） -->
    <!-- v-model双向绑定属性； trigger=null表示隐藏默认设定，使用自定义触发器； collapsible 表示可以可折叠（Collapsibles）允许您隐藏或显示内容  -->
    <a-layout-sider
      v-if="nav_layout === 'left'"
      :theme="nav_theme"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :class="[`nav-theme-${nav_theme}`, `nav-theme-${nav_layout}`]"
    >
      <div class="logo">Ant Design Vue Pro</div>
      <slider_menu></slider_menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <!-- header、footer、slider_menu的CSS样式在自己的Vue文件中设置 -->
        <header_component></header_component>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        Content
        <!-- 通过 router-view 加载路由对应的组件 -->
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>
        <footer_component></footer_component>
      </a-layout-footer>
    </a-layout>
    <setting_drawer></setting_drawer>
  </a-layout>
</template>
<script>
import header_component from "./Header";
import footer_component from "./Footer";
import slider_menu from "./SliderMenu";
import setting_drawer from "../components/SettingDrawer";
export default {
  name: "basic_layout",
  components: {
    header_component,
    footer_component,
    slider_menu,
    setting_drawer
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    // 通过计算属性，从路由参数中获取主题和风格的值
    nav_theme() {
      return this.$route.query.nav_theme || "dark";
    },
    nav_layout() {
      return this.$route.query.nav_layout || "left";
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.logo {
  height: 32px;
  line-height: 32px;
  text-align: center;
  /* padding: 1px 1px 0 0; */
  overflow: hidden;

}
.nav-theme-dark {
  color: white;
}
.nav-theme-light {
  color:black;
}
</style>
