<template>
  <div class="home">
    <h1 class="title">All-in-One Task Management</h1>
    <h3>Organiza & Get Things Done</h3>
    <br />
    <button class="button is-primary" @click.prevent="signInWithGoogle">Login Here!</button>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig.js";

export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    signInWithGoogle() {
      auth
        .signInWithRedirect(provider)
        .then((response) => {
          this.user = response.user;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.home {
  background-color: white;
  border-radius: 10px;
  padding: 80px 50px;
  margin: 15% auto;
  text-align: center;
  width: 60%;
}
</style>
