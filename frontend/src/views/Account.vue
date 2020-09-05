<template>
  <div id="account">
    <div id="menu">
      <div class="flex-container">
        <div>
          <img
            style="width:30px;"
            v-on:click="returnToDashboard()"
            class="menu-icon"
            src="../assets/close-black-48dp.svg"
          />
        </div>
      </div>
    </div>

    <div style="height: 10px;"></div>

    <h1 class="title is-4" style="color:#666;">Thomas Finch</h1>

    <div class="menu-container">
      <div
        class="menu-item "
        v-bind:class="{ 'selected-menu-item': selectedItem == 0 }"
        v-on:click="selectedItem = 0"
      >
        <h3 class="subtitle is-6">Stats</h3>
      </div>
      <div
        class="menu-item"
        v-bind:class="{ 'selected-menu-item': selectedItem == 1 }"
        v-on:click="selectedItem = 1"
      >
        <h3 class="subtitle is-6">Account Details</h3>
      </div>
    </div>

    <flatPickr v-if="selectedItem == 1" />
  </div>
</template>
<script>
import { EventBus } from "@/event_bus/event_bus.js";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "Account",

  components: {
    flatPickr,
  },

  methods: {
    returnToDashboard() {
      this.$router.replace({ name: "Dashboard" });
    },
  },

  async created() {
    try {
      window.onclick = function(event) {
        if (!event.target.matches(".dropbtn")) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
            }
          }
        }
      };

      console.log("called app");
    } catch (e) {
      console.log(e);
    }
  },

  mounted() {},

  data: function() {
    return {
      dropdownOpen: true,
      showModal: false,
      selectedItem: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
#account {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0px;
}

#menu {
  width: 100%;
  // max-width: 1200px;

  box-sizing: border-box;
  padding: 0px 20px;

  // margin-right:20px;
}

.menu-icon {
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown a:hover {
  background-color: #ddd;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  text-align: left;
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  margin-top: 180px;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.dropdown-content a {
  color: #363636;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 15px;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display: block;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  width: 100%;
}

.flex-container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}

.menu-container {
  display: flex;
  align-items: stretch;
  margin-top: 30px;
  max-width: 800px;
  width: 90%;
}

.menu-item {
  color: #666;
  text-align: center;
  font-size: 15px;
  padding-bottom: 15px;
  border-bottom: solid 2px #e6e6e6;
  flex-grow: 1;
  cursor: pointer;
}

.selected-menu-item {
  border-bottom: solid 2px #808080;
}
</style>
