<template>
  <div
    :class="[
      hidden
        ? `col-xs-12 col-lg-11 theme-second-${boardsStore.settings.theme} p-0`
        : `col-xs-12 col-lg-9 theme-second-${boardsStore.settings.theme} p-0`,
    ]"
    v-if="boardsStore.boards[index]"
  >
    <BoardHeader
      :board="getSingleBoard"
      :index="index"
      @delete="onDelete(index)"
    />
    <div class="container-fluid mt-3 me-1 ps-4 pe-4">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div :class="[`mb-3 theme-text-first-${boardsStore.settings.theme}`]">
            <i class="bi bi-circle-fill text-info"></i
            ><span class="col-name">TODO({{ todoList(index).length }})</span>
          </div>
          <ol class="list-group">
            <Task
              v-for="task in todoList(index)"
              :key="task.id"
              :task="task"
              :index="index"
            />
          </ol>
        </div>
        <div class="col-md-6 col-lg-4">
          <div :class="[`mb-3 theme-text-first-${boardsStore.settings.theme}`]">
            <i class="bi bi-circle-fill text-primary"></i
            ><span class="col-name">DOING({{ doingList(index).length }})</span>
          </div>
          <ol class="list-group">
            <Task
              v-for="task in doingList(index)"
              :key="task.id"
              :task="task"
              :index="index"
            />
          </ol>
        </div>
        <div class="col-xs-6 col-lg-4">
          <div :class="[`mb-3 theme-text-first-${boardsStore.settings.theme}`]">
            <i class="bi bi-circle-fill text-success"></i
            ><span class="col-name">DONE({{ doneList(index).length }})</span>
          </div>
          <ol class="list-group">
            <Task
              v-for="task in doneList(index)"
              :key="task.id"
              :task="task"
              :index="index"
            />
          </ol>
        </div>
      </div>
    </div>
  </div>
  <Home v-else />
</template>

<script setup>
import BoardHeader from "./BoardHeader.vue";
import Task from "./Task.vue";
import { storeToRefs } from "pinia";
import { useBoards } from "./boards.js";
import { useRouter } from "vue-router";
import Home from "./Home.vue";
import { inject } from "vue";

const hidden = inject("key");

const boardsStore = useBoards();
const { todoList, doingList, doneList, getSingleBoard } =
  storeToRefs(boardsStore);

defineProps(["index"]);

const router = useRouter();

function onDelete(index) {
  boardsStore.$patch((state) => {
    state.boards.splice(index, 1);
    state.hasChanged = true;
  });
  goToPage();
}

function goToPage() {
  router.push({ path: "/" });
}
</script>

<style scoped>
.col-name {
  letter-spacing: 3px;
  margin: 0 1rem;
}
</style>
