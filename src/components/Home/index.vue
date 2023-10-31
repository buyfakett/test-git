<template>
  <div class="hello">
      <Header/>
      <el-container class="content">
          <Menu/>
      <el-container>
        <el-main>
          <Bread/>
          <div class="cont">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer><Footer/></el-footer>
      </el-container>
      </el-container>

  </div>
</template>


<script>
import Menu from "@/common/view/Menu";
import Footer from "@/common/view/Footer";
import Header from "@/common/view/Header";
import Bread from "@/common/view/Breadcrumb";

export default {
  components: {
    Header,
    Footer,
    Menu,
    Bread,
  },
  data() {
    return{

    }
  },
  methods: {

  }
}
</script>


<style lang="scss">
.hello {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top:60px;
    bottom: 0;
    .cont{
      margin: 10px 0;
    }
  }
}

</style>
