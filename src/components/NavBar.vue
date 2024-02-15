<template>
  <nav class="navbar p-0 border-end border-secondary fw-semibold">
    <div
      :class="[
        `container-fluid ps-0 vh-100 flex-column theme-first-${boardsStore.settings.theme}`,
      ]"
    >
      <ul class="nav nav-pills flex-column align-self-start w-75">
        <li class="nav-item mb-5 p-3">
          <p
            :class="[
              `fs-2 fw-bold theme-text-second-${boardsStore.settings.theme}`,
            ]"
          >
            <img
              src="../assets/brand.png"
              alt="Logo"
              width="30"
              height="30"
              class="d-inline-block align-text-center"
            />
            kanban
          </p>
        </li>
        <li
          :class="[`nav-item theme-text-first-${boardsStore.settings.theme}`]"
        >
          <p class="ps-4">ALL BOARDS ({{ boardsStore.boards.length }})</p>
        </li>
        <NavBarLink
          v-for="(board, index) in boardsStore.boards"
          :key="index"
          :board="board"
          :index="index"
        ></NavBarLink>
        <li class="nav-item d-flex align-items-center ps-1">
          <!-- <i class="bi bi-card-list me-3 create"></i> -->
          <button type="button" class="btn border-0 ps-0" @click="open = true">
            <i class="bi bi-card-list create ps-1"
              ><span class="ms-3 fst-normal">+Create new board</span></i
            >
          </button>
        </li>
        <Transition>
          <Modal v-if="open" ref="target">
            <template #header>
              <p class="fw-semibold">Create New Board</p>
            </template>
            <template #body>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  v-model="name"
                />
              </div>
              <div class="d-grid">
                <button
                  :disabled="!name"
                  @click="onCreate"
                  type="button"
                  class="btn theme-btn text-light"
                >
                  Save changes
                </button>
              </div>
            </template>
          </Modal>
        </Transition>
      </ul>
      <div
        :class="[
          `nav-item container-fluid mb-3 d-grid theme-text-first-${boardsStore.settings.theme}`,
        ]"
      >
        <button
          @click="toggleTheme"
          :class="[
            `btn togle mb-3 theme-text-first-${boardsStore.settings.theme} d-flex align-items-center justify-content-center theme-second-${boardsStore.settings.theme}`,
          ]"
        >
          <i class="bi bi-brightness-high-fill"></i>

          <i v-if="!theme" class="bi bi-toggle-off fs-4"></i
          ><i v-else class="bi bi-toggle-on fs-4"></i>

          <i class="bi bi-moon-stars-fill"></i>
        </button>
        <p class="d-none d-lg-block" @click="$emit('hide')">
          <button class="btn">
            <i class="bi bi-eye-slash"></i
            ><span :class="[`theme-text-first-${boardsStore.settings.theme}`]"
              >Hide Sidebar</span
            >
          </button>
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup>
import NavBarLink from "./NavBarLink.vue";
import Modal from "./Modal.vue";
import { onMounted, ref } from "vue";
import { useBoards } from "./boards";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";

const boardsStore = useBoards();

const open = ref(false);
const name = ref("");
const target = ref(null);
const theme = ref(false);

const router = useRouter();

onMounted(() => {
  if (boardsStore.settings.theme === "light") {
    theme.value = false;
  } else {
    theme.value = true;
  }
});

onClickOutside(target, () => ((open.value = false), (name.value = "")));

function onCreate() {
  boardsStore.$patch((state) => {
    state.boards.push({
      name: name.value,
      tasks: [],
    });
    state.hasChanged = true;
  });
  name.value = "";
  open.value = false;
  goToPage();
}

function toggleTheme() {
  if (boardsStore.settings.theme === "light") {
    boardsStore.settings.theme = "dark";
    theme.value = true;
  } else {
    boardsStore.settings.theme = "light";
    theme.value = false;
  }
}

function goToPage() {
  router.push({ path: `/${boardsStore.boards.length - 1}` });
}
</script>

<style scoped>
.task-modal {
  position: fixed;
  top: 15rem;
}
.bi {
  margin: 0 15px;
  color: #8c8c8c;
}
.create,
.bi-toggle-on {
  color: #605cbd;
}
.create:hover {
  color: #5f5cbdcd;
}
.togle:hover {
  background-color: #605cbd30;
}
.theme-btn {
  background-color: #605cbd;
}
.theme-btn:hover {
  background-color: #5f5cbdcd;
}

.theme-btn:disabled {
  background-color: #5f5cbd85;
}
</style>
