<template>
  <div class="dashboard">
    <div class="page-container">
      <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Dashboard</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Navigation</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item to="/studentdashboard" @click="setActive('studentdashboard')">
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text" :class="{ 'prp-menu-text-active':isActive('studentdashboard') }">Dashboard</span>
            </md-list-item>

            <md-list-item to="/offeneworkshops" @click="setActive('offeneworkshops')">
              <md-icon>work</md-icon>
              <span class="md-list-item-text" :class="{ 'prp-menu-text-active':isActive('offeneworkshops') }">Offene Workshops</span>
            </md-list-item>

            <md-list-item to="/reviewverfassen" @click="setActive('reviewverfassen')">
              <md-icon>star</md-icon>
              <span class="md-list-item-text" :class="{ 'prp-menu-text-active':isActive('reviewverfassen') }">Erhaltene Workshops</span>
            </md-list-item>

            <md-list-item to="/workshopabgabe" @click="setActive('workshopabgabe')">
              <md-icon>create</md-icon>
              <span class="md-list-item-text" :class="{ 'prp-menu-text-active':isActive('workshopabgabe') }">Workshop Abgabe</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <div>
            <router-view></router-view>
          </div>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StudentHome",
    data: () => ({
      menuVisible: false,
      activeItem: false
    }),
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },
      setActive(menuItem) {
        this.activeItem = menuItem;
      },
      isActive(menuItem) {
        return this.activeItem === menuItem
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 100vh;
}

.md-drawer {
  width: 250px;
  max-width: calc(100vw - 125px);
}

.router-link-active {
  background: #0ccef7;
}

.prp-menu-text-active {
  color: white;
}
</style>
