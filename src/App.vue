<template>
  <div id="app">
    <h1>Список задач</h1>
    <AddTask @add-task="addTask" />

    <form>
      <fieldset>
        <legend>Сортировка и фильтры</legend>

        <label>Status</label>
        <select v-model="statusFilter">
          <option value="all">Все</option>
          <option value="pending">На очереди</option>
          <option value="in work">В работе</option>
          <option value="completed">Выполненные</option>
        </select>

        <label data-tooltip="Введите заголовок или его часть и кликните вне поля ввода">Title</label>
        <input
          type="text"
          class="title"
          placeholder="наведитесь на label"
          v-model.lazy="titleFilter"
        />
        <div class="sort">
          <div>
            <input type="radio" :value="order.date" v-model="order.method" id="date" />
            <label for="date">По дате</label>
          </div>
          <div>
            <input type="radio" :value="order.title" v-model="order.method" id="title" />
            <label for="title">По заголовку</label>
          </div>
          <div>
            <input type="radio" :value="order.status" v-model="order.method" id="status" />
            <label for="status"></label>По статусу
          </div>
        </div>
      </fieldset>
    </form>

    <hr />
    <TaskList
      v-if="filteredTasks.length"
      :items="filteredTasks"
      @start-task="startTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
      @edit-task="editTask"
      @new-data="newData"
    />
    <h2 v-else>Все задачи выполнены</h2>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";
import { filterStatuses, sortStatuses } from "@/constants";

export default {
  data() {
    return {
      tasks: [],
      statusFilter: filterStatuses.ALL,
      filterStatuses,
      titleFilter: "",
      sortStatuses,
      order: {
        method: sortStatuses.BY_DATE,
        date: sortStatuses.BY_DATE,
        title: sortStatuses.BY_TITLE,
        status: sortStatuses.BY_STATUS
      }
    };
  },
  components: { TaskList, AddTask },

  computed: {
    filteredTasks() {
      return this.tasks
        .filter(t =>
          this.statusFilter === filterStatuses.ALL
            ? t
            : t.stage === this.statusFilter
        )
        .filter(t => t.title.includes(this.titleFilter));
    }
  },

  methods: {
    addTask(elem) {
      this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    startTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "in work" } : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    finishTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, stage: "completed" } : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    editTask(id) {
      this.tasks = this.tasks.map(el =>
        el.id === id ? { ...el, editing: true } : el
      );
    },
    newData(el) {
      const id = el.id;
      const title = el.title;
      const description = el.description;

      this.tasks = this.tasks.map(p =>
        p.id === id ? { ...p, title, description, editing: false } : p
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  },

  mounted() {
    try {
      const data = localStorage.getItem("tasks");
      data ? (this.tasks = JSON.parse(data)) : null;
    } catch (err) {
      if (err == QUOTA_EXCEEDED_ERR) {
        alert("quota exceeded");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  text-align: center;
  color: blue;
  margin: 40px auto 0;
}
</style>

<style scoped>
form {
  max-width: 500px;
  margin: -10px auto 20px;
}

fieldset,
select,
input {
  border: 2px solid green;
  font-size: 1rem;
}

select {
  margin-bottom: 0.3rem;
}

select,
label {
  margin-right: 0.5rem;
}

.sort {
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
}

@media (min-width: 380px) {
  .sort {
    flex-direction: row;
    justify-content: space-around;
  }
}

[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  width: 250px;
  left: 0;
  top: 0;
  padding: 0.5em;
  color: #fff;
  background-color: blueviolet;
  pointer-events: none;
  opacity: 0;
  transition: 1s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  top: 2em;
}
</style>
