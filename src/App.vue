<template>
  <div id="app">
    <!-- <a-button>Ant 按钮</a-button>
    <a-input ></a-input> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <!-- 用于显示路由对应的组件内容 -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.ant-layout {
  height: 100%;
}
</style>
