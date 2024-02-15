<template>
  <div
    :class="[
      `col-xs-12 col-lg-9 p-0 theme-second-${boardsStore.settings.theme}`,
    ]"
  >
    <div :class="[`container-fluid theme-first-${boardsStore.settings.theme}`]">
      <nav
        :class="[
          `navbar navbar-${boardsStore.settings.theme} theme-text-second-${boardsStore.settings.theme} d-lg-none`,
        ]"
      >
        <div class="container-fluid justify-content-start">
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
          <h3 class="ms-3 fw-semibold">Create New Board!</h3>
        </div>
      </nav>

      <div
        class="offcanvas offcanvas-start w-75"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <NavBar />
      </div>
    </div>
    <div
      :class="[
        `container  mt-5 theme-text-first-${boardsStore.settings.theme}`,
      ]"
    >
      <div class="row justify-content-start ms-3 mb-5">
        <p class="col-7 fw-semibold shadow-sm">
          Unleash your productivity beast! Create and dominate your personalized
          boards for tasks of all sizes: the tiniest to-do, the most epic
          project.
        </p>
      </div>
      <div class="row justify-content-center mb-5">
        <p class="col-7 fw-semibold shadow-sm">
          Visualize your progress like a boss with clear categories: To Do,
          Crushing It, Done! Break down mountains of work into bite-sized
          subtasks – conquer them one by one with laser focus! And express your
          unique style? Absolutely!
        </p>
      </div>
      <div class="row justify-content-end me-3">
        <p class="col-7 fw-semibold shadow-sm">
          Customize your theme to match your fiery personality. Don't just
          manage your tasks, crush them with glee! Dive in and experience the
          organization revolution!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import { useBoards } from "./boards";

const boardsStore = useBoards();
</script>
