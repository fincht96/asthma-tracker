<template>
  <div id="nav"  v-bind:style="[ currentRouteName == 'Home' ? { 'box-shadow': '0px 1px 0px 0px rgba(0, 0, 0, 0.1)'} : {} ]">
    <div style="  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;">
      <div style="flex-grow:1; text-align:right;">
        <router-link to="/login" v-if="currentRouteName == 'Home'">
          <a class="button is-link" style="color: #e6e6e6;">
            <strong>Log in</strong>
          </a>
        </router-link>

        <router-link to="/" v-else>
          <img src="..\assets\close-black-48dp.svg" width="30px" />
          <!-- <a class="button is-link" style="color: #e6e6e6;">
            <strong>Close</strong>
          </a>-->
        </router-link>
      </div>

      <div
        style="flex-grow:9; text-align:left; margin: auto auto;"
        
      >
        <router-link to="/" style="font-size: 20px;">Asthma Tracker</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },

  mounted() {
    console.log(this.currentRouteName);
  }
};
</script>


<style lang="scss">
#nav {
  padding: 15px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

  box-sizing: border-box;
  
}
</style>