<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <p
        v-if="hidden"
        :class="[
          `col-1 d-lg-block d-none mb-0 theme-second-${boardsStore.settings.theme}`,
        ]"
        @click="hidden = false"
      >
        <button class="btn">
          <i class="bi bi-eye"></i>
          <span :class="[`theme-text-first-${boardsStore.settings.theme}`]"
            >Show</span
          >
        </button>
      </p>
      <div v-else class="col-3 d-none d-lg-block p-0">
        <NavBar @hide="hidden = true" />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "./NavBar.vue";
import { useBoards } from "./boards";
import { provide } from "vue";

const boardsStore = useBoards();

const hidden = ref(false);

provide("key", hidden);
</script>

<style scoped>
.bi {
  margin: 0 15px;
  color: #8c8c8c;
}
</style>
