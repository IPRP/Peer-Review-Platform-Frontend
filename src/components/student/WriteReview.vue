<template>
  <div v-if="loaded">
    <div class="p-1 p-md-5">
      <h1 class="pl-1 pl-md-5">Review für {{ title }} schreiben</h1>
      <div class="pl-1 pl-md-5 pt-1">
        <h3 class="pl-1 pt-1">Abgabe:</h3>
        <h4 class="pl-1 pt-1">{{ comment }}</h4>
        <md-button
          v-if="attachments[0] !== null"
          class="md-raised md-primary"
          @click="downloadSubmission"
        >
          <span>{{ attachments[0].title }}</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <form class="pt-3" @submit.prevent="onSubmit">
        <div class="px-1 px-md-5">
          <h3 class="d-flex justify-content-start">Kriterien:</h3>
          <div class="mb-3">
            <md-card
              class="d-flex mt-3"
              v-for="criterion in this.form.criteria"
              :key="criterion.id"
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

                    <div v-if="criterion.type === 'truefalse'">
                      <md-switch
                        v-model="criterion.points"
                        class="align-self-center"
                        type="number"
                      >
                        <div v-if="criterion.points">
                          Erfüllt
                        </div>
                        <div v-else>
                          Nicht Erfüllt
                        </div>
                      </md-switch>
                    </div>
                    <div v-if="criterion.type === 'point'">
                      <md-field>
                        <label>Punkte</label>
                        <md-input
                          v-model="criterion.points"
                          type="number"
                          @change="validate($event, criterion)"
                        ></md-input>
                      </md-field>
                    </div>
                    <div v-if="criterion.type === 'percentage'">
                      <md-field>
                        <label>Prozent</label>
                        <md-input
                          v-model="criterion.points"
                          type="number"
                          @change="validate($event, criterion)"
                        ></md-input>
                      </md-field>
                    </div>
                    <div v-if="criterion.type === 'grade'">
                      <md-field>
                        <label>Note</label>
                        <md-input
                          v-model="criterion.points"
                          type="number"
                          @change="validate($event, criterion)"
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
          <div
            class="pt-3 d-flex justify-content-center justify-content-md-end"
          >
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
  </div>
  <div v-else></div>
</template>

<script>
import DataService from "@/services/DataService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "WriteReview",
  data() {
    return {
      loaded: false,
      title: "",
      comment: "",
      attachments: null,
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
          const submission = response.data;
          const criteria = submission.criteria;
          this.form.criteria = criteria.map(criterion => {
            if (criterion.type === "grade") {
              criterion.points = 5;
            } else {
              criterion.points = 0;
            }
            criterion.feedback = "";
            return criterion;
          });
          this.title = submission.title;
          this.comment = submission.comment;
          this.attachments = submission.attachments;
          this.loaded = true;
          console.log(this.form.criteria);
        })
        .catch(e => {
          console.error(e);
        });
    },
    onSubmit() {
      this.createReview();
    },
    createReview() {
      const form = JSON.parse(JSON.stringify(this.form));
      for (const criterion of form.criteria) {
        criterion.points = parseInt(criterion.points);
      }

      console.log(this.form.criteria);
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
    },
    // eslint-disable-next-line no-unused-vars
    validate(event, param) {
      const value = parseInt(param.points);
      if (value < 1 && param.type === "grade") {
        param.points = 1;
        return;
      } else if (value < 0) {
        param.points = 0;
        return;
      }

      switch (param.type) {
        case "percentage":
          if (value > 100) {
            param.points = 100;
          }
          break;
        case "point":
          if (value > 10) {
            param.points = 10;
          }
          break;
        case "grade":
          if (value > 5) {
            param.points = 5;
          }
          break;
      }
      console.log("baum", event, param);
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
