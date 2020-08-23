<template>
  <div class="flex-container">
    <div class="row">
      <div class="notification is-success" v-if="accountCreated">
        <button class="delete" v-on:click="accountCreated = false">></button>
        <strong>Account Created Successfully!</strong>
      </div>

      <br />
      <h1 class="title">Log in</h1>

      <br />

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" />
        </div>
        <br />

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" />
          </div>
        </div>

        <br />

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-on:click="loginRequest">Log in</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>

        <br />
        <br />
        <div>
          Don't have an account?
          <router-link to="/signup">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  mounted: function() {
    this.accountCreated = this.$store.getters.accountCreated;
    if (this.accountCreated) {
      this.$store.commit("setAccountCreated", false);
    }
  },

  data: function() {
    return {
      accountCreated: false
    };
  },

  methods: {
    loginRequest() {
      this.$store.commit("setAuthentication", true);
      this.$router.replace({ name: "Dashboard" });
    }
  }
};
</script>

<style scoped>
.flex-container {
  height: 100%;
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  padding: 30px;
  width: 100%;
  max-width: 400px;

  text-align: left;
}
</style>
