<template>
  <div class="prp-home">
    <md-toolbar class="md-primary prp-toolbar">
      <router-link v-if="role === 'teacher'" to="/teacherdashboard">
        <img src="logo.png" width="50" height="50" to="/teacherdashboard" />
      </router-link>

      <router-link v-if="role === 'student'" to="/studentdashboard">
        <img src="logo.png" width="50" height="50" to="/teacherdashboard" />
      </router-link>

      <!--      Login Navbar-->
      <h3 v-if="!authenticated" class="md-title">Peer Review</h3>
      <!--      Teacher Navbar-->
      <router-link v-if="role === 'teacher'" to="/teacherdashboard">
        <!--        <h3 class="md-title">Peer Review</h3>-->
      </router-link>
      <md-button v-if="role === 'teacher'" to="/teacherdashboard"
        >Home
      </md-button>
      <md-button v-if="role === 'teacher'" to="/teacherdashboard/profile"
        >Profile
      </md-button>
      <!--      Student Navbar-->
      <router-link v-if="role === 'student'" to="/studentdashboard">
        <!--        <h3 class="md-title">Peer Review</h3>-->
      </router-link>
      <md-button v-if="role === 'student'" to="/studentdashboard"
        >Home
      </md-button>
      <div class="md-toolbar-section-end">
        <div v-if="username && username.length > 0">
          <p>Hi, {{ username }}</p>
        </div>
        <md-button v-if="authenticated" v-on:click="logout">Logout</md-button>
      </div>
    </md-toolbar>
    <router-view
      @authenticated="setAuthenticated"
      @username="setUser"
      @pw="setPw"
      @role="setRole"
    />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      authenticated: false,
      username: "",
      pw: "",
      role: ""
    };
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    setUser(username) {
      this.username = username;
    },
    setPw(pw) {
      this.pw = pw;
    },
    setRole(role) {
      this.role = role;
    },
    logout() {
      this.authenticated = false;
      this.$cookies.remove("auth");
      this.$cookies.remove("user");
      this.$cookies.remove("token");
      this.$cookies.remove("role");
      window.location.href = "/";
    }
  }
};
</script>

<style lang="scss" scoped></style>
