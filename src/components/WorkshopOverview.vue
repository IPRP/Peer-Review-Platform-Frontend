<template>
  <div class="p-5">
    <h1 class="pl-5">Workshop Übersicht</h1>
    <h3 class="pl-5">Workshop: {{ $route.params.id }}</h3>


    <div class="pl-5 pr-5">
      <div>
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <md-field>
          <md-textarea v-model="angabe" placeholder="Text der Angabe kommt hierhin" readonly></md-textarea>
        </md-field>
        <md-button>
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div>
        <p>Deadline: {{ deadline }}</p>
      </div>

      <div>
        <md-list class="d-flex" :md-expand-single="true">
          <md-list-item md-expand>
            <span class="md-list-item-text ">Bisherige Abgaben</span>
            <md-list slot="md-expand">
              <md-list-item>
                <div class="d-flex">
                  <div class="pr-4">
                    <span class="md-text">Abgabe vom {{ dateAbgabe1 }}</span>
                  </div>
                </div>
                <md-button class="md-icon-button md-list-action"  to="/reviewoverview">
                  <md-icon>info</md-icon>
                </md-button>
              </md-list-item>
              <md-list-item>
              <div class="d-flex">
                <div class="pr-4">
                  <span class="md-text">Abgabe vom {{ dateAbgabe2 }}</span>
                </div>
              </div>
              <md-button class="md-icon-button md-list-action"  to="/reviewoverview">
                <md-icon>info</md-icon>
              </md-button>
            </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </div>

      <div id="abgabe">
        <h3 class="d-flex justify-content-start">Abgabe Datei</h3>

        <form action="">
          <input type="file" id="abgabeFile" name="filename">
        </form>
      </div>

      <div class="d-flex justify-content-end">
        <md-button class="md-raised prp-danger">
          <span class="p-1">Abbrechen</span>
          <md-icon class="prp-danger">delete</md-icon>
        </md-button>
        <md-button class="md-raised prp-success">
          <span class="p-1">Speichern</span>
          <md-icon class="prp-success-icon">done_all</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "WorkshopOverview",
  data: function () {
    return {
      angabe: "Die Workshop-Beschreibung kommt hier hin",
      dateAbgabe1: "8.1.2021",
      dateAbgabe2: "19.1.2021",
      deadline: "20.2.2021"
    }
  },
}
</script>

<style scoped>
</style>
