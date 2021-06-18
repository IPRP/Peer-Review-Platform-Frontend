<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Abgabe für Worksohp {{ $route.params.workshopname }}</h1>
    <div class="px-1 px-md-5">
      <div class="pt-3">
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <p>{{ workshop.content }}</p>
        <md-button class="md-raised md-primary">
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div class="pt-3">
        <h3>Deadline: {{ workshop.end }}</h3>
      </div>
      <div class="pt-3">
        <h3 class="d-flex justify-content-start">Abgabe Datei</h3>
        <form @submit.prevent="validateForm">
          <md-field>
            <label>Abgabe</label>
            <md-file type="file" acccept=".pdf" ref="file" @change="onFileChange"></md-file>
          </md-field>
          <div class="pt-3 d-flex justify-content-center justify-content-md-end">
            <md-button class="md-raised prp-danger">
              <span class="p-1">Abbrechen</span>
              <md-icon class="prp-danger">delete</md-icon>
            </md-button>
            <md-button class="md-raised prp-success" type="submit">
              <span class="p-1">Speichern</span>
              <md-icon class="prp-success-icon">done_all</md-icon>
            </md-button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "WorkshopSubmission",
  data() {
    return {
      workshop: {}
    };
  },
  methods: {
    getWorkshop() {
      DataService.getStudentWorkshop(this.$parent.username, this.$parent.pw, this.$route.params.id)
        .then(response => {
          this.workshop = response.data.workshop;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login";
    } else {
      this.getWorkshop();
    }
  }
};
</script>

<style scoped>

</style>
