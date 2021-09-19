<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Review für {{ submission.title }} schreiben</h1>
    <div class="pl-1 pl-md-5 pt-3">
      <h3 class="pl-1 pt-3">Abgabe:</h3>
      <md-button class="md-raised md-primary" @click="downloadSubmission">
        <span>{{ submission.attachments[0].title }}</span>
        <md-icon>get_app</md-icon>
      </md-button>
    </div>
    <form class="pt-3" @submit.prevent="createReview">
      <div class="px-1 px-md-5">
        <h3 class="d-flex justify-content-start">Kriterien:</h3>
        <div class="mb-3">
          <md-card
            class="d-flex mt-3"
            v-for="criterion in this.form.criteria"
            :key="criterion.title"
          >
            <md-card-expand class="align-items-center">
              <md-card-actions md-alignment="space-between">
                <h3>{{ criterion.title }}</h3>

                <md-card-expand-trigger>
                  <md-button class="md-icon-button">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <div class="d-flex flex-wrap flex-md-nowrap px-2">
                  <div class="pr-md-4">
                    <p class="md-list-item-text">{{ criterion.content }}</p>
                  </div>

                  <div class="pr-md-2 flex-grow-1">
                    <md-field class="prp-feedback">
                      <label>Feedback</label>
                      <md-textarea
                        md-autogrow
                        v-model="
                          form.criteria[form.criteria.indexOf(criterion)]
                            .feedback
                        "
                      ></md-textarea>
                    </md-field>
                  </div>

                  <div v-if="criterion.type === 'truefalse'">
                    <md-switch
                      v-model="
                        form.criteria[form.criteria.indexOf(criterion)].rating
                      "
                      class="align-self-center"
                      >Erfüllt
                    </md-switch>
                  </div>
                  <div v-if="criterion.type === 'point'">
                    <md-field>
                      <label>Punkte</label>
                      <md-input
                        v-model="
                          form.criteria[form.criteria.indexOf(criterion)].rating
                        "
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>
                  <div v-if="criterion.type === 'percentage'">
                    <md-field>
                      <label>Prozent</label>
                      <md-input
                        v-model="
                          form.criteria[form.criteria.indexOf(criterion)].rating
                        "
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>
                  <div v-if="criterion.type === 'grade'">
                    <md-field>
                      <label>Note</label>
                      <md-input
                        v-model="
                          form.criteria[form.criteria.indexOf(criterion)].rating
                        "
                        type="number"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>
        </div>

        <md-field>
          <label>Gesamtfeedback</label>
          <md-textarea v-model="form.overallFeedback"></md-textarea>
        </md-field>
        <div class="pt-3 d-flex justify-content-center justify-content-md-end">
          <md-button class="md-raised prp-danger" to="/studentdashboard">
            <span class="p-1">Abbrechen</span>
            <md-icon class="prp-danger">delete</md-icon>
          </md-button>
          <md-button class="md-raised prp-success" type="submit">
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "WriteReview",
  data() {
    return {
      submission: {},
      fulfilled: [],
      form: {
        criteria: [
          {
            rating: null,
            feedback: null
          }
        ],
        overallFeedback: null
      }
    };
  },
  validations: {
    form: {
      criteria: {
        required
      },
      overallFeedback: {
        required
      }
    }
  },
  methods: {
    getSubmission() {
      DataService.getStudentSubmission(
        this.$parent.username,
        this.$parent.pw,
        this.$route.params.submissionid
      )
        .then(response => {
          this.submission = response.data;
          this.form.criteria = this.submission.criteria;
          this.form.criteria = this.form.criteria.map(criteria => {
            let newCriteria;
            newCriteria = Object.assign(
              criteria,
              { rating: "" },
              { feedback: "" }
            );
            return newCriteria;
          });
          console.log(this.form.criteria);
        })
        .catch(e => {
          console.error(e);
        });
    },
    createReview() {
      DataService.postReview(
        this.form.criteria,
        this.form.overallFeedback,
        this.$parent.username,
        this.$parent.pw,
        this.submission.attachments[0].id
      )
        .then(response => {
          console.log(response.data);
          this.$router.push("/studentdashboard");
        })
        .catch(e => {
          console.log(e);
          alert("Fehler");
        });
    },
    downloadSubmission() {
      DataService.downloadSubmission(
        this.$parent.username,
        this.$parent.pw,
        this.submission.attachments[0].id
      ).then(response => {
        DataService.writeFile(response, this.submission.attachments[0].title);
      });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login";
    } else {
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
  max-width: 40vw;
}
</style>
