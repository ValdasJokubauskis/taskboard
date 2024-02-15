<template>
  <div
    :class="[
      `task-modal theme-first-${boardsStore.settings.theme} theme-text-second-${boardsStore.settings.theme}`,
    ]"
  >
    <div class="modal-dialog modal-dialog-center">
      <div class="modal-content">
        <div class="modal-header mb-3">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoards } from "./boards";

const boardsStore = useBoards();
</script>

<style>
.task-modal {
  position: absolute;
  overflow: auto;
  max-height: 40rem;
  z-index: 10;
  top: 5rem;
  left: 50%;
  width: 25rem;
  margin-left: -150px;
  padding: 1rem 2rem;
  border-radius: 10px;
}
</style>
