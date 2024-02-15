<template>
  <Navigation />
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import { watchEffect } from "vue";
import { useBoards } from "./components/boards";

const boardsStore = useBoards();

watchEffect(() => {
  import(`./assets/${boardsStore.settings.theme}.css`);
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.list-group-item,
.dropdown-item {
  cursor: pointer;
}
.notice {
  text-align: center;
  color: rgba(255, 0, 0, 0.5);
}
.my-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
