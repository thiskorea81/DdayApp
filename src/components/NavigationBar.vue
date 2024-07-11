<template>
  <nav class="navigation-bar">
    <router-link to="/">Input</router-link>
    <router-link to="/result">Result</router-link>
    <router-link to="/jungwon">Jungwon</router-link>
    <router-link to="/yeolmae">Yeolmae</router-link>
    <router-link to="/camera">Camera</router-link>
  </nav>
</template>

<style scoped>
.navigation-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  padding: 10px 0;
  border-top: 1px solid #ccc;
}
.navigation-bar a {
  text-decoration: none;
  color: #007bff;
}
.navigation-bar a:hover {
  text-decoration: underline;
}
</style>
