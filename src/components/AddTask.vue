<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Новая задача</legend>
      <input type="text" v-model="title" />
      <input type="text" v-model="description" />
      <button v-show="false" type="submit"></button>
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.title.trim() && this.description.trim()) {
        const newTask = {
          id: Date.now().toLocaleString(),
          title: this.title,
          description: this.description,
          stage: "pending",
          editing: false
        };
        this.$emit("add-task", newTask);
        this.title = this.description = "";
      }
    }
  }
};
</script>
