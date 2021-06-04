<template>
  <div class="d-flex justify-content-center pt-5">
    <md-card>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label for="username">Username</label>
          <md-input type="text" id="username" name="username" v-model="input.username" />
        </md-field>
        <md-field>
          <label for="password">Password</label>
          <md-input type="password" id="password" name="password" v-model="input.password" />
        </md-field>
        <div class="d-flex justify-content-center">
          <md-button class="md-raised md-primary" v-on:click="login()">Login</md-button>
        </div>
      </md-card-content>
    </md-card>
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
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        // This should actually be an api call not a check against this.$parent.mockAccount
        DataService.loginUser(this.input.username, this.input.password).then(response => {
          if (!isNaN(response.data.id)) {
            this.$emit("authenticated", true);
            this.$emit("username", this.input.username);
            this.$emit("pw", this.input.password);
            const username = this.input.username;
            if (username != "georgreisinger" && username != "lukasnowy") {
              this.$router.push("studentdashboard");
            } else {
              this.$router.push("/teacherdashboard");
            }
          } else {
            alert("The username and / or password is incorrect");
            this.input.username = "";
            this.input.password = "";
          }
        }).catch(e => {
          alert("The username and / or password is incorrect " + e);
          this.input.username = "";
          this.input.password = "";
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
