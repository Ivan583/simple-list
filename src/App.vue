<template>
  <div id="app">
    <h1>Список задач</h1>
    <AddTask @add-task="addTask" />

    <select v-model="statusFilter">
      <option value="all">Все</option>
      <option value="pending">На очереди</option>
      <option value="in work">В работе</option>
      <option value="completed">Выполненные</option>
    </select>
    <label data-tooltip="Введите заголовок или его часть и кликните вне поля ввода">Title</label>
    <input type="text" placeholder="наведитесь на label" v-model.lazy="titleFilter" />
    <hr />
    <TaskList
      v-if="filteresTasks.length"
      :items="filteresTasks"
      @start-task="startTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
      @edit-task="editTask"
      @new-data="newData"
    />
    <h2 v-else>Все задачи выполнены</h2>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";
import { filterStatuses } from "@/constants";

export default {
  data() {
    return {
      tasks: [],
      statusFilter: filterStatuses.ALL,
      filterStatuses,
      titleFilter: ""
    };
  },
  components: { TaskList, AddTask },

  computed: {
    filteresTasks() {
      return this.tasks
        .filter(t =>
          this.statusFilter === filterStatuses.ALL
            ? t
            : t.stage === this.statusFilter
        )
        .filter(t => t.title.includes(this.titleFilter));
    }
  },

  methods: {
    addTask(elem) {
      this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    startTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "in work" } : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    finishTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "completed" } : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    editTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, editing: true } : el
      );
    },
    newData(el) {
      const id = el.id;
      const title = el.title;
      const description = el.description;

      this.tasks = this.tasks.map(p =>
        p.id === id ? { ...p, title, description, editing: false } : p
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  },

  mounted() {
    try {
      const data = localStorage.getItem("tasks");
      data ? (this.tasks = JSON.parse(data)) : null;
    } catch (err) {
      if (err == QUOTA_EXCEEDED_ERR) {
        alert("quota exceeded");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  text-align: center;
  color: blue;
  margin: 40px auto 0;
}
</style>

<style scoped>
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  width: 250px;
  left: 0;
  top: 0;
  padding: 0.5em;
  color: #fff;
  background-color: blueviolet;
  pointer-events: none;
  opacity: 0;
  transition: 1s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  top: 2em;
}
</style>
