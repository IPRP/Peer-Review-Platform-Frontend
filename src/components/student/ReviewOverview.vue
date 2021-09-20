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
        <div>
          <md-table v-model="reviews" md-card>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Students" md-sort-by="firstname"
                >{{ item.firstname }} {{ item.lastname }}</md-table-cell
              >
              <md-table-cell md-label="Feedback" md-sort-by="feedback">{{
                item.feedback
              }}</md-table-cell>
              <md-table-cell md-label="Punkte" md-sort-by="points">{{
                item.points[0].points
              }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";
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
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login";
    } else {
      this.getSubmission(this.$route.params.id);
    }
  }
};
</script>

<style scoped></style>
