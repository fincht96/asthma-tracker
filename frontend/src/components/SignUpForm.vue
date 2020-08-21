<template>
  <div class="flex-container">
    <div class="row">
      <h1 class="title">Sign Up</h1>
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

        <div class="field">
          <label class="label">Re-enter password</label>
          <div class="control">
            <input class="input" type="password" />
          </div>
        </div>

        <br />

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Sign Up</button>
          </div>
        </div>

        <br />
        <br />
        <div>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpForm"
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


