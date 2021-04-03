<template>
  <div class="todo-item container">
    <div class="field">
      <div class="control">
        <input
          class="input is-primary"
          type="text"
          placeholder="New To-Do"
          v-model="todo.title"
          required
        />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Notes"
          v-model="todo.notes"
        ></textarea>
      </div>
    </div>

    <div v-if="!category" class="field">
      <div class="control">
        <div class="select">
          <select v-model="todo.category">
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
              :selected="category == todo.category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-else class="field">
      <div class="control">
        <div class="select">
          <select>
            <option :value="category" :selected="true">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button @click="saveTodo" class="button is-warning">Save</button>
      </div>
      <div v-if="!todo.done" class="control">
        <button @click="toggleTodo(todo)" class="button is-success">
          Mark as Done!
        </button>
      </div>
      <div v-else class="control">
        <button @click="toggleTodo(todo)" class="button is-danger">
          Mark as Not Done!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";

export default {
  name: "TodoItem",
  props: ["id", "categories", "uid", "toggleTodo", "category"],
  data() {
    return {
      todo: {
        title: "",
        notes: "",
        category: "School",
      },
    };
  },
  firestore() {
    if (this.id) {
      return {
        todo: db.collection("todos").doc(this.id),
      };
    }
  },
  methods: {
    saveTodo() {
      if (!this.id) {
        // on /todos route
        if (!this.category) {
          const newTodo = {
            category: this.todo.category,
            created: Date.now(),
            done: false,
            notes: this.todo.notes,
            title: this.todo.title,
            uid: this.uid,
          };
          db.collection("todos").add(newTodo);
          this.todo.title = "";
          this.todo.notes = "";
        } else {
          const newTodo = {
            category: this.category,
            created: Date.now(),
            done: false,
            notes: this.todo.notes,
            title: this.todo.title,
            uid: this.uid,
          };
          db.collection("todos").add(newTodo);
          this.todo.title = "";
          this.todo.notes = "";
        }
      } else {
        // on todo/:id route
        const newTodo = {
          category: this.todo.category,
          created: Date.now(),
          done: false,
          notes: this.todo.notes,
          title: this.todo.title,
          uid: this.uid,
          id: this.id,
        };
        db.collection("todos").doc(this.id).set(newTodo);
        this.$router.push("/todos");
      }
    },
  },
};
</script>

<style scoped>
.todo-item {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
}
</style>
