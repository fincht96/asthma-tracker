<template>
  <div id="table">
    <table class="table" style="width:100%; table-layout: fixed;">
      <thead>
        <tr>
          <th>When</th>
          <th>Peak Flow (L/min)</th>
          <th>Medication</th>
          <th v-if="this.windowWidth > 700" style="width:40%">
            Comment
          </th>
        </tr>
      </thead>

      <tbody v-if="this.windowWidth > 700">
        <tr
          v-for="(entry, index) in entries"
          :key="index"
          v-on:click="entrySelected(entry, index)"
          class="row"
        >
          <td>{{ formattedDate(entry.date) }}</td>
          <td>{{ entry.peakFlow }}</td>
          <td>{{ entry.medication }}</td>
          <td>
            <div class="comment">{{ entry.comment }}</div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr
          v-for="(entry, index) in entries"
          :key="index"
          v-on:click="entrySelected(entry, index)"
        >
          <td>{{ formattedDate(entry.date) }}</td>
          <td>{{ entry.peakFlow }}</td>
          <td>{{ entry.medication }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  mounted: function() {},

  computed: {
    windowWidth() {
      return this.$store.getters.windowWidth;
    },
  },

  data: function() {
    return {
      entries: this.$store.getters.entries,
    };
  },

  methods: {
    entrySelected(entry, index) {
      console.log("entry: ", index, " selected");
    },

    formattedDate(date) {
      date = new Date(date);
      let day = ("0" + date.getDate()).slice(-2);
      let month = date.toLocaleString("default", { month: "short" });
      let year = date.getFullYear();
      let hours = ("0" + date.getHours()).slice(-2);
      let mins = ("0" + date.getMinutes()).slice(-2);

      return `${month} ${day}, ${year} ${hours}:${mins}`;
    },
  },
};
</script>

<style scoped>
thead {
  font-size: 14px;
  color: #363636;
}

tbody {
  font-size: 14px;
  color: #363636;
}

th {
  margin: 0px 10px;
}

td {
  padding: 20px 10px;
  margin: 0px 10px;
  vertical-align: middle;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.comment {
  /* text-align: justify; */
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
}

#table {
  width: 100%;
  max-width: 1000px;
  padding: 0px 20px;
}

p {
  margin: auto;
  width: 80%;
}

.row:hover {
  background: #f6f6f6;
  cursor: pointer;
}
</style>
