<template>
  <Modal>
    <template #header>
      <h3>Create Task</h3>
      <button
        type="button"
        :class="[
          `btn theme-text-second-${boardsStore.settings.theme} border-0 fs-4`,
        ]"
        aria-label="Close"
        @click.prevent="onCancel"
      >
        x
      </button>
    </template>
    <template #body>
      <div class="mb-3">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="email"
          :class="[
            `form-control bg-${boardsStore.settings.theme} text-${text} bg-opacity-25`,
          ]"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="e.g. Take coffee break"
          v-model="title"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          :class="[
            `form-control bg-${boardsStore.settings.theme} text-${text} bg-opacity-25`,
          ]"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
          v-model="description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Subtasks</label>
        <div
          class="input-group mb-3"
          v-for="(item, index) in subtasks"
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
              placeholder="e.g. Make coffee"
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
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Status</label>
        <select
          :class="[`form-select theme-select-${boardsStore.settings.theme}`]"
          aria-label="Default select example"
          v-model="status"
        >
          <option disabled value="">Please select one</option>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div :class="[checkEmpty ? 'd-grid' : 'd-grid mb-3']">
        <button
          :disabled="checkEmpty"
          class="btn create rounded-pill"
          @click.prevent="onCreate"
        >
          Create task
        </button>
        <p class="notice" v-if="checkEmpty">Fields can not be empty</p>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import { ref, computed, onMounted } from "vue";
import { useBoards } from "./boards";

const boardsStore = useBoards();
const emit = defineEmits(["close"]);
const { index } = defineProps(["index"]);

const text = ref("dark");

onMounted(() => {
  if (boardsStore.settings.theme === "dark") {
    text.value = "light";
  } else {
    text.value = "dark";
  }
});

let title = ref("");
let description = ref("");
let subtasks = ref([{ subtaskName: "", checked: false }]);
let status = ref("");

function clearValues() {
  title.value = "";
  description.value = "";
  subtasks.value = [{ subtaskName: "", checked: false }];
  status.value = "";
}

const checkEmpty = computed(() => {
  for (let i of subtasks.value) {
    if (!i.subtaskName) {
      return true;
    }
  }
  return !title || !description || !status.value;
});

function onCreate() {
  boardsStore.addTask(
    title.value,
    description.value,
    subtasks.value,
    status.value,
    index
  );
  clearValues();
  emit("close");
}

function onCancel() {
  clearValues();
  emit("close");
}

function addRow() {
  subtasks.value.push({ subtaskName: "", checked: false });
}

function deleteRow(index) {
  if (subtasks.value.length === 1) {
    return;
  }
  subtasks.value.splice(index, 1);
}
</script>

<style scoped>
.task-modal {
  top: 1rem;
}
.create {
  background-color: #605cbd;
  color: #fff;
}
.create:hover {
  background-color: #5f5cbdcd;
  color: #fff;
}

.btn:disabled {
  background-color: #5f5cbd85;
  color: #fff;
}
input::placeholder,
textarea::placeholder {
  color: #8c8c8c;
  font-size: 12px;
}
</style>
