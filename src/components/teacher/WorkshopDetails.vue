<template>
  <div v-if="loaded">
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-80 md-small-size-95 md-xsmall-size-95"
      >
        <h1>Workshop: {{ this.workshop.workshop.title }}</h1>
        <p>{{ this.workshop.workshop.content }}</p>

        <md-table
          v-model="workshop.workshop.submissions"
          v-show="showOutstandingSubmissions"
        >
          <md-table-row>
            <md-table-head>Submissions</md-table-head>
          </md-table-row>

          <md-table-row
            v-for="item in this.workshop.workshop.students"
            :key="item.id"
          >
            <md-table-cell v-if="item.submissions.length > 0">
              {{ item.submissions[0].title }} von {{ item.firstname }}
              {{ item.lastname }} ({{ item.submissions[0].date }})
            </md-table-cell>
            <md-table-cell v-if="item.submissions.length > 0">
              <md-button
                class="md-icon-button"
                @click="showReviews(item.submissions[0].id)"
                :to="{
                  path:
                    '/teacherdashboard/workshopdetails/' +
                    $route.params.id +
                    '/reviews/' +
                    item.submissions[0].id
                }"
              >
                <md-icon>send</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <md-table
          v-model="workshop.workshop.students"
          v-show="showLatedSubmissions"
        >
          <md-table-row>
            <md-table-head>Fehlende Submissions</md-table-head>
          </md-table-row>

          <md-table-row
            v-for="item in this.workshop.workshop.students"
            :key="item.lastname"
          >
            <md-table-cell v-if="item.submissions.length === 0">
              {{ item.firstname }} {{ item.lastname }}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";
import AuthHelper from "@/utils/AuthHelper";

export default {
  name: "WorkshopDetails",
  data() {
    return {
      workshop: {},
      showOutstandingSubmissions: true,
      showLatedSubmissions: true,
      loaded: false
    };
  },
  methods: {
    showReviews(id) {
      console.log("Ok" + id);
    },

    getWorkshop() {
      //console.log("route", this.$route.params.id);
      DataService.getWorkshopDetailsTeacher(
        this.$route.params.id,
        this.$parent.username,
        this.$parent.pw
      )
        .then(response => {
          this.workshop = response.data;
          console.log("WOWO ");
          console.log(response.data);
          this.loaded = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  created() {},
  mounted() {
    if (AuthHelper.Authenticated(this)) {
      this.getWorkshop();
    } else {
      AuthHelper.Login(this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
