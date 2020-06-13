<template>
  <div>
    <span>分析页</span>
    <Chart :option="chartOption" style="height:400px "> </Chart>
  </div>
</template>

<script>
import Chart from "../../components/ECharts/Chart";
// import random from "lodash/random";
import axios from "axios";

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {}
    };
  },
  methods: {
    getChartData() {
      // 数据接口请求，从API /api/dashboard/analysis/chart 获取数据
      axios
        .get("/api/dashboard/analysis/chart", { params: { PK_ID: 12345 } })
        .then(response => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: "销量",
                type: "bar",
                data: response.data
              }
            ]
          };
        });
    }
  },
  // mounted() {
  //   this.interval = setInterval(() => {
  //     this.chartOption.series[0].data = this.chartOption.series[0].data.map(
  //       () => random(100)
  //     );
  //     this.chartOption = { ...this.chartOption };
  //   }, 3000);
  // },
  mounted() {
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
