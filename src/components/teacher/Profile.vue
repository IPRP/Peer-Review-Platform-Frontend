<template>
  <div class="p-1 p-md-5 d-flex align-items-center flex-column">
    <img src="../../assets/PICA.jpg" class="prp-picture" alt="Profilbild" />
    <h2>Lukas Nowy</h2>
    <p class="px-1 px-md-5">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
  </div>
</template>

<script>
import AuthHelper from "@/utils/AuthHelper";

export default {
  name: "Profile",
  mounted() {
    if (!AuthHelper.Authenticated(this)) {
      AuthHelper.Login(this);
    }
  }
};
</script>

<style lang="scss">
.prp-picture {
  border-radius: 200px;
  width: 200px;
}
</style>
