<template>
  <div class="flex-container">
    <div class="row">
      <div class="notification is-success" v-if="accountCreated">
        <button class="delete" v-on:click="accountCreated = false">></button>
        <strong>Account Created Successfully!</strong>
      </div>

      <br />
      <h1 class="title is-4">Welcome to Asthma Tracker!</h1>

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
          <p :class="{ 'is-danger': emailError }" class="help">
            {{ emailMsg }}
          </p>
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
              v-on:keyup.enter="loginRequest()"
              :class="{
                'is-danger': passwordError,
              }"
            />
            <p :class="{ 'is-danger': passwordError }" class="help">
              {{ passwordMsg }}
            </p>
          </div>
        </div>

        <div style="height:50px;" />

        <button
          style="width:100%;  letter-spacing: 0.0625em; font-weight:lighter;"
          class="button is-link"
          v-on:click="loginRequest"
          id="logInBtn"
        >
         Log in
        </button>

        <div style="height:50px;" />
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
      passwordError: false,
    };
  },

  methods: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },

    async isEmailUsed() {
      // check here for existing emails in database

      try {
        var url = new URL("http://localhost:3000/user");
        var params = { email: this.email }; // or:
        url.search = new URLSearchParams(params).toString();

        let resp = await fetch(url);

        console.log(resp);

        if (resp.status == 200) {
          return true;
        }

        return false;
      } catch (e) {
        console.log(e);
      }
    },

    // isValidPassword() {

    //   return false;
    // },

    async loginRequest() {
      const logInBtn = document.getElementById("logInBtn");
      logInBtn.disabled = true;

      try {
        if (!this.isValidEmail()) {
          this.emailError = true;
          this.emailMsg = "Invalid email provided";
        } else if (!(await this.isEmailUsed())) {
          this.emailError = true;
          this.emailMsg = "Unable to find an account with that email";
        } else if (this.password.length < 8) {
          this.passwordError = true;
          this.passwordMsg = "A password of at least 8 characters is required";
        } else {
          // attempt to login

          let resp = await fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });

          if (resp.status == 200) {
            this.$store.commit("setAuthentication", true);
            this.$router.replace({ name: "Dashboard" });
          } else {
            this.passwordError = true;
            this.passwordMsg = "Invalid password provided";
          }

          console.log(resp);
        }

        logInBtn.disabled = false;
      } catch (e) {
        console.log(e);
        logInBtn.disabled = false;
      }
    },
  },
  watch: {
    email: function(email) {
      this.emailError = "";
      this.emailMsg = "";
    },

    password: function(password) {
      this.passwordError = false;
      this.passwordMsg = "";
    },
  },
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
