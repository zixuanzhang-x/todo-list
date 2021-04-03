<template>
  <div class="todos">
    <div class="columns">
      <div class="column is-one-quarter">
        <Menu :uid="user.uid" :categories="settings[0].categories" />
      </div>
      <div class="column">
        <TodoList
          :uid="user.uid"
          :categories="settings[0].categories"
          :done="false"
          :category="category"
        />
      </div>
    </div>
    <p>{{ category }}</p>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import TodoList from "@/components/TodoList.vue";
import { auth, db } from "@/firebaseConfig.js";

export default {
  name: "Todos",
  components: { Menu, TodoList },
  props: ["category"],
  data() {
    return {
      user: null,
      settings: [],
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
};
</script>

<style scoped>
.todos {
  margin: 20px;
}
</style>
