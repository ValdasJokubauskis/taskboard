<template>
  <Modal>
    <template #header>
      <h3>Edit</h3>
    </template>
    <template #body>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input
          type="email"
          :class="[
            `form-control bg-${boardsStore.settings.theme} text-${text} bg-opacity-25`,
          ]"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="task.title"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Description</label
        >
        <textarea
          :class="[
            `form-control bg-${boardsStore.settings.theme} text-${text} bg-opacity-25`,
          ]"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="task.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Subtasks</label>
        <div
          class="input-group mb-3"
          v-for="(item, index) in task.subtasks"
          :key="index"
        >
          <div class="col-11 d-flex align-items-center">
            <input
              type="email"
              :class="[
                `form-control bg-${boardsStore.settings.theme} text-${text} bg-opacity-25`,
              ]"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="item.subtaskName"
            />
          </div>
          <div class="col-1">
            <button
              @click="deleteRow(index)"
              type="button"
              :class="[
                `btn theme-text-second-${boardsStore.settings.theme} border-0 fs-4`,
              ]"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>
      </div>
      <div class="d-grid mb-3">
        <button
          @click="addRow"
          :class="[
            `btn bg-${text} text-${boardsStore.settings.theme} rounded-pill`,
          ]"
          type="button"
        >
          +Add New Subtask
        </button>
      </div>
      <div class="d-grid">
        <button
          :disabled="checkEmpty"
          class="btn edit rounded-pill"
          @click.prevent="onUpdate"
        >
          Save and Exit
        </button>
        <p class="notice" v-if="checkEmpty">Fields can not be empty</p>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Modal from "./Modal.vue";
import { useBoards } from "./boards";

const boardsStore = useBoards();

const text = ref("dark");

onMounted(() => {
  if (boardsStore.settings.theme === "dark") {
    text.value = "light";
  } else {
    text.value = "dark";
  }
});

const { task } = defineProps(["task"]);

const emit = defineEmits(["close"]);

function onUpdate() {
  emit("close");
}

const checkEmpty = computed(() => {
  for (let i of task.subtasks) {
    if (!i.subtaskName) {
      return true;
    }
  }
  return !task.title || !task.description;
});

function addRow() {
  boardsStore.$patch((state) => {
    task.subtasks.push({
      subtaskName: "",
      checked: false,
    });
    state.hasChanged = true;
  });
}

function deleteRow(index) {
  if (task.subtasks.length === 1) {
    return;
  }
  boardsStore.$patch((state) => {
    task.subtasks.splice(index, 1);
    state.hasChanged = true;
  });
}
</script>

<style scoped>
.task-modal {
  top: 1rem;
}
.edit {
  background-color: #605cbd;
  color: #fff;
}
.edit:hover {
  background-color: #5f5cbdcd;
  color: #fff;
}
.btn:disabled {
  background-color: #5f5cbd85;
  color: #fff;
}
</style>
