<template>
  <!--继承父组件的宽度 <div style="width: 256px"> -->
  <div>
    <a-menu
      :selectedKeys="selected_keys"
      :openKeys.sync="open_keys"
      mode="inline"
      :theme="theme"
    >
      <!-- :inline-collapsed="collapsed" -->
      <!-- 不指定 push(query)在切换菜单项时，会把主题和风格重置 -->
      <template v-for="item in menu_data">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () => {
              $router.push(
                {
                  path: item.path,
                  query: $route.query,
                },
                () => {},
                () => {}
              );
            }
          "
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    this.selected_keys_map = {};
    this.open_keys_map = {};
    const menu_data = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menu_data,
      selected_keys: this.selected_keys_map[this.$route.path],
      open_keys: this.collapsed ? [] : this.open_keys_map[this.$route.path]
    };
  },
  watch: {
    // 当 path 变化时，需要同步修改 selected_keys 和  open_keys
    "$route.path": function(val) {
      this.selected_keys = this.selected_keys_map[val];
      this.open_keys = this.collapsed ? [] : this.open_keys_map[val]
    }
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const mdata = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          // 用于关联路由和菜单项
          this.open_keys_map[item.path] = parentKeys;
          this.selected_keys_map[item.path] = [selectedKeys || item.path];

          // 一级菜单项：有 name 属性，且没有指定隐藏  hideInMenu
          const new_item = { ...item };
          delete new_item.children;
          if (item.children && !item.hideChildrenInMenu) {
            // 二级菜单项：有孩子节点，且没有指定 hideChildrenInMenu 选项，则渲染
            new_item.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            // 用于分布表单，在操作每一步时选择它的父级菜单项
            this.getMenuData(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            );
          }
          mdata.push(new_item);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          mdata.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return mdata;
    }
  }
};
</script>
