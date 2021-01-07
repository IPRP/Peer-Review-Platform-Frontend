<template>
  <div class="p-5">
    <h1 class="pl-5">Workshop Abgabe</h1>
    <h3 class="pl-5">Workshop: {{ $route.params.id }}</h3>


    <div class="pl-5 pr-5">
      <div>
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <textarea v-model="angabe" placeholder="Text der Angabe kommt hierhin" readonly></textarea>

        <md-button>
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div>
        <h4>Deadline:</h4><p>{{ deadline }}</p>
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
    name: "WorkshopAbgeben",
    data: function () {
      return {
        angabe: "Die Workshop-Beschreibung kommt hier hin",
        deadline: "20.2.2021"
      }
    },
  }
</script>

<style scoped>
  textarea {
    display: block;
    width: 100%;
  }
</style>
