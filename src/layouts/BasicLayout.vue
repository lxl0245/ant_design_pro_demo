<template>
  <div>
    <header_component></header_component>
    <slider_menu></slider_menu>
    <router-view></router-view>
    <footer_component></footer_component>
  </div>
</template>

<script>
import header_component from "./Header";
import footer_component from "./Footer";
import slider_menu from "./SliderMenu";
export default {
  name: "basic_layout",
  components: {
    header_component,
    footer_component,
    slider_menu,
  }
};
</script>

<style></style>
