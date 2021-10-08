<template>
  <div class="prp-home">
    <md-toolbar class="md-primary prp-toolbar">
      <router-link
        v-if="
          username == 't1' ||
            (username == 't2' && authenticated)
        "
        to="/teacherdashboard"
      >
        <img src="logo.png" width="50" height="50" to="/teacherdashboard" />
      </router-link>

      <router-link
        v-if="
          username != 't1' &&
            username != 't2' &&
            authenticated
        "
        to="/studentdashboard"
      >
        <img src="logo.png" width="50" height="50" to="/teacherdashboard" />
      </router-link>

      <!--      Login Navbar-->
      <h3 v-if="!authenticated" class="md-title">Peer Review</h3>
      <!--      Teacher Navbar-->
      <router-link
        v-if="
          username == 't1' ||
            (username == 't2' && authenticated)
        "
        to="/teacherdashboard"
      >
        <!--        <h3 class="md-title">Peer Review</h3>-->
      </router-link>
      <md-button
        v-if="
          username == 't1' ||
            (username == 't2' && authenticated)
        "
        to="/teacherdashboard"
        >Home</md-button
      >
      <md-button
        v-if="
          username == 't1' ||
            (username == 't2' && authenticated)
        "
        to="/teacherdashboard/profile"
        >Profile</md-button
      >
      <!--      Student Navbar-->
      <router-link
        v-if="
          username != 't1' &&
            username != 't2' &&
            authenticated
        "
        to="/studentdashboard"
      >
        <!--        <h3 class="md-title">Peer Review</h3>-->
      </router-link>
      <md-button
        v-if="
          username != 't1' &&
            username != 't2' &&
            authenticated
        "
        to="/studentdashboard"
        >Home</md-button
      >

      <md-button v-if="authenticated" v-on:click="logout">Logout</md-button>
    </md-toolbar>
    <router-view
      @authenticated="setAuthenticated"
      @username="setUser"
      @pw="setPw"
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
      pw: ""
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
    logout() {
      this.authenticated = false;
      this.$cookies.remove("auth");
      this.$cookies.remove("user");
      this.$cookies.remove("token");
      window.location.href = "/Peer-Review-Platform-Frontend/";
    }
  }
};
</script>

<style lang="scss" scoped></style>
