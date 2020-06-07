<template>
  <div>
    <!-- closable：是否显示右上角的关闭按钮； placement：抽屉的方向，'top' | 'right' | 'bottom' | 'left' -->
    <!-- handle：设置后抽屉直接挂载到 DOM 上，你可以通过该 handle 控制抽屉打开关闭，支持 VNode | slot 方式 -->
    <!-- width：设置抽屉的宽度； 这个值必须要与CSS样式中的 width 的值相同 -->
    <!-- close方法：点击遮罩层或右上角叉或取消按钮的回调 -->
    <a-drawer
      title="Basic Drawer"
      :placement="placement"
      :closable="false"
      :visible="visible"
      @close="onClose"
      width="500px"
    >
      <template v-slot:handle>
        <!-- API handle：设置后抽屉直接挂载到 DOM 上，你可以通过该 handle 控制抽屉打开关闭，支持 VNode和solt两种方式 -->
        <div class="drawer_handler" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <!-- 把主题和风格配置绑定到路由上，通过事件的方式实现 -->
        <!-- <a-radio-group name="nav_theme" v-model="nav_theme"> -->
        <a-radio-group
          name="nav_theme"
          :value="$route.query.nav_theme"
          @change="e => handleSettingChange('nav_theme', e.target.value)"
        >
          <a-radio value="dark">
            黑色
          </a-radio>
          <a-radio value="light">
            白色
          </a-radio>
        </a-radio-group>
      </div>
      <div>
        <h2>导航模式</h2>
        <a-radio-group
          name="nav_layout"
          :value="$route.query.nav_layout"
          @change="e => handleSettingChange('nav_layout', e.target.value)"
        >
          <a-radio value="top">
            顶部
          </a-radio>
          <a-radio value="left">
            左侧
          </a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  name: "setting_drawer",
  data() {
    return {
      visible: false,
      placement: "right"
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      // 把主题和风格对应的值同步到路由参数上
      // this.$route  是路由【参数对象】，所有路由中的参数， params, query 都属于它
      // this.$router 是路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址
      // this.$router 相当于一个全局的路由器对象，包含了很多属性和对象（比如 history 对象），任何页面都可以调用其 push(), replace(), go() 等方法。
      // this.$route 表示当前路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name, path, params, query 等属性。
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>

<style scoped>
.drawer_handler {
  /* 位置 */
  position: absolute;
  top: 45%;
  right: 500px;
  /* 大小长宽 */
  width: 48px;
  height: 48px;
  line-height: 48px;
  /* 字体 */
  font-size: 20px;
  /* 颜色、对齐 */
  text-align: center;
  color: #fff;
  background: #1890ff;
  /* 形状 */
  border-radius: 3px 0 0 3px;
}
</style>
