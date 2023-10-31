<template>
  <div class="login">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>rsspush后台管理</span>
      </div>

      <el-form label-width="80px" :model="form" ref="from" :rules=rule>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="login('from')">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button type="warning" @click="register()" class="register">注册</el-button>
  </div>
</template>

<script>
import { phonerule, passrule } from '@/utils/vaildate'
import { setToken } from '@/utils/setToken'
import { login } from "@/api/user";

export default {

  data() {
    return {
      form: {
        phone: '13333333333',
        password: 'admin123456'
      },
      rule: {
        phone: [{ validator: phonerule, trigger: 'blur' }],
        password: [{ validator: passrule, trigger: 'blur' }]
      }
    };
  },
  methods: {
    register(){
      this.$router.push('/register')
    },
    login(from) {
      this.$refs[from].validate((valid) => {
        if(valid){
          login(this.form).then((res) =>{
            if (res.code === 0){
                setToken(res.data.token)
                this.$router.push('/admin')
            }
          })
        }else {
          console.error(this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #409eff;
  .box-card{
    width: 450px;
    margin: 200px auto;
    .el-card__header{
      font-size:34px;
    }
    .el-button{
      width:100%;
      height: 100%;
      border-radius: 50px;
      text-align: center;
    }
  }

}
.register{
  margin-left: -50px;
  height: 60px;
  width: 140px;
  background-color: orange;
}

</style>