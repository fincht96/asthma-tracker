<template>
  <div id="dashboard">
    <DashboardModal />

    <div class="action-icon" v-on:click="showModal = true">+</div>

    <div id="menu">
      <div class="flex-container">
        <div class="dropdown">
          <div ref="accnt-btn" class="user-icon dropbtn" v-on:click="dropDownClicked()">TF</div>

          <div id="myDropdown" class="dropdown-content">
            <a href="/profile">My Account</a>
            <a v-on:click="onLogout()" id="logout">Log Out</a>
          </div>
        </div>

        <div>
          <img
            v-bind:class="{selected : selectedMenu == 'graph'}"
            v-on:click="selectedMenu = 'graph'"
            class="menu-icon"
            src="../assets/graph-128.svg"
          />
        </div>

        <div>
          <img
            v-bind:class="{selected : selectedMenu == 'calendar'}"
            v-on:click="selectedMenu = 'calendar'"
            class="menu-icon"
            src="../assets/calendar-128.svg"
          />
        </div>

        <div>
          <img
            v-bind:class="{selected : selectedMenu == 'table'}"
            v-on:click="selectedMenu = 'table'"
            class="menu-icon"
            src="../assets/table-128.svg"
          />
        </div>
      </div>
    </div>

    <div style="height: 75px;"></div>

    <Table v-if="selectedMenu == 'table'" />
    <Calendar v-else-if="selectedMenu == 'calendar'" />
    <Graph v-else-if="selectedMenu == 'graph'" />
  </div>
</template>
<script>
// @ is an alias to /src
import DashboardModal from "@/components/DashboardModal.vue";
import Table from "@/components/Table.vue";
import Calendar from "@/components/Calendar.vue";
import Graph from "@/components/Graph.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardModal,
    Table,
    Calendar,
    Graph
  },

  methods: {
    dropDownClicked() {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    async onLogout() {
      try {
        let resp = await fetch("http://localhost:3000/logout?_method=DELETE", {
          method: "POST",
          credentials: "include"
        });

        if (resp.status == 200) {
          // sets authentication disabled and re routes to login
          this.$store.commit("setAuthentication", false);
          this.$router.replace({ name: "Login" });
        }
      } catch (e) {
        console.log(e);
      }

      // POST http://localhost:3000/logout?_method=DELETE
      // send fetch request to log out
    }
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
      // let resp = await fetch("http://localhost:3000");
      // let a = await resp.json();

      // if (a.a == 1) {
      //   console.log("a is 1!");
      // }

      console.log("called app");
    } catch (e) {
      console.log(e);
    }
  },

  data: function() {
    return {
      dropdownOpen: true,
      showModal: false,
      selectedMenu: "table"
    };
  }
};
</script>

<style lang="scss" scoped>
#dashboard {
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

#table1 {
  width: 100%;
  max-width: 1250px;
  padding: 0px 20px;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
  color: #363636;
  line-height: 40px;
  text-align: center;
  background: #f9b9f2;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: pointer;
  box-sizing: border-box;
}

.user-icon:hover {
  background: #e0a6da;
}

.action-icon {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 32px;
  color: #363636;
  line-height: 60px;
  text-align: center;
  background: #83a0a0;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: pointer;

  position: fixed;
  bottom: 30px;
  right: 25px;
}

.action-icon:hover {
  background: #728c8c;
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
}

.flex-container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}

.menu-icon {
  width: 30px;
  height: 30px;
  opacity: 40%;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.menu-icon:hover {
  opacity: 100%;
}

.selected {
  opacity: 100%;
}
</style>