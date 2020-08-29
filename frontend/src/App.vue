

<template>
  <div id="app">
    <div id="nav">
      <nav
        class="navbar"
        role="navigation"
        aria-label="main navigation"
        v-if="!this.$store.state.authenticated"
      >
        <div class="navbar-brand">
          <div class="navbar-item" href="/">
            <!-- <div style="font-size: 20px;">Asthma Tracker</div> -->
            <router-link to="/" style="font-size: 20px;">Asthma Tracker</router-link>
          </div>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <router-link to="/">Home</router-link>
            </div>

            <div class="navbar-item">
              <router-link to="/about">About</router-link>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <router-link to="/login">
                <a class="button is-primary">
                  <strong>Log in</strong>
                </a>
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />

    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div style="width:100px; height:200px; background-color:white;">Hello World</div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
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
        credentials: "include"
      });

      if (resp.status == 200) {
        // sets authentication enabled and re routes to dashboard
        this.$store.commit("setAuthentication", true);
        this.$router.replace({ name: "Dashboard" });
      }
    } catch (e) {
      console.log(e);
    }
  }
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
</style>
