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
              'is-danger': emailErrorMsg.length,
            }"
            type="text"
            v-model="email"
          />
        </div>

        <p class="help is-danger" v-if="emailErrorMsg.length">{{ emailErrorMsg }}</p>

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
            <p
              :class="{ 'is-danger': password1Error }"
              class="help"
            >Use 8 or more characters with a medium or higher password strength</p>

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
      let isValid = true;
      const zxcvbn = require("zxcvbn");
      const passwordScore = zxcvbn(this.password1)["score"];

      if (passwordScore > 1 && this.password1.length > 7) {
        isValid = true;
      } else {
        isValid = false;
      }

      return isValid;
    },

    async signUpRequest() {
      this.emailErrorMsg = "";
      this.password1Error = false;
      this.password2Error = false;

      const signUpBtn = document.getElementById("signUpBtn");
      signUpBtn.disabled = true;


      if (!this.isValidEmail()) {
        this.emailErrorMsg = "Invalid email provided";
      } else {
        if (this.isEmailInUse()) {
          this.emailErrorMsg = "Email is already in use";
        }
      }

      this.password1Error = !this.isValidPassword();
      this.password2Error =
        this.password1 != this.password2 || !this.password2.length;

      if (
        !this.emailErrorMsg.length &&
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
      }
    }
  },

  data: function() {
    return {
      email: "",
      password1: "",
      password2: "",
      emailErrorMsg: "",
      password1Error: false,
      password2Error: false
    };
  },

  watch: {
    email: function(email) {
      this.emailErrorMsg = "";
    },

    password1: function(password) {
      this.password1Error = false;
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
          updateMeter("10%", "#ff8080", "Very Low Strength");
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
