<template>
  <div class="p-1 p-md-5">
    <h1>Workshop: {{ this.workshop.title }}</h1>
    <h4>Abgegeben:</h4>
    <md-list v-for="item in this.workshop.reviews[0].done" :key="item.sid">
      <md-list-item>
        {{ item.to }} (Abgabe von: {{ item.from }})
        <md-button href="https://www.google.at/?gws_rd=ssl" class="md-flat">
          <md-icon>arrow_forward</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <h4>Offene Reviews:</h4>
    <md-list v-for="item in this.workshop.reviews[0].open" :key="item.sid">
      <md-list-item>{{ item.to }} (Abgabe von: {{ item.from }})</md-list-item>
    </md-list>

    <h4>Verspätete Abgaben:</h4>
    <md-list v-for="item in this.workshop.submissions[0].open" :key="item.rid">
      <md-list-item v-if="item.lated">{{ item.name }}</md-list-item>
    </md-list>

    <md-switch v-model="showStudentList" class="md-primary">Studentenliste anzeigen</md-switch>

    <md-table v-show="showStudentList">
      <md-table-row>
        <md-table-head>Name</md-table-head>
      </md-table-row>
      <md-table-row v-for="item in workshop.members" v-bind:key="item">
        <md-table-cell>{{ item.firstname }} {{ item.lastname }} {{ item.group }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>

import DataService from "../../services/DataService";

export default {
  name: 'WorkshopDetails',
  data() {
    return {
      workshop: {},
      showStudentList: false
    }
  },
  methods: {

    getWorkshop() {
      DataService.getWorkshopDetailsTeacher()
          .then(response => {
            this.workshop = response.data[0].find(obj => {
              return obj.id == this.getIdFromUrl()
            });
            console.log(response.data);
            console.log(this.workshop);
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
