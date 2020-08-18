<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <div style="font-size: 20px;">Asthma Tracker</div>
          </a>

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
            <router-link class="navbar-item" to="/home">Home</router-link>

            <router-link class="navbar-item" to="/about">About</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />

  </div>
</template>

<script>
export default {
  methods: {},

  async created() {
    console.log("hello world just started");

    try {
      let resp = await fetch("http://localhost:3000");
      let a = await resp.json();

      if (a.a == 1) {
        console.log("a is 1!");
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

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
