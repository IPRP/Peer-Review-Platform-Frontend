<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <router-view
      @authenticated="setAuthenticated"
      @username="setUser"
      @pw="setPw"
    />
  </div>
</template>

<script>
export default {
  name: "App",
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
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
