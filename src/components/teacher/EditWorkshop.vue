<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Workshop bearbeiten</h1>
    <div class="px-1 px-md-5">
      <form>
        <md-field>
          <label>Titel</label>
          <md-input v-model="workshop.title"></md-input>
        </md-field>

        <md-field>
          <label>Beschreibung</label>
          <md-textarea v-model="workshop.beschreibung"></md-textarea>
        </md-field>

        <md-field>
          <label>Datei auswählen</label>
          <md-file v-model="single"/>
        </md-field>

        <h2 class="pt-3">Personen</h2>
        <div class="pb-3">
          <md-table>
            <md-table-row>
              <md-table-head>Name</md-table-head>
              <md-table-head>Actions</md-table-head>
            </md-table-row>
            <md-table-row v-for="item in workshop.members" v-bind:key="item">
              <md-table-cell>{{ item.firstname }} {{ item.lastname }} {{ item.group }}</md-table-cell>
              <md-table-cell>
                <md-button class="md-flat" v-on:click="remStudent(item)">
                  <md-icon>remove_circle</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <md-button class="md-raised btn-green" @click="showDialog = true">Person/Verband hinzufügen</md-button>
          <div class="d-flex justify-content-end">
            <md-button class="prp-success md-raised" @click="showDialog = true">
              <span class="p-1">Person/Verband hinzufügen</span>
              <md-icon class="prp-success-icon"></md-icon>
            </md-button>
          </div>
        </div>

        <h2>Kriterien</h2>
        <div class="pb-3">
          <md-card v-for="item in this.workshop.kriterien" :key="item.id">

            <md-card-header>
              <div class="md-layout md-gutter md-alignment-center">
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                  <md-field>
                    <label>Kriteriumname</label>
                    <md-input v-model="item.name"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                  <md-button class="md-icon-button md-list-action" @click="removeCriteria(item.id)">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </div>
            </md-card-header>

            <md-card-expand>
              <md-card-actions md-alignment="space-between">
                <md-card-expand-trigger>
                  <md-button class="md-icon-button">
                    <md-icon>expand_more</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <div class="px-1 px-md-3">
                  <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                      <md-field>
                        <label></label>
                        <md-textarea v-model="item.beschreibung"></md-textarea>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                      <md-field>
                        <label for="movie">Bewertung</label>
                        <md-select v-model="item.bewertung" name="movie" id="movie">
                          <md-option value="yn">Ja/Nein</md-option>
                          <md-option value="percent">Prozent</md-option>
                          <md-option value="points">Punkte</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </div>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>

          <div class="d-flex justify-content-end">
            <md-button class="prp-success md-raised" @click="addCriteria">
              <span class="p-1">Kriterium hinzugügen</span>
              <md-icon class="prp-success-icon">add</md-icon>
            </md-button>
          </div>
        </div>

        <h2>Deadline</h2>
        <md-datepicker v-model="testdate"/>

        <h2>Anonym</h2>
        <div class="pb-3">
          <md-switch v-model="workshop.anonym">
            <td>{{ this.workshop.anonym }}</td>
          </md-switch>
        </div>

        <div class="pt-3 d-flex justify-content-center justify-content-md-end">
          <md-button class="md-raised prp-danger" to="/teacherdashboard">
            <span class="p-1">Abbrechen</span>
            <md-icon class="prp-danger">delete</md-icon>
          </md-button>
          <md-button class="md-raised prp-success" @click="editWorkshop">
            <span class="p-1">Update</span>
            <md-icon class="prp-success-icon">done_all</md-icon>
          </md-button>
        </div>

        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>Person hinzufügen</md-dialog-title>

          <div>
            <b>Nach Vor und Nachname suchen</b>
            <md-field>
              <label>Vorname</label>
              <md-input v-model="vorname"></md-input>
            </md-field>
            <md-field>
              <label>Nachname</label>
              <md-input v-model="nachname"></md-input>
            </md-field>
            <b>oder</b>
            <b> nach Gruppe suchen</b>
            <md-field>
              <label>Gruppe</label>
              <md-input v-model="group"></md-input>
            </md-field>
          </div>

          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            <md-button class="md-primary" @click="showDialog = false; findStudent(vorname,nachname,group, id)">Save
            </md-button>
          </md-dialog-actions>
        </md-dialog>

      </form>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: 'CreateWorkshop',
  data() {
    return {
      //students: [],
      //criteria: [],
      //is_anonym: Boolean,
      showDialog: false,
      workshop: {},
      testdate: String,
      cid_counter: 1
    }
  },
  methods: {
    remStudent(name) {
      this.workshop.members = this.workshop.members.filter(function (obj) {
        return obj != name;
      });
    },
    removeCriteria(id) {
      this.workshop.kriterien = this.workshop.kriterien.filter(function (obj) {
        return obj.id !== id;
      });
    },

    findStudent(vorname, nachname, group, id) {
      if (!id) {
        id = ""
      }
      if (!vorname) {
        vorname = ""
      }
      if (!nachname) {
        nachname = ""
      }
      if (!group) {
        group = ""
      }
      this.workshop.members.push({id: id, firstname: vorname, lastname: nachname, group: group});
      console.log(this.students);
    },
    editKriterium(title) {
      console.log(title);
    },
    delKriterium(id) {
      this.workshop.kriterien = this.workshop.kriterien.filter(function (obj) {
        return obj.id != id;
      });
    },

    addCriteria() {
      alert(this.cid_counter);
      this.workshop.kriterien.push({
        id: this.workshop.kriterien.length + this.cid_counter,
        name: "Kriterium",
        beschreibung: "Beschreibung",
        janein: true,
        prozent: 0.0,
        punkte: 0.0
      });
      this.cid_counter++;
    },

    editWorkshop() {
      console.log(this.workshop.id, this.workshop.title, this.workshop.beschreibung, this.testdate, this.workshop.anonym, this.workshop.members)
      DataService.editWorkshopTeacher(this.$route.params.id, this.workshop.title, this.workshop.beschreibung, this.testdate, this.workshop.anonym, this.workshop.members)
          .then(response => {
            console.log(response.data);
            window.location.href = 'http://localhost:8081/teacherdashboard';
          })
          .catch(e => {
            console.log(e);
          });
    },

    getWorkshop() {
      DataService.getWorkshopDetailsTeacher()
          .then(response => {
            this.workshop = response.data[0].find(obj => {
              return obj.id == this.getIDfromURL()
            });
            console.log(response.data);
            this.testdate = this.workshop.deadline.split("T")[0];
          })
          .catch(e => {
            console.log(e);
          });


    },

    getIDfromURL() {
      return window.location.pathname.split('/')[3];
    }
  },
  mounted() {
    //this.students = ["Lukas Nowy", "Georg Reisinger", "Noch wer"];
    //this.criteria = [{id: 1, name: "Kriterium", beschreibung: "Beschreibung", janein: true, prozent: 0.0, punkte: 0.0}];
    //this.is_anonym = true;
    this.getWorkshop();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-green {
  float: right;
  background-color: rgb(0, 201, 67) !important;
}

.btn-red {
  float: right;
  background-color: rgb(255, 74, 61) !important;
}

.crit_cont {
  margin-left: 4%;
  margin-right: 4%;
}
</style>
