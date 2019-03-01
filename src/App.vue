<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'APP'
}
</script>
<style lang="scss">
#app {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
