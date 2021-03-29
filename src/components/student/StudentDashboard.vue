<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Mein Dashboard</h1>
    <div class="d-flex flex-wrap flex-md-nowrap">
      <div class="px-1 px-md-5 flex-grow-1">
        <div class="pb-5">
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Laufende Reviews</h1>
            </md-table-toolbar>
            <md-table-row>
              <md-table-cell>Workshop 1 (Abgabe von Lukas Nowy)</md-table-cell>
              <md-table-cell class="prp-table-action-cell">
                <md-button class="md-icon-button md-list-action"  to="/writereview">
                  <md-icon>forward</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
        <div>
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Laufende Abgaben</h1>
            </md-table-toolbar>
            <md-table-row>
              <md-table-cell>Workshop 3 (Abgabe fehlt)</md-table-cell>
              <md-table-cell class="prp-table-action-cell">
                <md-button class="md-icon-button md-list-action" to="/workshopsubmission/3">
                  <md-icon>forward</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>

      <div class="pt-5 pt-md-0 px-1 px-md-5 pr-md-5 flex-grow-1">
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Meine Workshops</h1>
          </md-table-toolbar>
          <md-table-row v-for="workshop in workshops" :key="workshop.id">
            <md-table-cell>{{ workshop.title }}</md-table-cell>
            <md-table-cell class="prp-table-action-cell">
              <md-button class="md-icon-button md-list-action" :to="{ name: 'workshopoverview', params: { id: workshop.id }}">
                <md-icon>info</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "StudentDashboard",
  data() {
    return {
      workshops: null
    }
  },
  mounted() {
    axios
        .get('http://localhost:8080/student/workshops', {
            auth: {
              username: 's1',
              password: 'admin'
            }
        })
        //.then(response => console.log(response.data.workshops))
        .then(response => (this.workshops = response.data.workshops))
  }
}
</script>

<style lang="scss" scoped>

.prp-table-action-cell {
  text-align: right;
}

</style>
