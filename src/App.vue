<template>
  <div id="app">
    <dev-menu></dev-menu>
  </div>
</template>

<script>
import menu from "./components/dev-menu.vue";

export default {
  name: "App",
  components: {
    'dev-menu': menu,
  }
};
</script>
