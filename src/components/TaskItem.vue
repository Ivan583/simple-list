<template>
  <li>
    <div class="left">
      <button class="button start">Start</button>
      <button class="button finish">Finish</button>
    </div>

    <div class="right">
      <button class="button edit">Edit</button>
      <button class="button delete">Delete</button>
    </div>

    <div class="row" :class="{work: inProgress(elem)}">
      <div class="index">
        <span>{{ elem.id }}</span>
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
  </li>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    }
  },

  methods: {
    inProgress(myStage) {
      return myStage.stage === "in work";
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
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-bottom: 0.75rem;
}

.row {
  line-height: 1.5rem;
  text-align: left;
  margin-left: 0.5rem;
  order: 2;
}

.work {
  color: green;
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
