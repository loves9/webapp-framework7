<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main View -->
    <f7-view main class="safe-areas">
      <home-view></home-view>
    </f7-view>
  </f7-app>
</template>

<script>
// Import Routes
import routes from "./routes.js";

import HomeView from './pages/Home.vue'

export default {
  components: {
    HomeView
  },
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: "io.framework7.webapp", // App bundle ID
        name: "Framework7", // App name
        theme: "ios", // Automatic theme detection
        // App routes
        routes: routes,
        view: {
          stackPages: true,
          pushState: true,
          pushStateSeparator: "#",
        },
        on: {
          // each object key means same name event handler
        }
      }
    };
  },
  mounted() {}
};
</script>


