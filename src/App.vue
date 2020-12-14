<template>
  <div id="app">
    <h1>Список задач</h1>
    <hr />
    <TaskList :items="tasks" @start-task="startTask" @finish-task="finishTask" />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "продукты",
          description: "купить хлеб",
          stage: "pending",
          editing: false
        },
        {
          id: 2,
          title: "деловая",
          description: "сделать проект",
          stage: "in work",
          editing: false
        },
        {
          id: 3,
          title: "питомец",
          description: "купить корм",
          stage: "completed",
          editing: false
        }
      ]
    };
  },
  components: { TaskList },
  methods: {
    startTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "in work" } : el
      );
    },
    finishTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "completed" } : el
      );
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
