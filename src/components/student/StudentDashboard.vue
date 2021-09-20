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
            <md-table-row v-for="(item, i) in this.reviewstodo" :key="i">
              <md-table-cell>
                <div v-if="!item.done">
                  Review {{ item.workshopName }} (Review fehlt)
                </div>
                <div v-else>
                  Review {{ item.workshopName }} <br />(Review kann noch
                  aktualisiert werden)
                </div>
              </md-table-cell>
              <!--  //item.workshopName ist die review id siehe https://docs.google.com/spreadsheets/d/1X2nMEH33EQm5FCdruBNx2x0NtEMzxlOo/edit#gid=136308832  !-->
              <md-table-cell class="prp-table-action-cell">
                <md-button
                  class="md-icon-button md-list-action"
                  :to="{
                    path:
                      '/writereview/' +
                      item.workshopName +
                      '/' +
                      item.submission +
                      '/' +
                      item.id +
                      '/' +
                      item.done
                  }"
                >
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
            <md-table-row v-for="(item, i) in this.submissionstodo" :key="i">
              <md-table-cell>
                {{ item.workshopName }} (Abgabe fehlt)</md-table-cell
              >
              <md-table-cell class="prp-table-action-cell">
                <md-button
                  class="md-icon-button md-list-action"
                  :to="{
                    path:
                      '/workshopsubmission/' + item.id + '/' + item.workshopName
                  }"
                >
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
          <md-table-row v-for="(workshop, w) in this.workshops" :key="w">
            <md-table-cell>{{ workshop.title }}</md-table-cell>
            <md-table-cell class="prp-table-action-cell">
              <md-button
                class="md-icon-button md-list-action"
                :to="{ name: 'workshopoverview', params: { id: workshop.id } }"
              >
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
// import axios from "axios";
import DataService from "../../services/DataService";

export default {
  name: "StudentDashboard",
  data() {
    return {
      workshops: [],
      submissionstodo: [],
      reviewstodo: []
    };
  },
  methods: {
    getStudentWorkshops() {
      DataService.getStudentWorkshops(this.$parent.username, this.$parent.pw)
        .then(response => {
          this.workshops = response.data.workshops;
        })
        .catch(e => {
          console.error(e);
        });
    },
    getStudentTodo() {
      DataService.getStudentTodo(this.$parent.username, this.$parent.pw)
        .then(response => {
          this.reviewstodo = response.data.reviews;
          this.submissionstodo = response.data.submissions;
          // console.log(this.reviewstodo);
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login";
    } else {
      this.getStudentWorkshops();
      this.getStudentTodo();
    }
  }
};
</script>

<style lang="scss" scoped>
.prp-table-action-cell {
  text-align: right;
}
</style>
