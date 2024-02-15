<template>
  <li class="nav-item">
    <router-link
      :to="`/${index}`"
      class="nav-link border-start-0 rounded-end-pill mb-2 ps-4"
      active-class="active "
      aria-current="page"
      ><i class="bi bi-card-list me-3"></i>{{ board.name }}</router-link
    >
  </li>
</template>

<script setup>
defineProps(["board", "index"]);
</script>

<style scoped>
.nav-link {
  color: #818181;
}
.nav-link:hover {
  color: #5652bd;
}
.active {
  background-color: #605cbd !important;
}
</style>
