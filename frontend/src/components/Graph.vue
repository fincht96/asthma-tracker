<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "Graph",

  methods: {},

  mounted() {
    console.log("called");

    for (let i = 0; i < this.$store.getters.entries.length; i++) {
      let newDataItem = {
        x: this.$store.getters.entries[i].date,
        y: this.$store.getters.entries[i].peakFlow,
      };
      this.data.push(newDataItem);
    }

    console.log(this.data);

    var ctx = document.getElementById("myChart");

    ctx.width = document.body.clientWidth * 0.8;
    ctx.height = document.body.clientHeight * 0.5;

    if (ctx.width > 800) {
      ctx.width = 800;
    }

    console.log(ctx);

    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "",
            data: this.data,
          },
        ],
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontColor: "rgb(255, 99, 132)",
          },
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Peak Flow (L/min)",
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              ticks: {
                autoSkip: true,
                maxTicksLimit: 15,
              },
            },
          ],
        },

        yAxisID: "Peak Flow",
      },
    });
  },

  data: function() {
    return {
      data: [],
    };
  },
};
</script>

<style scoped></style>
