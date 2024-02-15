<template>
  <li
    :class="[
      `list-group-item d-flex justify-content-between align-items-start mb-3 theme-first-${boardsStore.settings.theme} border-0`,
    ]"
    @click="open = true"
  >
    <div :class="[`theme-text-first-${boardsStore.settings.theme}`]">
      <div :class="[`fw-bold theme-text-second-${boardsStore.settings.theme}`]">
        {{ task.title }}
      </div>
      {{ boardsStore.completedSubtasks(task) }} of
      {{ task.subtasks.length }} completed
    </div>

    <Teleport to="body">
      <Transition>
        <div v-if="open" class="my-modal-overlay">
          <Modal ref="target">
            <template #header>
              <h4 class="fw-semibold">{{ task.title }}</h4>
              <div class="btn-group dropstart">
                <button
                  :class="[
                    `btn border-0 fs-4 theme-text-second-${boardsStore.settings.theme}`,
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
                  <li @click="onEdit">
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
            </template>

            <template #body>
              <div
                :class="[`mb-3 theme-text-first-${boardsStore.settings.theme}`]"
              >
                {{ task.description }}
              </div>
              <div
                :class="[
                  `mb-3 theme-second-${boardsStore.settings.theme} p-3 rounded`,
                ]"
              >
                <label for="exampleInputEmail1" class="form-label fw-semibold"
                  >Subtasks</label
                >
                <div v-for="sub in task.subtasks" class="form-check">
                  <label
                    :class="[
                      sub.checked
                        ? 'form-check-label text-decoration-line-through text-secondary'
                        : 'form-check-label',
                    ]"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      v-model="sub.checked"
                    />
                    {{ sub.subtaskName }}
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select
                  :class="[
                    `form-select theme-select-${boardsStore.settings.theme}`,
                  ]"
                  aria-label="Default select example"
                  v-model="task.status"
                  @change="open = false"
                >
                  <option disabled value="">Please select one</option>
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </template>
          </Modal>
        </div>
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition>
        <div v-if="edit" class="my-modal-overlay">
          <EditTask :task="task" @close="edit = false" />
        </div>
      </Transition>
    </Teleport>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import Modal from "./Modal.vue";
import { useBoards } from "./boards";
import EditTask from "./EditTask.vue";

const boardsStore = useBoards();

const { task, index } = defineProps(["task", "index"]);

const target = ref(null);
const open = ref(false);
const edit = ref(false);

onClickOutside(target, () => (open.value = false));

function onDelete() {
  open.value = false;
  boardsStore.removeTask(task, index);
}

function onEdit() {
  open.value = false;
  edit.value = true;
}
</script>

<style scoped>
.drop {
  background-color: #605cbd;
}
</style>
