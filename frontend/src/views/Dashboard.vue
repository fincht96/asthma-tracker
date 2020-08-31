<template>
  <div id="dashboard">
    <div id="menu">
      <div class="flex-container">
        <div class="dropdown" style="flex-grow:1">
          <div
            ref="accnt-btn"
            class="user-icon dropbtn"
            style="margin-left: auto;"
            v-on:click="dropDownClicked()"
          >TF</div>

          <div id="myDropdown" class="dropdown-content">
            <a href="/profile">My Account</a>
            <a v-on:click="onLogout()" id="logout">Log Out</a>
          </div>
        </div>

        <div style="flex-grow:3; text-align:left;"></div>
        <div style="flex-grow:5; text-align:left;"></div>
      </div>
    </div>

    <div style="height: 100px;"></div>

    <div id="table1">
      <table class="table" style="width:100%;">
        <thead>
          <tr>
            <th>When</th>
            <th>Peak Flow (L/min)</th>
            <th>Medication</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>31/08/20</td>
            <td>600</td>
            <td>Pre-Med</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

          <tr>
            <td>01/09/20</td>
            <td>620</td>
            <td>Post-Med</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

                    <tr>
            <td>02/09/20</td>
            <td>612</td>
            <td>Post-Med</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

                    <tr>
            <td>03/09/20</td>
            <td>630</td>
            <td>Post-Med</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>
          </tr>

                    <tr>
            <td>04/09/20</td>
            <td>680</td>
            <td>None</td>
            <td>Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
          </tr>

                    <tr>
            <td>05/09/20</td>
            <td>520</td>
            <td>Pre-Med</td>
            <td>Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
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
  max-width: 1000px;
  padding: 0px 20px;
}

.user-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  font-size: 21px;
  color: #fff;
  line-height: 50px;
  text-align: center;
  background: #f9b9f2;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
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
  margin-top: 10px;
}

.dropdown-content a {
  color: black;
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
</style>