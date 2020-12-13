<template>
  <div id="app">
    <h1>Список задач</h1>
    <hr />
    <TaskList :items="tasks" />
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
  components: { TaskList }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
