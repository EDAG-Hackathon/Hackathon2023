import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

const option = {
  tooltip: {
    trigger: "axis",
  },
  legend: {},
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
      name: "Soll",
      type: "line",
      data: [21, 21, 22, 20, 20.5, 18, 18],
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
    },
    {
      name: "Ist",
      type: "line",
      data: [21.5, 21, 21.5, 20, 20, 16.5, 17.5],
    },
  ],
};

export function TempChart() {
  return <ReactECharts option={option} />;
}
