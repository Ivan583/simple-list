<template>
  <ul>
    <TaskItem
      v-for="item in items"
      :key="item.id"
      :elem="item"
      @start-task="startTask"
      @finish-task="finishTask"
    />
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
    },
    finishTask(id) {
      this.$emit("finish-task", id);
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
