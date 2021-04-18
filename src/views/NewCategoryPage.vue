<template>
  <div class="todos">
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

      <div class="column category-form">
        <div>
          <div class="field">
            <label class="label">Category Name</label>
            <div class="control">
              <input
                v-model="category"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button @click="addCategory" class="button is-link">Add</button>
            </div>
          </div>
        </div>

        <br />

        <div>
          <div class="field">
            <label class="label">Delete Category</label>
            <div class="control">
              <div class="select">
                <select v-model="categoryToDelete">
                  <option
                    v-for="category in settings[0].categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button @click="deleteCategory" class="button is-link">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { auth, db } from "@/firebaseConfig.js";

export default {
  name: "Todos",
  components: { Menu },
  //   props: ["category"],
  data() {
    return {
      user: null,
      settings: [],
      category: "",
      categoryToDelete: "",
    };
  },
  beforeCreate() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    addCategory() {
      if (this.settings[0].categories) {
        this.settings[0].categories.push(this.category);
      } else {
        this.settings[0].categories = [this.category];
      }
      db.collection("settings").doc(this.user.uid).set(this.settings[0]);
      this.category = "";
    },
    deleteCategory() {
      const index = this.settings[0].categories.indexOf(this.categoryToDelete);
      this.settings[0].categories.splice(index, 1);
      db.collection("settings").doc(this.user.uid).set(this.settings[0]);
      this.categoryToDelete = "";
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

.category-form {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  font-size: 16px;
}

.logout {
  font-size: 16px;
  margin: 10px;
}
</style>
