<template>
  <div class="todo">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="logout">
          <button @click.prevent="signOut" class="button">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span>Log out</span>
            </span>
          </button>
        </div>
        <Menu :uid="user.uid" :categories="settings[0].categories" />
      </div>
      <div class="column">
        <TodoItem
          :id="id"
          :categories="settings[0].categories"
          :uid="user.uid"
          :toggleTodo="toggleTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import TodoItem from "@/components/TodoItem.vue";
import { auth, db } from "@/firebaseConfig.js";

export default {
  name: "Todo",
  components: { Menu, TodoItem },
  props: ["id"],
  data() {
    return {
      user: { uid: "" },
      settings: [{ categories: ["School", "Work", "Home"] }],
    };
  },
  beforeCreate() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind(
          "settings",
          db.collection("settings").where("uid", "==", user.uid)
        );
      },
    },
  },
  methods: {
    toggleTodo(todo) {
      todo.done = !todo.done;
      db.collection("todos").doc(todo.id).set(todo);
    },
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.todo {
  margin: 20px;
}

.logout {
  font-size: 16px;
  margin: 10px;
}
</style>
