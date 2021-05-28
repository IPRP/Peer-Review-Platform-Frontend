<template>
  <div id="login">
    <h1>Login</h1>
    <div class="form-inputs">
      <label for="username">Username</label>
      <md-input type="text" id="username" name="username" v-model="input.username" placeholder="Username" />
    </div>
    <div class="form-inputs">
      <label for="password">Password</label>
      <md-input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
    </div>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        // This should actually be an api call not a check against this.$parent.mockAccount
        DataService.loginUser(this.input.username, this.input.password).then(response => {
          if(!isNaN(response.data.id)){
            this.$emit("authenticated", true);
            this.$emit("username", this.input.username);
            this.$emit("pw", this.input.password);
            const username = this.input.username
            if(username != 'georgreisinger' && username != 'lukasnowy'){
              this.$router.push('studentdashboard') ;
            }else {
              this.$router.push('/teacherdashboard');
            }
          }else {
            alert("The username and / or password is incorrect");
            this.input.username = ""
            this.input.password = ""
          }
        }).catch(e => {
          alert("The username and / or password is incorrect " + e);
          this.input.username = ""
          this.input.password = ""
        });
      } else {
        alert("A username and password must be present");
      }
    }
  }
};
</script>

<style scoped>

</style>
