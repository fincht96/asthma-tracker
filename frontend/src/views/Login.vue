<template>
  <div>
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login-Form",
  components: {
    LoginForm
  },
  computed: {},

};

// Passport will store cookie in web browser, on entering the login page, webpage will send query server requesting log in status
// avoids having to login everytime page is refreshed
</script>



  // 
  // if(this.accountCreated){ this.store.setAccountCreated(false);}