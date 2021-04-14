<template>
  <div class="done">
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
        <TodoList
          :uid="user.uid"
          :categories="settings[0].categories"
          :done="true"
          :category="category"
        />
      </div>
    </div>
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
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/")
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.done {
  margin: 20px;
}

.logout {
  font-size: 16px;
  margin: 10px;
}
</style>
