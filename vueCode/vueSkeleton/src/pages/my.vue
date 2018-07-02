<template>
  <div class="index">
    我的
    <br>
    <router-link to="/index">去首页页面</router-link>
  </div>
</template>

<script>
  export default {
    name: "my"
  }
</script>

<style scoped>
  .index {
    font-size: 20px;
    color: teal
  }
</style>
