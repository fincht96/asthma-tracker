<template>
  <div id="graph">
    <div id="canvas-container">
      <canvas id="myChart"></canvas>
    </div>

    <div class="flex-container">
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == '5d' }"
        v-on:click="scaleSelected('5d')"
      >
        5d
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == '1m' }"
        v-on:click="scaleSelected('1m')"
      >
        1m
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == '6m' }"
        v-on:click="scaleSelected('6m')"
      >
        6m
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == '1y' }"
        v-on:click="scaleSelected('1y')"
      >
        1y
      </div>
      <div
        class="flex-item"
        v-bind:class="{ selected: selectedScale == 'all' }"
        v-on:click="scaleSelected('all')"
      >
        Max
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Moment from "moment";

export default {
  name: "Graph",

  computed: {
    entries() {
      return this.$store.getters.entries;
    },

    selectedScale() {
      return this.$store.getters.selectedScale;
    },
  },

  watch: {
    entries: function(newEntries, oldEntries) {
      console.log("entries changed");

      this.filter(this.selectedScale);
    },
  },

  methods: {
    filter(scale) {
      this.chart.data.datasets[0].data = [];

      let mindate = Moment().subtract(1, "days");

      switch (scale) {
        case "5d":
          mindate = Moment().subtract(5, "days");
          break;

        case "1m":
          mindate = Moment().subtract(1, "months");
          break;

        case "6m":
          mindate = Moment().subtract(6, "months");
          break;

        case "1y":
          mindate = Moment().subtract(1, "year");
          break;
      }

      for (let i = 0; i < this.entries.length; i++) {
        if (this.entries[i].date >= mindate || scale == "all") {
          let newDataItem = {
            x: this.entries[i].date,
            y: this.entries[i].peakFlow,
          };

          this.chart.data.datasets[0].data.push(newDataItem);
        }
      }

      this.chart.data.datasets[0].data.sort(function(a, b) {
        return a.date - b.date;
      });

      this.chart.update();
    },

    scaleSelected(scale) {
      // set selected scale
      this.$store.commit("setSelectedScale", scale);
      // this.selectedScale = scale;

      this.filter(scale);
    },

    graphColor() {
      let currentHour = Moment().format("HH");
      console.log(currentHour);

      if (currentHour >= 3 && currentHour < 7) {
        return "248,177,149";
      } else if (currentHour >= 7 && currentHour < 12) {
        return "246,114,128";
      } else if (currentHour >= 12 && currentHour < 17) {
        return "192,108,132";
      } else if (currentHour >= 17 && currentHour < 21) {
        return "123,91,108";
      } else if (currentHour >= 21 || currentHour < 3) {
        console.log("this one");
        return "53,92,112";
      }
    },
  },

  mounted() {
    this.ctx = document.getElementById("myChart");

    this.chart = new Chart(this.ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "",
            data: this.data,
            showLine: true,
            backgroundColor: "rgba(" + this.graphColor() + ",0.5)",
            borderColor: "rgba(" + this.graphColor() + ",0.5)",
            pointBackgroundColor: "rgba(" + this.graphColor() + ",0.5)",
            pointBorderColor: "rgba(" + this.graphColor() + ",0.5)",
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
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
              scaleLabel: {
                display: true,
                labelString: "Date/Time",
              },
              time: {
                displayFormats: {
                  millisecond: "h:mm a",
                  second: "h:mm a",
                  minute: "h:mm a",
                  hour: "h a",
                  day: "MMM DD",
                  week: "MMM DD",
                  month: "MMM YYYY",
                  quarter: "MMM YYYY",
                  year: "YYYY",
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                precision: 1,
              },
            },
          ],
        },

        yAxisID: "Peak Flow",
      },
    });

    this.filter("5days");
  },

  data: function() {
    return {
      data: [],

      // when different time scale is selected simply filters all readings that don't fit within scale
      // selectedScale: "5d",
      chart: "",
      ctx: "",
    };
  },
};
</script>

<style scoped>
#graph {
  width: 100%;
  max-width: 1000px;
  padding: 0px 20px;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  flex-wrap: wrap;
  width: 100%;
  max-width: 650px;
}

.flex-item {
  color: #666;
  text-align: center;
  font-size: 13px;
  padding: 15px 0px;
  /* border-bottom: solid 2px #e6e6e6; */
  cursor: pointer;
  flex-grow: 1;
  border-bottom: solid 2px white;
}

.flex-item:hover {
  border-bottom: solid 2px #808080;
}

.selected {
  border-bottom: solid 2px #808080;
}
</style>
