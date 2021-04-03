<template>
  <div class="not-found">
    <p class="title">Page not found</p>
    <p class="subtitle">Please return to the todos page</p>
    <router-link to="/todos">
      <button class="button is-primary">Go Back</button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  margin: 10% auto;
  text-align: center;
  width: 30%;
}
</style>
