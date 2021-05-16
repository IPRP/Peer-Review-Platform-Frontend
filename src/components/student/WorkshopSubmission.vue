<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">Workshop {{$route.params.workshopname}} Abgabe</h1>
    <h3 class="pl-1 pl-md-5">Workshop ID: {{ $route.params.id }}</h3>
    <div class="px-1 px-md-5">
      <div>
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda consequatur cupiditate ducimus, esse eum id ipsum itaque natus nesciunt nobis nulla omnis provident quam quo ratione unde, voluptas voluptates! </p>
        <md-button>
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div>
        <h4>Deadline:</h4><p>{{ deadline }}</p>
      </div>
      <div>
        <h3 class="d-flex justify-content-start">Abgabe Datei</h3>
        <form>
          <input type="file" name="filename">
        </form>
      </div>
      <div class="pt-3 d-flex justify-content-center justify-content-md-end">
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
    name: "WorkshopSubmission",
    data: function () {
      return {
        angabe: "Die Workshop-Beschreibung kommt hier hin",
        deadline: "20.2.2021"
      }
    },
  }
</script>

<style scoped>

</style>
