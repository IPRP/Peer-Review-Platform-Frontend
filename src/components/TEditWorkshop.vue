<template>
  <div class="container cn2">
    <h1>Workshop bearbeiten</h1>
    <br>

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
      <md-file v-model="single" />
    </md-field>

    <p>Personen</p>
    <md-table>
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in workshop.members" v-bind:key="item">
        <md-table-cell>{{item}}</md-table-cell>
        <md-table-cell>
          <md-button class="md-flat" v-on:click="remStudent(item)">
            <md-icon>remove_circle</md-icon>
            </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-raised btn-green" @click="showDialog = true">Person/Verband hinzufügen</md-button>
    <br><br>

    <p>Kriterien</p>
    <div>
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
                 <md-button class="md-flat" v-on:click="remCriteria(item.id)">
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
          <div class="crit_cont">
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
    <md-button class="md-raised btn-green" @click="addCriteria">Kriterium hinzufügen</md-button>
    </div>
    <br><br>

    <p>Deadline</p>
    <md-datepicker v-model="testdate" />

    <p>Anonym</p>
    <md-switch v-model="workshop.anonym"><td>{{ this.workshop.anonym }}</td></md-switch>
    <br><br>

    <md-button class="btn-green" @click="editWorkshop()">Update</md-button>
    <md-button to="/teacher" class="btn-red">Abbrechen</md-button>


    <br>

        <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Person hinzufügen</md-dialog-title>

 <div md-dynamic-height>
        <div class="container">
        <md-field>
          <label>Name</label>
          <md-input v-model="name"></md-input>
        </md-field>
        </div>

      </div>


      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false; addStudent(name)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: 'TNewWorkshop',
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
        this.workshop.members = this.workshop.members.filter(function( obj ) {
          return obj != name;
        });
    },
    remCriteria(id) {
    this.workshop.kriterien = this.workshop.kriterien.filter(function( obj ) {
          return obj.id !== id;
        });
    },

    addStudent(name) {
     this.workshop.members.push(name);
    },
    editKriterium(title) {
      console.log(title);
    },
    delKriterium(id) {
      this.workshop.kriterien = this.workshop.kriterien.filter(function( obj ) {
          return obj.id != id;
        });
    },

    addCriteria() {
      alert(this.cid_counter);
      this.workshop.kriterien.push({id: this.workshop.kriterien.length + this.cid_counter, name: "Kriterium", beschreibung: "Beschreibung", janein: true, prozent: 0.0, punkte: 0.0});
      this.cid_counter++;
    },

    editWorkshop() {
      console.log(this.workshop.id, this.workshop.title, this.workshop.beschreibung, this.testdate, this.workshop.anonym, this.workshop.members)
      DataService.editWorkshopT(this.workshop.title, this.workshop.beschreibung, this.testdate, this.workshop.anonym, this.workshop.members)
        .then(response => {
          console.log(response.data);
          window.location.href = 'http://localhost:8081/teacher';
        })
        .catch(e => {
          console.log(e);
        });
    },

     getWorkshop() {
          DataService.getWorkshopDetailT()
        .then(response => {
          this.workshop = response.data[0].find(obj => {return obj.id == this.getIDfromURL()});
          console.log(response.data);
          this.testdate = this.workshop.deadline.split("T")[0];
        })
        .catch(e => {
          console.log(e);
        });


    },

    getIDfromURL(){
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
  .btn-green{
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

    .cn2 {
    margin-top: 40px;
  }
</style>
