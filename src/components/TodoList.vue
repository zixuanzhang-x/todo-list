<template>
  <div class="todo-list">
    <li v-for="todo in todos" :key="todo.id">
      <span class="icon-text">
        <span v-if="!todo.done" @click="toggleTodo(todo)" class="icon">
          <i class="far fa-circle"></i>
        </span>
        <span v-else @click="toggleTodo(todo)" class="icon">
          <i class="fas fa-check-circle"></i>
        </span>
        <div>
          <router-link :to="'/todo/' + todo.id">
            <p class="subtitle is-5">{{ todo.title }}</p>
          </router-link>
          <p>{{ todo.notes }}</p>
          <p class="is-light is-rounded">Category: {{ todo.category }}</p>
        </div>
      </span>
    </li>
    <TodoItem
      v-if="!done"
      :categories="categories"
      :uid="uid"
      :category="category"
    />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import { db } from "@/firebaseConfig.js";

export default {
  name: "TodoList",
  components: { TodoItem },
  props: ["uid", "categories", "done", "category"],
  data() {
    return {
      todos: [],
    };
  },
  // computed: {
  //   sortedTodos() {
  //     let tempTodos = this.todos;
  //     return tempTodos.sort((x, y) => y.created - x.created);
  //   },
  // },
  // firestore() {
  //   return {
  //     todos: db
  //       .collection("todos")
  //       .where("uid", "==", "QtPz44U2CSNNfUKzwl3zj43UQkQ2")
  //       .where("done", "==", this.done),
  //   };
  // },
  methods: {
    toggleTodo(todo) {
      todo.done = !todo.done;
      db.collection("todos").doc(todo.id).set(todo);
      this.$forceUpdate();
    },
  },
  watch: {
    category: {
      immediate: true,
      handler(category) {
        if (category) {
          this.$bind(
            "todos",
            db
              .collection("todos")
              .where("uid", "==", this.uid)
              .where("done", "==", this.done)
              .where("category", "==", category)
          );
        } else {
          this.$bind(
            "todos",
            db
              .collection("todos")
              .where("uid", "==", this.uid)
              .where("done", "==", this.done)
          );
        }
      },
    },
  },
};
</script>

<style scoped>
.todo-list {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  font-size: 16px;
}

li {
  list-style-type: none;
  padding: 5px 0;
}
</style>
