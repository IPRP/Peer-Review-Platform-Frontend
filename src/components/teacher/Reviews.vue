<template>
  <div class="md-layout md-alignment-top-center">
    <div
      class="md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-80 md-small-size-95 md-xsmall-size-95"
    >
      <h1>{{ submission.title }} - Reviews</h1>
      <p>Comment: {{ submission.comment }}</p>
      <p>Date: {{ submission.date }}</p>
      <p>Gesamtpunkte: {{ submission.points }}/{{ submission.maxPoints }}</p>
      <!--v-for="item in submission.reviews" :key="item.id" -->
      <div v-if="!submission.noReviews">
        <h3>Reviews</h3>
        <md-card class="card" v-for="item in submission.reviews" :key="item.id">
          <md-card-header>
            <div class="md-title">
              Author: {{ item.firstname }} {{ item.lastname }}
            </div>
            <div class="md-subhead">ID {{ item.id }}</div>
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

                  <md-table-row v-for="item in item.points" :key="item.title">
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
      <div v-else>
        <h3>Es wurden keine Reviews rechtzeitig abgegeben</h3>
      </div>
      <div
        v-if="submission.missingReviews && submission.missingReviews.length > 0"
      >
        <h3>Fehlende Reviews</h3>
        <md-card
          class="card"
          v-for="item in submission.missingReviews"
          :key="item.id"
        >
          <md-card-header>
            <div class="md-title">
              Author: {{ item.firstname }} {{ item.lastname }}
            </div>
            <div class="md-subhead">ID {{ item.id }}</div>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "Reviews",
  data() {
    return {
      submission: {}
    };
  },
  methods: {
    getSubmission() {
      DataService.getSubmissionTeacher(
        this.$parent.username,
        this.$parent.pw,
        this.$route.params.id
      )
        .then(response => {
          this.submission = response.data;
          console.log("WOWO ");
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    mockWorkshop() {
      this.submission = {
        ok: true,
        title: "Submission 1",
        comment: "Comment 1",
        attachments: [{ id: 0, title: "AT1" }],
        locked: false,
        date: "2020-05-01",
        reviewsDone: true,
        points: 4,
        maxPoints: 5,
        lastname: "Nowy",
        firstname: "Lukas",
        reviews: [
          {
            id: 1,
            firstname: "Lukas",
            lastname: "Beck",
            feedback: "Gut gemacht!",
            points: [
              {
                type: "point",
                title: "Kriterium 1",
                content: "Beschreibung 1",
                points: 5,
                weight: 1
              },
              {
                type: "point",
                title: "Kriterium 2",
                content: "Beschreibung 2",
                points: 4,
                weight: 2
              }
            ]
          },
          {
            id: 2,
            firstname: "Georg",
            lastname: "Reisinger",
            feedback: "Sehr Gut!",
            points: [
              {
                type: "point",
                title: "Kriterium 1",
                content: "Beschreibung 1",
                points: 4,
                weight: 1
              },
              {
                type: "point",
                title: "Kriterium 2",
                content: "Beschreibung 2",
                points: 5,
                weight: 2
              }
            ]
          }
        ]
      };
    }
  },
  mounted() {
    //this.mockWorkshop();
    this.getSubmission();
  }
};
</script>

<style>
.card {
  margin-bottom: 20px !important;
}
</style>
