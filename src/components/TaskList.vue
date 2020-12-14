<template>
  <ul>
    <TaskItem
      v-for="(item, index) in items"
      :key="item.id"
      :elem="item"
      :index="index"
      @start-task="startTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
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
    },
    removeTask(id, stage) {
      if (stage === "completed") this.$emit("remove-task", id);
      else alert("Задача не выполнена!");
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
