<template>
  <div id="dashboard">
    <div class="action-icon">+</div>

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
          <img class="menu-icon" src="../assets/graph-128.svg" />
        </div>

        <div>
          <img class="menu-icon" src="../assets/calendar-128.svg" />
        </div>

        <div>
          <img class="menu-icon selected" src="../assets/table-128.svg" />
        </div>
      </div>
    </div>

    <div style="height: 75px;"></div>

    <div id="table1">
      <table class="table" style="width:100%; table-layout: fixed;">
        <thead>
          <tr>
            <th>When</th>
            <th >Peak Flow (L/min)</th>
            <th>Medication</th>
            <th style="width:55%">Comment</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Mon, 31 Aug 2020, 07:42</td>
            <td>600</td>
            <td>Pre-Med</td>
            <td
              class="comment"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

          <tr>
            <td>Tue, 1 Sep 2020, 08:46</td>
            <td>620</td>
            <td>Post-Med</td>
            <td
              class="comment"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

          <tr>
            <td>Wed, 2 Sep 2020, 08:22</td>
            <td>612</td>
            <td>Post-Med</td>
            <td
              class="comment"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

          <tr>
            <td>Thu, 3 Sep 2020, 08:34</td>
            <td>630</td>
            <td>Post-Med</td>
            <td class="comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          </tr>

          <tr>
            <td>Fri, 4 Sep 2020, 08:24</td>
            <td>680</td>
            <td>None</td>
            <td
              class="comment"
            >Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

          <tr>
            <td>Sat, 5 Sep 2020, 08:21</td>
            <td>520</td>
            <td>Pre-Med</td>
            <td
              class="comment"
            >Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",

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
      dropdownOpen: true
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

thead {
  font-size: 14px;
  color: #363636;
}

tbody {
  font-size: 14px;
  color: #363636;
}

th {
  margin: 0px 10px;
}

td {
  margin: 0px 10px;
  vertical-align: middle;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.comment {
  text-align: justify;
}

.menu-icon {
  width: 30px;
  height: 30px;
  opacity: 60%;
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