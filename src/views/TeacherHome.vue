<template>
  <div class="prp-home">
    <md-toolbar class="md-primary prp-toolbar">
      <router-link to="/teacherdashboard">
        <h3 class="md-title">Peer Review</h3>
      </router-link>
      <md-button to="/teacherdashboard">Home</md-button>
      <md-button to="/teacherdashboard/profile">Profile</md-button>
    </md-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "TeacherHome"
}
</script>

<style lang="scss" scoped>

</style>
