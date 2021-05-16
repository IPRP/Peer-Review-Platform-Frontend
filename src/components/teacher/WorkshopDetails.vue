<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-80 md-small-size-95 md-xsmall-size-95">
    <h1>Workshop: {{ this.workshop.title }}</h1>
    <p>{{this.workshop.content}}</p>

    <md-switch v-model="showOutstandingSubmissions" class="md-primary">Offene Workshop Abgaben</md-switch>
    <md-switch v-model="showLatedSubmissions" class="md-primary">Verspätete Workshop Abgaben</md-switch>
    <md-switch v-model="showOutstandingReviews" class="md-primary">Offene Review Abgaben</md-switch>
    <md-switch v-model="showLatedReviews" class="md-primary">Verspätete Reviews anzeigen</md-switch>

<md-table v-model="workshop.submissions" v-show="showOutstandingSubmissions">
      <md-table-row>
        <md-table-head>Workshop Abgaben</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.submissions" :key="item">
        <md-table-cell v-if="item.reviewsDone == true">
          {{item.title}} ({{item.points}}/{{item.maxPoints}} Punkte)
        </md-table-cell>
      </md-table-row>

    </md-table>

    <md-table v-model="workshop.submissions" v-show="showLatedSubmissions" >
      <md-table-row>
        <md-table-head>Offene/Verspätete Workshop Abgaben</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.submissions" :key="item">
        <md-table-cell v-if="item.reviewsDone == false">
           {{item.title}}
        </md-table-cell>
      </md-table-row>

    </md-table>

    <md-table v-model="workshop.members" v-show="showOutstandingReviews">
      <md-table-row>
        <md-table-head>Offene Reviews</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.members" :key="item">
        <md-table-cell>{{item}}</md-table-cell>
      </md-table-row>

    </md-table>

        <md-table v-model="workshop.members" v-show="showLatedReviews">
      <md-table-row>
        <md-table-head>Verspätete Reviews</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.workshop.members" :key="item">
        <md-table-cell>{{item}}</md-table-cell>
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
      showLatedSubmissions: true,
      showOutstandingReviews: true,
      showLatedReviews: true
    }
  },
  methods: {

    getWorkshop() {
      DataService.getWorkshopDetailsTeacher(this.getIdFromUrl())
          .then(response => {
            this.workshop = response.data;
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
