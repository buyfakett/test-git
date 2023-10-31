<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        >{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>
<script setup>

</script>


<style scoped lang="scss">

</style>