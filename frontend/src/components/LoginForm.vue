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
          <input
            class="input"
            type="text"
            v-model="email"
            :class="{
                'is-danger': emailError,
              }"
          />
          <p :class="{ 'is-danger': emailError }" class="help">{{ emailMsg }}</p>
        </div>
        <br />

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              v-model="password"
              type="password"
              oninput="return false"
              onpaste="return false"
              :class="{
                'is-danger': passwordError,
              }"
            />
            <p :class="{ 'is-danger': passwordError }" class="help">{{ passwordMsg }}</p>
          </div>
        </div>

        <br />

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-on:click="loginRequest" id="logInBtn">Log in</button>
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
      accountCreated: false,
      email: "",
      password: "",
      emailMsg: "",
      passwordMsg: "",
      emailError: false,
      passwordError: false
    };
  },

  methods: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },

    isEmailInUse() {
      // check here for existing emails in database
      // if (this.email == "finch851@gmail.com") {
      //   this.emailError = "Looks like this email is already in use";
      //   isValid = 1;
      // }

      if (this.email == "finch851@gmail.com") {
        return true;
      }

      return false;
    },

    isValidPassword() {
      return false;
    },

    loginRequest() {
      const logInBtn = document.getElementById("logInBtn");
      logInBtn.disabled = true;

      if (!this.isValidEmail()) {
        this.emailError = true;
        this.emailMsg = "Invalid email provided";
      } else if (!this.isEmailInUse()) {
        this.emailError = true;
        this.emailMsg = "Unable to find an account with that email";
      } else if (!this.isValidPassword()) {
        this.passwordError = true;
        this.passwordMsg = "Invalid password provided";
      }

      // sets authentication enabled and re routes to dashboard
      // this.$store.commit("setAuthentication", true);
      // this.$router.replace({ name: "Dashboard" });
    }
  },
  watch: {
    email: function(email) {
      this.emailError = "";
      this.emailMsg = "";
    },

    password: function(password) {
      this.passwordError = false;
      this.passwordMsg = "";
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
