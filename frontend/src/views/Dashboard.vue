<template>
  <div class="dashboard">
    <h1>This is the dashboard page! Rock on!</h1>
  </div>
</template>
<script>
export default {
  name: "Dashboard",

  methods: {},

  async created() {
    try {
      // let resp = await fetch("http://localhost:3000");
      // let a = await resp.json();

      // if (a.a == 1) {
      //   console.log("a is 1!");
      // }

      console.log("called app");

      let resp = await fetch("http://localhost:3000/loggedin", {
        credentials: "include"
      });

      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>