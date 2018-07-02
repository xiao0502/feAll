<template>
    <div class="index">
      首页
      <br>
      <router-link to="/my">去我的页面</router-link>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .index {
    font-size: 20px;
    color: red
  }
</style>
