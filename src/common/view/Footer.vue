<template>
  <div class="Footer">
    <el-card>
      Powered by <a href="https://github.com/buyfakett">buyfakett</a> @2023
    </el-card>
  </div>

</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>
<style lang="scss">
.Footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-left: -20px;
  z-index: 999;
  .el-card{
    a{
      color: skyblue;
    }
  }
}

</style>