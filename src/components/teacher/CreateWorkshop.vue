<template>
<form novalidate class="md-layout container md-alignment-top-center" @submit.prevent="validateWorkshop">
  <div class="md-layout-item md-xlarge-size-70 md-large-size-75 md-medium-size-80 md-small-size-95 md-xsmall-size-95">
    <h1 class="">Neuen Workshop erstellen</h1>
    <div class="">
      <form @submit.prevent="validateWorkshop">
        <md-field :class="getValidationClass('title')">
          <label>Titel</label>
          <md-input name="title" id="title" v-model="form.title" :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.title.required">A title is required</span>
          <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title (too short)</span>
        </md-field>

        <md-field>
          <label>Beschreibung</label>
          <md-textarea v-model="form.description"></md-textarea>
        </md-field>

        <md-field>
          <label>Datei auswählen</label>
          <md-file v-model="form.file"/>
        </md-field>

        <h2 class="pt-3">Personen</h2>
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('members')">
          <md-table name="members" id="members" v-model="form.members" :disabled="sending" class="md-layout-item md-size-100">
            <md-table-row>
              <md-table-head>Name</md-table-head>
              <md-table-head>Actions</md-table-head>
            </md-table-row>
            <md-table-row v-for="item in form.members" v-bind:key="item.id">
              <md-table-cell>{{ item.firstname }} {{ item.lastname }} {{ item.group }}</md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-list-action" v-on:click="removeMember(item)">
                  <md-icon>remove_circle</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>

          <span class="md-error" v-if="!$v.form.members.required">At least one member is required</span>

          </md-field>
          <div class="d-flex ">
            <md-button class="prp-success md-raised" @click="showDialog = true">
              <span class="p-1">Person/Verband hinzufügen</span>
              <md-icon class="prp-success-icon">add</md-icon>
            </md-button>
          </div>
        </div>

        <h2>Kriterien</h2>
        <div class="">
          <md-field class="md-layout md-gutter md-size-100" :class="getValidationClass('criteria')" name="criteria" id="criteria" v-model="form.criteria" :disabled="sending">
            <md-card class="md-layout-item md-size-100 criteria_card" v-for="item in form.criteria" :key="item.title">
            <md-card-header>
              <div class="md-layout md-gutter md-alignment-center">
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                  <md-field>
                    <label>Kriteriumname</label>
                    <md-input v-model="item.title"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                  <md-button class="md-icon-button md-list-action" @click="removeCriteria(item.title)">
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
                <div class="px-3">
                  <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                      <md-field>
                        <label></label>
                        <md-textarea v-model="item.content"></md-textarea>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                      <md-field>
                        <label>Bewertung</label>
                        <md-select v-model="item.type">
                          <md-option value="truefalse">Ja/Nein</md-option>
                          <md-option value="percentage">Prozent</md-option>
                          <md-option value="point">Punkte</md-option>
                          <md-option value="grade">Note</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </div>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>         
          
          <span class="md-error" v-if="!$v.form.criteria.required">At least one criteria is required</span>
          </md-field>

                    <div class="d-flex">
            <md-button class="prp-success md-raised" @click="addCriteria()">
              <span class="p-1">Kriterium hinzugügen</span>
              <md-icon class="prp-success-icon">add</md-icon>
            </md-button>
          </div>

        </div>

        <h2>Deadline</h2>
        <md-field :class="getValidationClass('deadline')">
            <md-datepicker name="deadline" id="deadline" v-model="form.deadline" :disabled="sending"/>
            <span class="md-error" v-if="!$v.form.deadline.required">A deadline is required</span>
        </md-field>

        <h2>Anonym</h2>
        <div class="pb-3">
          <md-switch v-model="form.anonymous">
            <td>{{ form.anonymous }}</td>
          </md-switch>
        </div>

        <div class="pt-3 d-flex justify-content-center justify-content-md-end">
          <md-button class="md-raised prp-danger" to="/teacherdashboard">
            <span class="p-1">Abbrechen</span>
            <md-icon class="prp-danger">delete</md-icon>
          </md-button>
          <md-button class="md-raised prp-success" type="submit" :disabled="sending">
            <span class="p-1">Erstellen</span>
            <md-icon class="prp-success-icon">done_all</md-icon>
          </md-button>
        </div>
<!--
<md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Students</md-dialog-title>

      <div class="container">
         <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-field>
              <label>First Name</label>
              <md-input v-model="searchBox.firstname"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="searchBox.lastname"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-button class="md-raised md-primary" @click="searchStudentsByName()">Search</md-button>
          </div>
        </div>

        <md-dialog-content>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Students</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>First Name</md-table-head>
        <md-table-head>Last Name</md-table-head>
        <md-table-head>Group</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.searchBox.students" :key="item.id">
        <md-table-cell md-numeric>{{item.id}}</md-table-cell>
        <md-table-cell>{{item.firstname}}</md-table-cell>
        <md-table-cell>{{item.lastname}}</md-table-cell>
        <md-table-cell>{{item.group}}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-raised md-primary">
            <md-icon>add</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </md-dialog-content>
      </div>




      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Cancel</md-button>
        <md-button class="md-primary" @click="showDialog = false">Confirm</md-button>
      </md-dialog-actions>
    </md-dialog>-->

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Students</md-dialog-title>

              <div class="md-layout md-gutter md-alignment-center container">
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-field>
              <label>First Name</label>
              <md-input v-model="searchBox.firstname"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="searchBox.lastname"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-button class="md-raised md-primary" @click="searchStudentsByName()">Search</md-button>
          </div>
        </div>

      <md-dialog-content>


    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Students</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>First Name</md-table-head>
        <md-table-head>Last Name</md-table-head>
        <md-table-head>Group</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in this.searchBox.students" :key="item.id">
        <md-table-cell md-numeric>{{item.id}}</md-table-cell>
        <md-table-cell>{{item.firstname}}</md-table-cell>
        <md-table-cell>{{item.lastname}}</md-table-cell>
        <md-table-cell>{{item.group}}</md-table-cell>
        <md-table-cell>
          <md-button :disabled="form.members.find(obj => {return obj.id == item.id})" class="md-icon-button md-raised md-primary" @click="addStudent(item.id)">
            <md-icon>add</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">OK</md-button>
      </md-dialog-actions>
    </md-dialog>


      </form>
    </div>
  </div>
</form>
</template>

<script>

import DataService from "../../services/DataService";
import { validationMixin } from 'vuelidate'
import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

export default {
  name: 'CreateWorkshop',
  mixins: [validationMixin],
  data() {
    return {
      showDialog: false,
      cid_counter: 1,
      form: {
        title: null,
        description: null,
        file: null,
        members: [],
        criteria: [],
        deadline: null,
        anonymous: true
      },
      sending: false,
      searchBox: {
        firstname: "",
        lastname: "",
        students: []
      }
    }
  },
  validations: {
      form: {
        title: {
          required,
          minLength: minLength(3)
      },
      members: {
        required
      },

      deadline: {
        required
      },

      criteria: {
        required
      }
    }
    },
  methods: {

    addStudent(id) {
      this.form.members.push(this.searchBox.students.find(obj => {return obj.id == id}));
    },

    searchStudentsByName() {
        DataService.searchStudentsByName(this.searchBox.firstname, this.searchBox.lastname)
          .then(response => {
            console.log(response.data);
            this.searchBox.students = response.data;
          })
          .catch(e => {
            console.log(e);
            alert("Fehler");
          });
    },
    removeMember(id) {
      this.form.members = this.form.members.filter(function (obj) {
        return obj !== id;
      });
    },

    removeCriteria(title) {
      this.form.criteria = this.form.criteria.filter(function (obj) {
        return obj.title !== title;
      });
    },

    editCriteria(title) {
      console.log(title);
    },

    deleteCriteria(title) {
      this.form.criteria = this.form.criteria.filter(function (obj) {
        return obj.title !== title;
      });
    },

    addCriteria() {
      this.form.criteria.push({
        title: "Kriterium",
        content: "Beschreibung",
        type: "point",
        weight: 1.0
      });
      this.cid_counter++;
    },

    createWorkshop() {

      DataService.addWorkshopTeacher(this.form.title, this.form.description, this.form.deadline, this.form.anonymous, this.form.members, this.form.criteria)
          .then(response => {
            console.log(response.data);
            window.location.href = 'http://localhost:8081/teacherdashboard';
          })
          .catch(e => {
            console.log(e);
            alert("Fehler");
          });

    },

    getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      validateWorkshop () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.createWorkshop();
        }
      }

  },
  created() {
    //this.criteria = [{id: 1, name: "Kriterium", beschreibung: "Beschreibung", janein: true, prozent: -1, punkte: -1}];
    this.is_anonym = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container{
    //width: 80%;
    margin: auto;
  }

  .criteria_btn {
    float: right !important;
  }

  .criteria_card {
    margin-bottom: 10px;
  }
</style>
