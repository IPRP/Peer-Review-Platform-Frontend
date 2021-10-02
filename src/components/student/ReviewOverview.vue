<template @review-overview="getSubmission">
  <div class="p-1 p-md-5">
    <div class="pl-1 pl-md-5">
      <h1>Review Overview</h1>
      <h3>Abgabe-Titel: {{ this.submission.title }}</h3>
      <h3>Meine Abgabe</h3>
      <md-button class="md-raised md-primary" @click="downloadSubmission">
        <span>{{submission.attachments[0].title}}</span>
        <md-icon>get_app</md-icon>
      </md-button>
      <h3>Abgegeben am: {{ this.submission.date }}</h3>
      <div>
        <md-table v-model="reviews" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Students" md-sort-by="firstname">{{ item.firstname }} {{item.lastname}}</md-table-cell>
            <md-table-cell md-label="Feedback" md-sort-by="feedback">{{ item.feedback }}</md-table-cell>
            <md-table-cell md-label="Punkte" md-sort-by="points">{{ item.points[0].points}}</md-table-cell>
          </md-table-row>
        </md-table>
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
      submission: {}
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
        })
        .catch(e => {
          console.log(e);
        });
    },
    downloadSubmission() {
      DataService.downloadSubmission(
        this.$parent.username,
        this.$parent.pw,
        this.submission.attachments[0].title
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fURL = document.createElement('a');

          fURL.href = fileURL;
          fURL.setAttribute('download', 'file.pdf');
          document.body.appendChild(fURL);

          fURL.click();
        });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/peer-Review-Platform-Frontend/login";
    } else {
      this.getSubmission(this.$route.params.id);
    }
  }
};
</script>

<style scoped>

</style>
