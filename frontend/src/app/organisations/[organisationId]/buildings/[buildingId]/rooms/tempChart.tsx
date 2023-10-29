import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

type EChartsOption = echarts.EChartsOption;

var chartDom = document.getElementById("main")!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;

option = {
  title: {
    text: "Gebäudetemperatur der letzten Woche",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      dataView: { readOnly: false },
      magicType: { type: ["line", "bar"] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} °C",
    },
  },
  series: [
    {
      name: "Highest",
      type: "line",
      data: [20, 19, 19.5, 21, 20.5, 17.5, 17],
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
      markLine: {
        data: [{ type: "average", name: "Avg" }],
      },
    },
    {
      name: "Lowest",
      type: "line",
      data: [18, 17.5, 18.5, 17, 17, 15, 15.5],
      markPoint: {
        data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: "average", name: "Avg" },
          [
            {
              symbol: "none",
              x: "90%",
              yAxis: "max",
            },
            {
              symbol: "circle",
              label: {
                position: "start",
                formatter: "Max",
              },
              type: "max",
              name: "最高点",
            },
          ],
        ],
      },
    },
  ],
};

option && myChart.setOption(option);
