<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Workshop {{ workshop.title }} Übersicht</h1>
    <div class="px-1 px-md-5">
      <div class="pt-3">
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <p>
          {{ workshop.content }}
        </p>
        <md-button class="md-primary md-raised">
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div class="pt-3">
        <h3>Deadline: {{ workshop.end }}</h3>
      </div>
      <div v-if="this.submissions.length > 0" class="pt-3">
        <h3>Bisherige Abgaben</h3>
        <md-table class="d-flex">
          <md-table-row v-for="(submission, s) in workshop.submissions" :key="s">
            <md-table-cell>
              <span class="md-text">Abgabe vom {{ submission.date }}</span>
            </md-table-cell>
            <md-table-cell>
              <md-button
                class="md-icon-button md-list-action"
                :to="{path: '/reviewoverview/' + submission.id}">
                <md-icon>info</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div v-else>
        <h3>Noch nichts abgegeben</h3>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "WorkshopOverview",
  data() {
    return {
      workshop: {},
      submissions: {}
    };
  },
  methods: {
    getWorkshop() {
      this.workshop = DataService.getStudentWorkshop(this.$parent.username, this.$parent.pw, this.$route.params.id)
        .then(response => {
          this.workshop = response.data.workshop;
          this.submissions = this.workshop.submissions;
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/peer-Review-Platform-Frontend/login";
    } else {
      this.getWorkshop(this.$route.params.id);
    }
  }
};
</script>

<style scoped></style>
