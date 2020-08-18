<template>
  <div class="loginForm">
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login-Form",
  components: {
    LoginForm
  }
};
</script>