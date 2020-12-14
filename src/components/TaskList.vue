<template>
  <ul>
    <TaskItem v-for="item in items" :key="item.id" :elem="item" @start-task="startTask" />
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
export default {
  props: ["items"],
  components: { TaskItem },
  methods: {
    startTask(id) {
      this.$emit("start-task", id);
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
