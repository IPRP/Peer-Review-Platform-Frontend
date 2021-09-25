<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Mein Dashboard</h1>
    <div class="d-flex">
      <div class="px-1 px-md-5 flex-grow-1">
        <md-button class="md-raised" to="/teacherdashboard/createworkshop">
          <span>Neuer Workshop</span>
          <md-icon>add</md-icon>
        </md-button>

        <md-table v-model="workshops" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id"
              >{{ item.id }}
            </md-table-cell>
            <md-table-cell md-label="Titel" md-sort-by="id" md-numeric
              >{{ item.title }}
            </md-table-cell>
            <md-table-cell md-label="Actions">
              <md-button
                class="md-flat"
                :to="{ path: '/teacherdashboard/workshopdetails/' + item.id }"
              >
                <md-icon>info</md-icon>
              </md-button>
              <md-button
                class="md-flat"
                :to="{ path: '/teacherdashboard/editworkshop/' + item.id }"
              >
                <md-icon>edit</md-icon>
              </md-button>
              <md-button
                class="md-flat"
                @click="(currentID = item.id), (deleteDialog = true)"
              >
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <!--@md-cancel="onCancel"-->
        <md-dialog-confirm
          :md-active.sync="deleteDialog"
          md-title="Delete this Workshop?"
          md-content="This action cannot be undone!"
          md-confirm-text="Confirm"
          md-cancel-text="Cancel"
          @md-confirm="onConfirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";
import AuthHelper from "@/utils/AuthHelper";

export default {
  name: "TeacherDashboard",
  data() {
    return {
      workshops: [],
      deleteDialog: false,
      currentID: null
    };
  },
  methods: {
    onConfirm(id) {
      this.deleteWorkshop(id);
    },

    getWorkshops() {
      DataService.getAllWorkshopsTeacher(this.$parent.username, this.$parent.pw)
        .then(response => {
          this.workshops = response.data.workshops;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteWorkshop() {
      DataService.deleteWorkshopTeacher(
        this.currentID,
        this.$parent.username,
        this.$parent.pw
      ).catch(e => {
        console.log(e);
      });
      this.workshops = this.workshops.filter(obj => {
        return obj.id !== this.currentID;
      });
    }
  },
  mounted() {
    if (AuthHelper.Authenticated(this)) {
      this.getWorkshops();
    } else {
      AuthHelper.Login(this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
