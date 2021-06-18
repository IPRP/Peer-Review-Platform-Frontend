<template>
  <div class="p-1 p-md-5">
    <div class="pl-1 pl-md-5">
      <h1>Review Overview</h1>
      <h3>Workshop: {placeholder}</h3>
      <h3>Angabe:</h3>
      <p></p>
      <md-button class="md-raised md-primary">
        <span>Abgabe</span>
        <md-icon>get_app</md-icon>
      </md-button>
      <h3>Abgegeben am: 12.12.1212</h3>
      <div>
        <md-table v-model="this.review.points" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ point }">
            <md-table-cell md-label="">{{ point.content }}</md-table-cell>
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
      review: {}
    };
  },
  methods: {
    getReview(id) {
      this.review = DataService.getReview(
        this.$parent.username,
        this.$parent.pw,
        id
      )
        .then(response => {
          this.review = response.data;
          console.log(this.review);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getWorkshop() {

    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/login";
    } else {
      this.getReview(this.$route.params.id);
    }
  }
};
</script>

<style scoped>

</style>
