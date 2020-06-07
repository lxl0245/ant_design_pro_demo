<template functional>
  <!-- 使用函数式组件实现子菜单 -->
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <!-- 不指定 push(query)在切换菜单项时，会把主题和风格重置 -->
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          () => {
            parent.$router.push(
              {
                path: item.path,
                query: parent.$route.query
              },
              () => {},
              () => {}
            );
          }
        "
      >
        <!-- 二级菜单配置图标
          <a-icon
          v-if="props.menuInfo.meta.icon"
          :type="props.menuInfo.meta.icon"
        /> -->
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
export default {
  props: ['menuInfo'],
};
