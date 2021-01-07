<template>
  <div class="p-5">
    <h1 class="pl-5">Mein Dashboard</h1>
    <div class="d-flex">
      <div class="pl-5 pr-5 flex-grow-1">
        <div class="pb-5">
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Laufende Reviews</h1>
            </md-table-toolbar>
            <md-table-row>
              <md-table-cell>Workshop 1 (Abgabe von Lukas Nowy)</md-table-cell>
              <md-table-cell class="prp-table-action-cell">
                <md-button class="md-icon-button md-list-action">
                  <md-icon>add_circle</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action"  to="/reviewverfassen">
                  <md-icon>forward</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>

        <div>
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Laufende Abgaben</h1>
            </md-table-toolbar>
            <md-table-row>
              <md-table-cell>Workshop 3 (Abgabe fehlt)</md-table-cell>
              <md-table-cell class="prp-table-action-cell">
                <md-button class="md-icon-button md-list-action">
                  <md-icon>add_circle</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" to="/workshopabgabe/3">
                  <md-icon>forward</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>

      <div class="pr-5 flex-grow-1">
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Meine Workshops</h1>
          </md-table-toolbar>
          <md-table-row>
            <md-table-cell>Workshop 32 (Lukas Nowy)</md-table-cell>
            <md-table-cell class="prp-table-action-cell">
              <md-button class="md-icon-button md-list-action"  to="/workshopoverview/32">
                <md-icon>info</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>Workshop 31 (Max Mustermann)</md-table-cell>
            <md-table-cell class="prp-table-action-cell">
              <md-button class="md-icon-button md-list-action"  to="/workshopoverview/31">
                <md-icon>info</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>Workshop 32 (Lukas Nowy)</md-table-cell>
            <md-table-cell class="prp-table-action-cell">
              <md-button class="md-icon-button md-list-action"  to="/workshopoverview/32">
                <md-icon>info</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentHome.vue"
}
</script>

<style lang="scss" scoped>

.prp-table-action-cell {
  text-align: right;
}

</style>
