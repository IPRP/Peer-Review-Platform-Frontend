<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Review {{ workshop.title }} schreiben</h1>
    <h2 class="pl-1 pl-md-5">Review ID: {{ $route.params.reviewid }}</h2>
    <h3 class="pl-1 pl-md-5">Abgabe ID: {{ $route.params.submissionid }} <!--, Abgabe: Lukas Nowy--></h3>
    <div class="pl-1 pl-md-5">
      <md-button>
        <span>Abgabe_Nowy.pdf</span>
        <md-icon>get_app</md-icon>
      </md-button>
    </div>
    <form>
      <div class="px-1 px-md-5">
        <h3 class="d-flex justify-content-start">Kriterien:</h3>
        <div class="mb-3">
          <md-card class="d-flex">
            <md-card-expand class="align-items-center">
              <md-card-actions md-alignment="space-between">
                <h3>Kriterium</h3>

                <md-card-expand-trigger>
                  <md-button class="md-icon-button">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <div class="d-flex flex-wrap flex-md-nowrap px-2">
                  <div class="pr-md-4">
                    <h3>Vorgabe</h3>
                    <p class="md-list-item-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                      nonumy
                      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                      Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                      nonumy
                      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                      Lorem ipsum dolor sit amet.</p>
                  </div>

                  <div class="pr-md-2 flex-grow-1">
                    <md-field class="prp-feedback">
                      <label>Feedback</label>
                      <md-textarea md-autogrow></md-textarea>
                    </md-field>
                  </div>

                  <div>
                    <md-switch class="align-self-center">Erfüllt</md-switch>
                  </div>
                </div>
              </md-card-expand-content>

            </md-card-expand>
          </md-card>
        </div>

        <md-field>
          <label>Gesamtfeedback</label>
          <md-textarea></md-textarea>
        </md-field>
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
    </form>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "WriteReview",
  data() {
    return {
      workshop: {}
    };
  },
  methods: {
    getSubmission() {
      DataService.getStudentSubmission(
        this.$parent.username,
        this.$parent.pw,
        this.$route.params.submissionid
      )
        .then(response => {
          this.workshop = response.data;
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
      console.log("test");
      this.getSubmission();
    }
  }
};
</script>

<style scoped lang="scss">

.md-list-item-text {
  white-space: normal;
}

.prp-feedback {
  min-width: 40vw;
}

</style>
