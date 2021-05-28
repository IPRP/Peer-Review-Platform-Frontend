<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Workshop {{ workshop.title }} Übersicht</h1>
    <h3 class="pl-1 pl-md-5">Workshop: {{ $route.params.id }}</h3>
    <div class="px-1 px-md-5">
      <div>
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <p>
          {{ workshop.content }}
        </p>
        <md-button>
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div>
        <p>Deadline: {{ workshop.end }}</p>
      </div>
      <div>
        <md-list class="d-flex" :md-expand-single="true">
          <md-list-item md-expand>
            <span class="md-list-item-text ">Bisherige Abgaben</span>
            <md-list slot="md-expand">
              <md-list-item v-for="submission in workshop.submissions" :key="submission.id">
                <div class="d-flex">
                  <div class="pr-4">
                    <span class="md-text">Abgabe vom DATUM FEHLT</span>
                  </div>
                </div>
                <md-button
                  class="md-icon-button md-list-action"
                  :to="{path: '/reviewoverview/' + submission[0].id}"
                >
                  <md-icon>info</md-icon>
                </md-button>
              </md-list-item>
<!--          <md-list-item>
                <div class="d-flex">
                  <div class="pr-4">
                    <span class="md-text">Abgabe vom {{ dateAbgabe2 }}</span>
                  </div>
                </div>
                <md-button
                  class="md-icon-button md-list-action"
                  to="/reviewoverview"
                >
                  <md-icon>info</md-icon>
                </md-button>
              </md-list-item>-->
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <div id="abgabe">
        <h3 class="d-flex justify-content-start">Abgabe Datei</h3>
        <form>
          <input type="file" name="filename" />
        </form>
      </div>
      <div class="pt-3 d-flex justify-content-center justify-content-md-end">
        <md-button class="md-raised prp-danger">
          <span class="p-1">Abbrechen</span>
          <md-icon class="prp-danger">delete</md-icon>
        </md-button>
        <md-button class="md-raised prp-success">
          <span class="p-1">Speichern</span>
          <md-icon class="prp-success-icon">done_all</md-icon>
        </md-button>
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
      window.location.href = "/login";
    } else {
      this.getWorkshop(this.$route.params.id);
    }
  }
};
</script>

<style scoped></style>
