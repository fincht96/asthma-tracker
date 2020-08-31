<template>
  <div class="flex-container">
    <div class="row">
      <h1 class="title">Sign Up</h1>
      <br />

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            v-bind:class="{
              'is-danger': emailMsg.length,
            }"
            type="text"
            v-model="email"
          />
        </div>

        <p class="help is-danger" v-if="emailMsg.length">{{ emailMsg }}</p>

        <br />

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="password1"
              oninput="return false"
              onpaste="return false"
              :class="{
                'is-danger': password1Error,
              }"
            />
            <p :class="{ 'is-danger': password1Error }" class="help">{{ password1Msg }}</p>

            <div v-if="password1.length" class="password-background" id="pwb"></div>
            <div v-if="password1.length" class="strength" id="pws"></div>
          </div>

          <br v-if="!password1.length" />

          <label class="label">Re-enter password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              oninput="return false"
              onpaste="return false"
              v-model="password2"
              :class="{
                'is-danger': password2Error,
              }"
            />
            <p v-if="password2Error" class="help is-danger">Passwords don't match</p>
          </div>
        </div>

        <br />

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-on:click="signUpRequest" id="signUpBtn">Sign Up</button>
          </div>
        </div>

        <br />
        <br />
        <div>
          Already have an account?
          <router-link to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpForm",

  methods: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },

    async isEmailUsed() {
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

      return false;
    },

    isValidPassword() {
      const zxcvbn = require("zxcvbn");
      const passwordScore = zxcvbn(this.password1)["score"];
      if (passwordScore > 1) {
        return true;
      } else {
        return false;
      }
    },

    async signUpRequest() {
      const signUpBtn = document.getElementById("signUpBtn");
      signUpBtn.disabled = true;

      // validates email
      if (!this.isValidEmail()) {
        this.emailMsg = "Invalid email provided";
      } else {
        if (this.isEmailUsed()) {
          this.emailMsg = "Email is already in use";
        }
        if (this.email.length > 99) {
          this.emailMsg = "Email length must be less than 100 characters.";
        }
      }

      // validates password 1
      this.password1Error = !this.isValidPassword();

      if (this.password1.length < 8) {
        this.password1Error = true;
      } else if (this.password1.length > 99) {
        this.password1Msg = "Password must be less than 100 characters.";
      }

      this.password2Error = this.password1 != this.password2;

      if (
        !this.emailMsg.length &&
        !this.password1Error &&
        !this.password2Error
      ) {
        try {
          let resp = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password1
            })
          });
          signUpBtn.disabled = false;
          this.$store.commit("setAccountCreated", true);
          this.$router.replace({ name: "Login" });
        } catch (e) {
          signUpBtn.disabled = false;
          console.log(e);
        }
      } else {
        signUpBtn.disabled = false;
      }
    }
  },

  data: function() {
    return {
      email: "",
      password1: "",
      password2: "",
      emailMsg: "",
      password1Msg:
        "Use 8 or more characters with a medium or higher password strength",
      emailError: false,
      password1Error: false,
      password2Error: false
    };
  },

  watch: {
    email: function(email) {
      this.emailMsg = "";
    },

    password1: function(password) {
      this.password1Error = false;
      this.password1Msg =
        "Use 8 or more characters with a medium or higher password strength";
      const zxcvbn = require("zxcvbn");
      const passwordScore = zxcvbn(password)["score"];

      const updateMeter = (width, background, text) => {
        const passwordEl = document.getElementById("pwb");

        const passwordStrengthEl = document.getElementById("pws");

        if (passwordEl && passwordStrengthEl) {
          passwordEl.style.width = width;
          passwordEl.style.backgroundColor = background;
          passwordStrengthEl.style.color = background;
          passwordStrengthEl.textContent = text;
        }
      };

      if (passwordScore === 0) {
        if (password.length === 0) {
          updateMeter("0%", "#00cc7a", "");
        } else {
          updateMeter("10%", "#ff3000", "Very Low Strength");
        }
      }
      if (passwordScore == 1) updateMeter("20%", "#ff6666", "Low Strength");
      if (passwordScore == 2) updateMeter("40%", "#ff944d", "Medium Strength");
      if (passwordScore == 3) updateMeter("60%", "#ace600", "High Strength");
      if (passwordScore == 4)
        updateMeter("100%", "#4dff4d", "Very High Strength");
    },

    password2: function(password) {
      this.password2Error = false;
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

.password-background {
  position: relative;
  top: 0.5rem;
  height: 0.2rem;
  width: 0;
  border-radius: 4px;
  z-index: 50;
  /* CSS Transitions */
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.strength {
  /* position: relative;
  float: right;
  top: 2rem; */
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
