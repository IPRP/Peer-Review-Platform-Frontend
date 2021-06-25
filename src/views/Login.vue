<template>
  <div class="d-flex justify-content-center pt-5">
    <md-card>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label for="username">Username</label>
          <md-input
            type="text"
            id="username"
            name="username"
            v-model="input.username"
          />
        </md-field>
        <md-field>
          <label for="password">Password</label>
          <md-input
            type="password"
            id="password"
            name="password"
            v-model="input.password"
          />
        </md-field>
        <input
          type="radio"
          id="auto10"
          value="10"
          v-model="input.autologin"
        /><label for="auto10">Auto login für 10 minuten</label>
        <br />
        <input
          type="radio"
          id="auto30"
          value="30"
          v-model="input.autologin"
        /><label for="auto30">Auto login für 30 minuten</label>
        <br />
        <input
          type="radio"
          id="auto0"
          value="0"
          v-model="input.autologin"
        /><label for="auto0">Kein Auto Login</label>
        <br />
        <div class="d-flex justify-content-center">
          <md-button class="md-raised md-primary" v-on:click="login()"
            >Login</md-button
          >
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import DataService from "../services/DataService";
var CryptoJS = require("crypto-js");

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
        autologin: "30"
      }
    };
  },
  beforeMount() {
    if (this.$cookies.isKey("auth")) {
      if (this.$cookies.get("auth") == "true") {
        const username = this.$cookies.get("user");
        if (username != null) {
          const token = this.$cookies.get("token");
          if (token != null) {
            this.$emit("authenticated", true);
            this.$emit("username", username);

            const heute = new Date();
            var dat = CryptoJS.AES.decrypt(
              token,
              heute.getFullYear().toString() +
                heute.getMonth().toString() +
                heute.getDate().toString() +
                heute.getHours().toString()
            );
            var originalText = dat.toString(CryptoJS.enc.Utf8);
            if (originalText == "") {
              this.logout();
            }
            this.$emit("pw", originalText);
            if (username != "georgreisinger" && username != "lukasnowy") {
              this.$router.push("studentdashboard");
            } else {
              this.$router.push("/teacherdashboard");
            }
          }
        }
      }
    }
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        // This should actually be an api call not a check against this.$parent.mockAccount
        DataService.loginUser(this.input.username, this.input.password)
          .then(response => {
            if (!isNaN(response.data.id)) {
              this.$emit("authenticated", true);
              this.$emit("username", this.input.username);
              this.$emit("pw", this.input.password);
              const username = this.input.username;
              if (this.input.autologin == "10") {
                this.$cookies.set("auth", "true", "10min");
                this.$cookies.set("user", username, "10min");
                const heute = new Date();
                var dat = CryptoJS.AES.encrypt(
                  this.input.password,
                  heute.getFullYear().toString() +
                    heute.getMonth().toString() +
                    heute.getDate().toString() +
                    heute.getHours().toString()
                );

                this.$cookies.set("token", dat.toString(), "10min");
              } else if (this.input.autologin == "30") {
                this.$cookies.set("auth", "true", "30min");
                this.$cookies.set("user", username, "30min");
                const heute = new Date();
                var da = CryptoJS.AES.encrypt(
                  this.input.password,
                  heute.getFullYear().toString() +
                  heute.getMonth().toString() +
                  heute.getDate().toString() +
                  heute.getHours().toString()
                );

                this.$cookies.set("token", da.toString(), "30min");
              } else {
                this.$cookies.remove("auth");
                this.$cookies.remove("user");
                this.$cookies.remove("token");
              }
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
          })
          .catch(e => {
            alert("The username and / or password is incorrect " + e);
            this.input.username = "";
            this.input.password = "";
          });
      } else {
        alert("A username and password must be present");
      }
    },
    logout() {
      this.authenticated = false;
      this.$cookies.remove("auth");
      this.$cookies.remove("user");
      this.$cookies.remove("token");
      window.location.href = "/";
    }
  }
};
</script>

<style scoped></style>
