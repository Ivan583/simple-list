<template>
  <li>
    <div class="button-left">
      <button class="button start">Start</button>
      <button class="button finish">Finish</button>
    </div>

    <div class="button-right">
      <button class="button edit">Edit</button>
      <button class="button delete">Delete</button>
    </div>

    <div class="row">
      <div class="index">
        <span>{{ elem.id }}</span>
      </div>

      <div class="title">
        <span>{{ elem.title }}</span>
      </div>

      <div class="description">
        <span>{{ elem.description }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    }
  }
};
</script>
