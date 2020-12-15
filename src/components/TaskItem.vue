<template>
  <li>
    <div v-if="!elem.editing" class="container">
      <div class="left">
        <button class="button start" @click="$emit('start-task', elem.id)">Start</button>
        <button class="button finish" @click="$emit('finish-task', elem.id)">Finish</button>
      </div>

      <div class="right">
        <button class="button edit" @click="$emit('edit-task', elem.id)">Edit</button>
        <button class="button delete" @click="$emit('remove-task', elem.id, elem.stage )">Delete</button>
      </div>

      <div class="row" :class="{work: inProgress(elem), done: isCompleted(elem)}">
        <div class="index">
          <span>{{ index + 1 }}</span>
        </div>

        <div class="date">
          <span>{{ localDate }}</span>
        </div>

        <div class="title">
          <span>{{ elem.title }}</span>
        </div>

        <div class="description">
          <span>{{ elem.description }}</span>
        </div>
      </div>
    </div>
    <div v-else class="edit-data">
      <input type="text" class="title" />
      <input type="text" class="text" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    },
    index: Number
  },

  methods: {
    inProgress(myStage) {
      return myStage.stage === "in work";
    },
    isCompleted(myStage) {
      return myStage.stage === "completed";
    }
  },

  computed: {
    localDate() {
      return new Date().toLocaleString();
    }
  }
};
</script>

<style scoped>
li,
.container,
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.container {
  min-width: 100%;
  border: 1px solid green;
  padding: 0.5rem 2rem 0;
}

.row {
  line-height: 1.5rem;
  text-align: left;
  margin-left: 0.5rem;
  order: 2;
}

.edit-data {
  width: 100%;
}

input {
  font-size: 1.1rem;
  border: 1px solid blue;
  margin-right: 1rem;
  margin-bottom: 0.3rem;
  width: 100%;
}

@media (min-width: 550px) {
  input.title {
    width: 30%;
  }

  input.text {
    width: 60%;
  }
}

.work {
  color: green;
}

.done {
  color: black;
  text-decoration: line-through;
}

.index {
  width: 35px;
}

.button {
  font-size: 1rem;
  font-weight: bold;
  width: 65px;
  margin-right: 0.3rem;
  margin-bottom: 0.5rem;
  color: white;
  cursor: pointer;
}

.start {
  background-color: green;
}

.finish {
  background-color: blue;
}

.edit {
  background-color: blueviolet;
}

.delete {
  background-color: red;
}

span {
  margin-right: 1rem;
  font-weight: bold;
}

@media (min-width: 1024px) {
  .right {
    order: 2;
    margin-left: auto;
  }

  .row {
    order: 1;
  }

  .button {
    margin-right: 0.5rem;
  }

  .delete {
    margin-right: 0;
  }

  .description {
    flex: 1;
  }
}
</style>
