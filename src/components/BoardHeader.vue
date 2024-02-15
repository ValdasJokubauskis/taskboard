<template>
  <nav class="navbar p-0">
    <div
      :class="[
        `container-fluid theme-first-${boardsStore.settings.theme} pb-3`,
      ]"
    >
      <nav :class="[`navbar navbar-${boardsStore.settings.theme} d-lg-none`]">
        <div class="container-fluid">
          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div
        class="offcanvas offcanvas-start w-75"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <NavBar />
      </div>
      <span
        :class="[
          `navbar-brand theme-text-second-${boardsStore.settings.theme} fw-semibold p-3 fs-4 me-0`,
        ]"
      >
        {{ board(index).name }}
      </span>
      <div class="ps-0">
        <button
          class="btn fw-semibold theme-btn text-light rounded-pill"
          @click="create = true"
        >
          +Add New Task
        </button>
        <Teleport to="body">
          <Transition>
            <div v-if="create" class="my-modal-overlay">
              <CreateTask @close="create = false" :index="index" />
            </div>
          </Transition>
        </Teleport>
        <div class="btn-group dropstart">
          <button
            :class="[
              `btn border-0 theme-text-second-${boardsStore.settings.theme}`,
            ]"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
          >
            &#8942;
          </button>
          <ul
            :class="[
              `dropdown-menu theme-second-${boardsStore.settings.theme}`,
            ]"
          >
            <li @click="open = true">
              <a
                :class="[
                  `dropdown-item theme-text-second-${boardsStore.settings.theme}`,
                ]"
                >Edit</a
              >
            </li>
            <li @click="onDelete">
              <a
                :class="[
                  `dropdown-item theme-text-second-${boardsStore.settings.theme}`,
                ]"
                >Delete</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <Transition>
    <div v-if="open" class="my-modal-overlay">
      <Modal>
        <template #header> <p class="fw-semibold">Edit Board</p> </template>
        <template #body>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="board(index).name"
            />
          </div>
          <div class="d-grid">
            <button
              :disabled="!board(index).name"
              type="button"
              class="btn theme-btn text-light"
              @click="open = false"
            >
              Save and Exit
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </Transition>
</template>

<script setup>
import CreateTask from "./CreateTask.vue";
import Modal from "./Modal.vue";
import { ref } from "vue";
import { useBoards } from "./boards";
import NavBar from "./NavBar.vue";

const boardsStore = useBoards();

const { board, index } = defineProps(["board", "index"]);
const emit = defineEmits(["delete"]);

function onDelete() {
  emit("delete");
}

const create = ref(false);
const open = ref(false);
</script>

<style scoped>
.theme-btn {
  background-color: #605cbd;
}

.theme-btn:hover {
  background-color: #5f5cbdcd;
}
.navbar-brand {
  pointer-events: none;
}
</style>
