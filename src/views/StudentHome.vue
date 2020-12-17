<template>
  <div class="prp-home">
    <md-toolbar class="md-primary prp-toolbar">
      <h3 class="md-title">Peer Review</h3>
      <md-button to="/">Home</md-button>
    </md-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "StudentHome",
}
</script>

<style lang="scss" scoped>

.prp-home {
  height: 100vh;
}
.prp-toolbar {
  background: linear-gradient(90deg, rgb(0, 122, 224) 0%, rgb(12, 206, 247) 100%);
}

</style>
