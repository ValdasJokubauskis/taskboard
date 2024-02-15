import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { data } from "./data";

const STORE_NAME = "boards";
const ID_NAME = "id";

export const useBoards = defineStore("boards", {
  state: () => ({
    boards: useStorage(STORE_NAME, data, localStorage, {
      mergeDefaults: true,
    }),
    settings: useStorage(ID_NAME, { id: 10, theme: "light" }, localStorage, {
      mergeDefaults: true,
    }),
  }),
  getters: {
    todoList: (state) => {
      return (index) =>
        state.boards[index].tasks.filter((s) => s.status == "Todo");
    },
    doingList: (state) => {
      return (index) =>
        state.boards[index].tasks.filter((s) => s.status == "Doing");
    },
    doneList: (state) => {
      return (index) =>
        state.boards[index].tasks.filter((s) => s.status == "Done");
    },
    getSingleBoard: (state) => {
      return (index) => state.boards[index];
    },
  },
  actions: {
    addTask(title, description, subtasks, status, index) {
      this.boards[index].tasks.push({
        id: this.settings.id++,
        title: title,
        description: description,
        subtasks: subtasks,
        status: status,
      });
    },
    removeTask(task, index) {
      this.boards[index].tasks = this.boards[index].tasks.filter(
        (el) => el !== task
      );
    },
    completedSubtasks(task) {
      let num = 0;
      for (let i in task.subtasks) {
        if (task.subtasks[i].checked) num++;
      }
      return num;
    },
  },
});
