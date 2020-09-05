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

    <div style="width:90%; max-width:1000px;">
      <div class="menu-container">
        <div
          class="menu-item"
          v-bind:class="{ 'selected-menu-item': selectedItem == 0 }"
          v-on:click="selectedItem = 0"
        >
          Stats
        </div>
        <div
          class="menu-item"
          v-bind:class="{ 'selected-menu-item': selectedItem == 1 }"
          v-on:click="selectedItem = 1"
        >
          Account Details
        </div>
      </div>

      <div v-if="selectedItem == 0">
        <div style="background:#ccc; min-width:100%; padding:60px;">
          <p style="color:white;">Current run streak</p>
          <div style="margin:60px;" />
          <p style="font-size:35px; font-weight: bold; color:white;">7 days</p>
        </div>

        <div style="height:50px;" />

        <div style="margin-left:20px;">
          <h5
            class="subtitle is-6"
            style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left;"
          >
            TOTAL ENTRIES
          </h5>

          <p style="color:#666; text-align:left; font-size:40px;">
            <span style="font-weight:bold; font-size:40px;">14</span>
            <span style="font-size:20px;"> entries</span>
          </p>

          <div style="height:50px;" />

          <h5
            class="subtitle is-6"
            style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left;"
          >
            AVERAGE PEAK FLOW
          </h5>

          <p style="color:#666; text-align:left; font-size:40px;">
            <span style="font-weight:bold; font-size:40px;">510</span>
            <span style="font-size:20px;"> L/min</span>
          </p>

          <div style="height:50px;" />

          <h5
            class="subtitle is-6"
            style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left;"
          >
            AVERAGE PEAK FLOW (PRE-MED)
          </h5>

          <p style="color:#666; text-align:left; font-size:40px;">
            <span style="font-weight:bold; font-size:40px;">480</span>
            <span style="font-size:20px;"> L/min</span>
          </p>

          <div style="height:50px;" />

          <h5
            class="subtitle is-6"
            style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left;"
          >
            AVERAGE PEAK FLOW (POST-MED)
          </h5>

          <p style="color:#666; text-align:left; font-size:40px;">
            <span style="font-weight:bold; font-size:40px;">530</span>
            <span style="font-size:20px;"> L/min</span>
          </p>

          <div style="height:50px;" />

          <h5
            class="subtitle is-6"
            style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left;"
          >
            AVERAGE PEAK FLOW (NO-MED)
          </h5>

          <p style="color:#666; text-align:left; font-size:40px;">
            <span style="font-weight:bold; font-size:40px;">515</span>
            <span style="font-size:20px;"> L/min</span>
          </p>
        </div>
      </div>

      <div v-if="selectedItem == 1">
        <div style="height:60px;" />

        <div class="account-details-grid-container">
          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              First name
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              Thomas
            </p>
          </div>

          <div class="edit">EDIT</div>

          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              Last name
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              Finch
            </p>
          </div>

          <div class="edit">EDIT</div>

          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              Height
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              6'1"
            </p>
          </div>

          <div class="edit">EDIT</div>

          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              Date of birth
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              24/03/1996
            </p>
          </div>

          <div class="edit">EDIT</div>

          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              Email Address
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              fincht96@gmail.com
            </p>
          </div>

          <div class="edit">EDIT</div>

          <div class="item">
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#ccc; text-align:left; font-size: 16px;"
            >
              Password
            </p>
            <p
              style="letter-spacing: 0.0625em; font-weight:lighter; color:#666; text-align:left; font-size: 20px;"
            >
              &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226;
              &#8226;
            </p>
          </div>

          <div class="edit">EDIT</div>

          <button class="button is-danger is-light delete-btn" style="font-size: 16px;">
            Delete account
          </button>

          <flatPickr hidden />
        </div>
      </div>
    </div>
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
}

.menu-container .menu-item {
  font-weight: bold;
  color: #666;
  text-align: center;
  font-size: 15px;
  padding-bottom: 15px;
  border-bottom: solid 3px #e6e6e6;
  flex-grow: 1;
  flex-basis: 0;
  cursor: pointer;
}

.menu-container .selected-menu-item {
  border-bottom: solid 3px #808080;
}

.account-details-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.account-details-grid-container .item {
  margin-left: 20px;
  margin-bottom: 50px;
  grid-column: 1/2;
}



.account-details-grid-container .delete-btn {
  margin: 50px 0px;
  grid-column: 1/3;
}

.account-details-grid-container .edit {
    height: min-content;
  margin-left: auto;
  margin-right: 20px;

  margin-left: auto;

  margin-bottom: 50px;
  letter-spacing: 0.0625em;
  font-weight: lighter;
  color: #ffbf80;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
}
</style>
