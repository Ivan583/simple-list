<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Новая задача</legend>
      <input type="text" v-model="title" class="title" placeholder="Введите title" />
      <input
        type="text"
        v-model="description"
        class="description"
        placeholder="Введите description"
      />
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

<style scoped>
form {
  max-width: 500px;
  margin: 10px auto 20px;
}
fieldset,
input {
  border: 2px solid green;
}
input {
  display: block;
  font-size: 1.1rem;
  margin: 0 auto 0.7rem;
}
.title {
  width: 60%;
}
.description {
  width: 90%;
  margin-bottom: 0;
}
</style>
