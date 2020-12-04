<template>
  <div class="p-3">
    <h1 class="d-flex justify-content-start">Mein Dashboard</h1>

    <div class="d-flex">
      <div class="mr-auto ml-auto">
        <h2 class="d-flex justify-content-start">Laufende Reviews</h2>
        <md-list>
          <md-list-item>
            <span class="pr-5">Workshop 1 (Abgabe von Lukas Nowy)</span>
            <div>
              <md-button class="md-icon-button md-list-action">
                <md-icon>add_circle</md-icon>
              </md-button>
              <md-button class="md-icon-button md-list-action">
                <md-icon>forward</md-icon>
              </md-button>
            </div>
          </md-list-item>
        </md-list>

        <h2 class="d-flex justify-content-start pt-5">Laufende Abgaben</h2>
        <md-list>
          <md-list-item>
            <span class="pr-5">Workshop 3 (Abgabe fehlt)</span>
            <div>
              <md-button class="md-icon-button md-list-action">
                <md-icon>add_circle</md-icon>
              </md-button>
              <md-button class="md-icon-button md-list-action">
                <md-icon>forward</md-icon>
              </md-button>
            </div>
          </md-list-item>
        </md-list>

      </div>
      <div class="mr-auto ml-auto">
        <h2 class="d-flex justify-content-start">Meine Workshops</h2>

        <md-list>
          <md-list-item>
            <span class="pr-5">Workshop 32 (Lukas Nowy)</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon>info</md-icon>
            </md-button>
          </md-list-item>
          <md-list-item>
            <span class="pr-5">Workshop 31 (Max Mustermann)</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon>info</md-icon>
            </md-button>
          </md-list-item>
          <md-list-item>
            <span class="pr-5">Workshop 32 (Lukas Nowy)</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon>info</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "StudentHome.vue"
}
</script>

<style scoped>
</style>
