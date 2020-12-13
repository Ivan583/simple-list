<template>
  <ul>
    <TaskItem />
    {{ items }}
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
export default {
  props: ["items"],
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
