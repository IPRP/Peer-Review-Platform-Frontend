<template>
  <div class="p-5">
    <h1 class="pl-5">Meine Workshops</h1>
    <div class="d-flex">
      <div class="px-5 flex-grow-1">
        <md-table v-model="workshops" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Titel" md-sort-by="id" md-numeric>{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Beschreibung" md-sort-by="title">{{ item.beschreibung }}</md-table-cell>
            <md-table-cell md-label="Actions">
              <md-button class="md-flat"  :to="{ path: '/teacherdashboard/workshopdetail/' + item.id }"><md-icon>info</md-icon></md-button>
              <md-button class="md-flat"  :to="{ path: '/teacherdashboard/editworkshop/' + item.id }"><md-icon>edit</md-icon></md-button>
              <md-button class="md-flat" @click="deleteWorkshop(item.id), deleteDialog = true"><md-icon>delete</md-icon></md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <md-dialog-alert
            :md-active.sync="deleteDialog"
            md-content="Workshop wurde gelöscht!"
            md-confirm-text="Ok"/>

        </div>
    </div>
  </div>
</template>

<script>

import DataService from "../../services/DataService";

export default {
  name: 'MyWorkshops',
  props: {
    workshops: []
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {

    getWorkshops() {
      DataService.getAllWorkshopsTeacher()
        .then(response => {
          this.workshops = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteWorkshop(id) {
      DataService.deleteWorkshopTeacher(id)
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

</style>
