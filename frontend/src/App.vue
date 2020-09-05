<template>
  <div id="app">
    <div id="nav" v-if="!this.$store.state.authenticated">
      <div
        style="  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;"
      >
        <div style="flex-grow:1; text-align:right;">
          <router-link to="/login">
            <a class="button is-primary" style=" letter-spacing: 0.0625em; font-weight:lighter; background: #F9ADA0;">
              <strong>Log in</strong>
            </a>
          </router-link>
        </div>
        <div style="flex-grow:9; text-align:left;">
          <router-link to="/" style="font-size: 20px;"
            >Asthma Tracker</router-link
          >
        </div>
      </div>
    </div>

    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "App",

  methods: {},

  async created() {
    try {
      if (!this.$store.state.authenticated) {
        console.log("no");
      }

      // let resp = await fetch("http://localhost:3000");
      // let a = await resp.json();

      // if (a.a == 1) {
      //   console.log("a is 1!");
      // }

      let resp = await fetch("http://localhost:3000/loggedin", {
        credentials: "include",
      });

      console.log(resp);

      if (resp.status == 200) {
        // sets authentication enabled and re routes to dashboard
        this.$store.commit("setAuthentication", true);
        this.$router.replace({ name: "Dashboard" });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
