<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url("assets/whitish.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
h1,
h2,
h3 {
  font-family: "Knewave", cursive;
}
</style>
