<template>
  <div>
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <router-link to="/">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <span>Search</span>
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-clock"></i>
              </span>
              <span>Recent</span>
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/done">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-clipboard-check"></i>
              </span>
              <span>Done</span>
            </span>
          </router-link>
          <ul class="sublist">
            <li v-for="category in categories" :key="category">
              <router-link :to="'/done/' + category">
                {{ category }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/todos">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-tasks"></i>
              </span>
              <span>My Tasks</span>
            </span>
          </router-link>
        </li>
      </ul>

      <p class="menu-label">Categories</p>
      <ul class="menu-list">
        <li v-for="category in categories" :key="category">
          <router-link :to="'/todos/' + category">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-th-list"></i>
              </span>
              <span>{{ category }}</span>
            </span>
          </router-link>
        </li>

        <li>
          <router-link to="/newcategory">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add/Del Category</span>
            </span>
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
// import { db, auth } from "@/firebaseConfig.js";

export default {
  name: "Menu",
  components: {},
  props: ["uid", "categories"],
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  padding: 20px 30px;
  background-color: white;
  font-size: 16px;
}

.sublist {
  margin-left: 24px;
}
</style>
