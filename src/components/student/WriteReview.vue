<template>
  <div class="p-5">
    <h1 class="pl-5">Review verfassen</h1>
    <h3 class="pl-5">Workshop: WS1, Abgabe: Lukas Nowy</h3>
    <div class="pl-5">
      <md-button>
        <span>Abgabe_Nowy.pdf</span>
        <md-icon>get_app</md-icon>
      </md-button>
    </div>
    <div class="px-5">
      <h3 class="d-flex justify-content-start">Kriterien:</h3>
      <md-list class="d-flex" :md-expand-single="true">
        <md-list-item md-expand>

          <!--
          rebuild with card instead of list
          -->


          <span class="md-list-item-text">Kriterium 1</span>
          <md-list slot="md-expand">
            <md-list-item>
              <div class="d-flex">
                <div class="pr-4">
                  <h3>Vorgabe</h3>
                  <p class="md-list-item-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="pr-2">
                  <form class="d-flex">
                    <md-field class="mr-4 prp-feedback">
                      <label>Feedback</label>
                      <md-textarea v-model="autogrow" md-autogrow></md-textarea>
                    </md-field>
                    <md-switch class="align-self-center" v-model="criteria1">Erfüllt</md-switch>
                  </form>
                </div>
              </div>
            </md-list-item>
          </md-list>
        </md-list-item>
        <md-list-item md-expand>
          <span class="md-list-item-text">Kriterium 2</span>
          <md-list slot="md-expand">
            <md-list-item>
              <div class="d-flex">
                <div class="pr-4">
                  <h3>Vorgabe</h3>
                  <p class="md-list-item-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="pr-2">
                  <form class="d-flex">
                    <md-field class="mr-4 prp-feedback">
                      <label>Feedback</label>
                      <md-textarea v-model="autogrow" md-autogrow></md-textarea>
                    </md-field>
                    <md-switch class="align-self-center" v-model="criteria2">Erfüllt</md-switch>
                  </form>
                </div>
              </div>
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
      <form>
        <md-field>
          <label>Gesamtfeedback</label>
          <md-textarea></md-textarea>
        </md-field>
      </form>
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
  name: "WriteReview",
    data:() => ({
      criteria1: false,
      criteria2: false
    })
  }
</script>

<style scoped lang="scss">

.md-list-item-text {
  white-space: normal;
}

.prp-feedback {
  min-width: 40vw;
}

</style>
