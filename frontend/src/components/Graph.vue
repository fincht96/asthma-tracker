<template>
  <div>
    <canvas id="myChart"></canvas>

    <div class="flex-container">
      <div
        class="flex-item "
        v-bind:class="{ selected: selectedScale == 0 }"
        v-on:click="selectedScale = 0"
      >
        1 Day
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 1 }"
        v-on:click="selectedScale = 1"
      >
        5 Days
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 2 }"
        v-on:click="selectedScale = 2"
      >
        1 Month
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 3 }"
        v-on:click="selectedScale = 3"
      >
        6 Months
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 4 }"
        v-on:click="selectedScale = 4"
      >
        1 Year
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 5 }"
        v-on:click="selectedScale = 5"
      >
        5 Years
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 6 }"
        v-on:click="selectedScale = 6"
      >
        Max
      </div>
    </div>
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

      selectedScale: 0,
    };
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: stretch;
  margin-top: 70px;
}

.flex-item {
  color: #666;
  text-align: center;
  font-size: 13px;
  padding-bottom: 15px;
  /* border-bottom: solid 2px #e6e6e6; */
  flex-grow: 1;
  cursor: pointer;
}

.selected {
  border-bottom: solid 2px #808080;
}
</style>
