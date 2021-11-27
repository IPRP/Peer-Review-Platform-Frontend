<template>
  <div v-if="loaded">
    <div class="p-1 p-md-5">
      <div class="pl-1 pl-md-5">
        <h1>Review Overview</h1>
        <h3>Abgabe-Titel: {{ submission.title }}</h3>
        <h3>Meine Abgabe</h3>
        <h4 class="pl-1 pt-1">{{ submission.comment }}</h4>
        <div
          v-if="
            submission.attachments.length > 0 &&
              submission.attachments[0].title !== undefined
          "
        >
          <md-button class="md-raised md-primary" @click="downloadSubmission">
            <span>{{ submission.attachments[0].title }}</span>
            <md-icon>get_app</md-icon>
          </md-button>
        </div>
        <h3>Abgegeben am: {{ submission.date }}</h3>

        <div v-if="!submission.noReviews">
          <h3>
            Gesamtpunkte: {{ submission.points }}/{{ submission.maxPoints }}
          </h3>

          <div>
            <md-card
              class="card"
              v-for="item in submission.reviews"
              :key="item.id"
            >
              <md-card-header>
                <div
                  v-if="item.firstname !== null && item.firstname !== undefined"
                >
                  <!--<div class="md-title">ID {{ item.id }}</div>-->
                  <div class="md-subhead">
                    Author: {{ item.firstname }} {{ item.lastname }}
                  </div>
                </div>
                <div v-else>
                  <div class="md-subhead">
                    Author: Anonymous
                  </div>
                </div>
              </md-card-header>

              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                      <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                  </md-card-expand-trigger>
                </md-card-actions>

                <md-card-expand-content>
                  <md-card-content>
                    <p>Feedback: {{ item.feedback }}</p>
                    <p>Criterias:</p>
                    <md-table>
                      <md-table-row>
                        <md-table-head>Title</md-table-head>
                        <md-table-head>Description</md-table-head>
                        <md-table-head>Type</md-table-head>
                        <md-table-head>Points</md-table-head>
                        <md-table-head>Weight</md-table-head>
                      </md-table-row>

                      <md-table-row
                        v-for="item in item.points"
                        :key="item.title"
                      >
                        <md-table-cell>{{ item.title }}</md-table-cell>
                        <md-table-cell>{{ item.content }}</md-table-cell>
                        <md-table-cell>{{ item.type }}</md-table-cell>
                        <md-table-cell>{{ item.points }}</md-table-cell>
                        <md-table-cell>{{ item.weight }}</md-table-cell>
                      </md-table-row>
                    </md-table>
                  </md-card-content>
                </md-card-expand-content>
              </md-card-expand>
            </md-card>
          </div>
        </div>
        <div v-else>
          <h3>Es wurden keine Reviews rechtzeitig abgegeben</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";
import AuthHelper from "@/utils/AuthHelper";
export default {
  name: "ReviewOverview",
  data() {
    return {
      reviews: [],
      submission: {},
      loaded: false
    };
  },
  methods: {
    getSubmission(id) {
      this.review = DataService.getStudentSubmission(
        this.$parent.username,
        this.$parent.pw,
        id
      )
        .then(response => {
          this.submission = response.data;
          this.reviews = response.data.reviews;
          // console.log(this.submission, this.reviews);
          console.log(this.submission);
          console.log(this.reviews);
          this.loaded = true;
        })
        .catch(e => {
          console.log(e);
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
    if (AuthHelper.Authenticated(this)) {
      this.getSubmission(this.$route.params.id);
    } else {
      AuthHelper.Login(this);
    }
  }
};
</script>

<style scoped></style>
