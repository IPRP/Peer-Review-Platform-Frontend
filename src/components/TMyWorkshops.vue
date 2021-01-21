<template>
  <div class="container cn2">
    <h1>Workshop Ansicht</h1>
    <br>

    <md-table v-model="workshops" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Workshops bearbeiten</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Titel" md-sort-by="id" md-numeric>{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Beschreibung" md-sort-by="title">{{ item.beschreibung }}</md-table-cell>
        <md-table-cell md-label="Actions">
           <md-button class="md-flat"  :to="{ path: '/teacher/workshopdetail/' + item.id }"><md-icon>info</md-icon></md-button>
           <md-button class="md-flat"  :to="{ path: '/teacher/editworkshop/' + item.id }"><md-icon>edit</md-icon></md-button>
           <md-button class="md-flat" @click="deleteWorkshop(item.id), ddialog = true"><md-icon>delete</md-icon></md-button>
          
          
        </md-table-cell>

      </md-table-row>
    </md-table>

        <md-dialog-alert
      :md-active.sync="ddialog"
      md-content="Workshop has been deleted!"
      md-confirm-text="Ok" />
  </div>

  
</template>

<script>

import DataService from "../services/DataService";

export default {
  name: 'TMyWorkshops',
  props: {
    workshops: []
  },
  data() {
    return {
      ddialog: false
    }
  },

  methods: {

    getWorkshops() {
      DataService.getAllWorkshopsT()
        .then(response => {
          this.workshops = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteWorkshop(id) {
          DataService.deleteWorkshopT(id)
        .then(response => {
          this.workshops = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getWorkshops();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .cn2 {
    margin-top: 40px;
  }
</style>
