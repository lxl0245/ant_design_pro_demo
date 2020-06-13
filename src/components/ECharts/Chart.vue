<template>
  <!-- <div ref="chartDom" class="chartDomClass"></div> -->
  <div ref="chartDom" :option="option"></div>
</template>

<script>
import debounce from "lodash";
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.resize = debounce(this.resize, 1);
    // 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法
  },

  mounted() {
    // 使用方式见ECharts官网
    // https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts
    // 基于准备好的dom，初始化echarts实例
    this.renderChart();

    // 监听charDom 的大小变化情况
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // 监听所载的组件销毁时，要同步终止监听，把chart 也销毁
    removeListener(this.$refs.chartDom, this.resize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.myChart.resize();
    },
    renderChart() {
      this.myChart = echarts.init(this.$refs.chartDom);
      this.myChart.setOption(this.option); // 选项是从父组件传递过来的
    }
  },
  watch: {
    // // 方法1：
    // option(val) {
    //   this.myChart.setOption(val);
    // }
    // // 方法2：
    // option: {
    //   handler(val) {
    //     this.myChart.setOption(val);
    //   },
    //   deep: true // 深度监听非常耗性能，有一个比较简单的替代方案
    // },
    // 方法3：依然监听 option，但是，在父组件传递值之前使用 {...this.chartOption} 把option变成一个新值就可以了
    option(val) {
      this.myChart.setOption(val);
    }
  }
};
</script>

<style scoped>
.chartDomClass {
  height: 500px;
}
</style>
