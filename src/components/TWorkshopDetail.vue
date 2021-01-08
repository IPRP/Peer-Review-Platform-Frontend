<template>
  <div class="container cn2">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <h1>Workshop: {{this.workshop.title}}</h1>
    <br>
    <h4>Abgegeben:</h4>
    <md-list v-for="item in this.workshop.reviews[0].done" :key="item.sid">
      <md-list-item>
        {{item.to}} (Abgabe von: {{item.from}})
         <md-button href="https://www.google.at/?gws_rd=ssl" class="md-flat"><md-icon class="icon fa fa-arrow-right"></md-icon></md-button>
        </md-list-item>

    </md-list>

    <h4>Offene Reviews:</h4>
    <md-list v-for="item in this.workshop.reviews[0].open" :key="item.sid">
      <md-list-item>{{item.to}} (Abgabe von: {{item.from}})</md-list-item>
    </md-list>

    <h4>Verspätete Abgaben:</h4>
    <md-list v-for="item in this.workshop.submissions[0].open" :key="item.rid">
      <md-list-item v-if="item.lated" >{{item.name}}</md-list-item>
    </md-list>

  </div>
</template>

<script>

import DataService from "../services/DataService";

export default {
  name: 'TWorkshopDetail',
  data() {
    return {
      workshop: {}
    }
  },
  methods: {
    getWorkshop() {
            DataService.getWorkshopDetailT()
        .then(response => {
          this.workshop = response.data[0].find(obj => {return obj.id == this.getIDfromURL()});
          console.log(response.data);
          console.log(this.workshop);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getIDfromURL(){
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
    .cn2 {
    margin-top: 40px;
  }
</style>
