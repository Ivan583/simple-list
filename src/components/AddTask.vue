<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend>Новая задача</legend>
      <input type="text" />
      <input type="text" />
      <button v-show="false" type="submit"></button>
    </fieldset>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      console.log("Submit");
    }
  }
};
</script>
