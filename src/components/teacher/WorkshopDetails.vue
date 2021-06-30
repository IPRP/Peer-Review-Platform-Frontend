<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-80 md-small-size-95 md-xsmall-size-95">
    <h1>Workshop: {{ this.workshop.workshop.title }}</h1>
    <p>{{this.workshop.workshop.content}}</p>

<md-table v-model="workshop.workshop.submissions" v-show="showOutstandingSubmissions">
      <md-table-row>
        <md-table-head>Submissions</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.workshop.students" :key="item" >
        <md-table-cell v-if="item.submissions.length > 0">
          {{item.submissions[0].title}} ({{item.submissions[0].date}})
        </md-table-cell>
        <md-table-cell v-if="item.submissions.length > 0">
            <md-button class="md-icon-button" @click="showReviews(item.id)" :to="{ path: '/teacherdashboard/workshopdetails/reviews/' + item.id }">
              <md-icon>send</md-icon>
            </md-button>
        </md-table-cell>
      </md-table-row>

    </md-table>

    <md-table v-model="workshop.workshop.students" v-show="showLatedSubmissions" >
      <md-table-row>
        <md-table-head>Fehlende Submissions</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.workshop.students" :key="item">
        <md-table-cell v-if="item.submissions.length == 0">
           {{item.firstname}} {{item.lastname}}
        </md-table-cell>
      </md-table-row>

    </md-table>

    </div>

  </div>
</template>

<script>

import DataService from "../../services/DataService";

export default {
  name: 'WorkshopDetails',
  data() {
    return {
      workshop: {},
      showOutstandingSubmissions: true,
      showLatedSubmissions: true
    }
  },
  methods: {

    showReviews(id) {
      console.log("Ok"+ id);
    },

    getWorkshop() {
      DataService.getWorkshopDetailsTeacher(this.getIdFromUrl(), this.$parent.username, this.$parent.pw)
          .then(response => {
            this.workshop = response.data;
            console.log("WOWO ");
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
    },

    getIdFromUrl() {
      return window.location.pathname.split('/')[3];
    }
  },

  created() {
    this.getWorkshop();
  },
  mounted() {
    if(!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
