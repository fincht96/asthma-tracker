<template>
  <div class="dashboard">
    <h1>This is the dashboard page! Rock on!</h1>
    <a v-on:click="onLogout()">Logout</a>
  </div>
</template>
<script>
export default {
  name: "Dashboard",

  methods: {
    async onLogout() {
      try {
        let resp = await fetch("http://localhost:3000/logout?_method=DELETE", {
          method: "POST",
          credentials: "include"
        });

        if (resp.status == 200) {
          // sets authentication disabled and re routes to login
          this.$store.commit("setAuthentication", false);
          this.$router.replace({ name: "Login" });
        }
      } catch (e) {
        console.log(e);
      }

      // POST http://localhost:3000/logout?_method=DELETE
      // send fetch request to log out
    }
  },

  async created() {
    try {
      // let resp = await fetch("http://localhost:3000");
      // let a = await resp.json();

      // if (a.a == 1) {
      //   console.log("a is 1!");
      // }

      console.log("called app");
    } catch (e) {
      console.log(e);
    }
  }
};
</script>