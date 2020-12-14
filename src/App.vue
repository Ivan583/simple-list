<template>
  <div id="app">
    <h1>Список задач</h1>
    <AddTask @add-task="addTask" />
    <hr />
    <TaskList
      v-if="tasks.length"
      :items="tasks"
      @start-task="startTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
    />
    <h2 v-else>Все задачи выполнены</h2>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";

export default {
  data() {
    return {
      tasks: []
    };
  },
  components: { TaskList, AddTask },

  methods: {
    addTask(elem) {
      this.tasks.push(elem);
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
