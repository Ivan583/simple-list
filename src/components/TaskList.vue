<template>
  <ul>
    <TaskItem />
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
export default {
  components: { TaskItem }
};
</script>

<style scoped>
/* ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
} */
</style>
