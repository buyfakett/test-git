<template>
  <div class="Header">
    <el-header>
      <div class="title">
        rsspush后台管理
      </div>
      <el-dropdown>
      <div class="head-icon">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <i class="fa fa-caret-down"/>
      </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="change_passwd()">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="is_log_out()" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-dialog title="修改密码" :visible.sync="passwdFormVisible">
      <el-form :model="passwdForm" :rules=rule>
        <el-form-item label="旧密码：" label-width="100px">
          <el-input type="password" v-model="passwdForm.old_password" prop="old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" label-width="100px">
          <el-input type="password" v-model="passwdForm.password" prop="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" label-width="100px">
          <el-input type="password" v-model="passwdForm.checkPass" prop="checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="passwd_button(passwdForm)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="确定退出登录吗？"
        :visible.sync="logOutVisible"
        width="30%">
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="log_out()">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>

import { passrule } from "@/utils/vaildate";
import { reset_passwd } from "@/api/user";
import { removeToken, setToken } from "@/utils/setToken";
import { Message } from "element-ui";

export default {
  data(){
    return {
      passwdFormVisible: false,
      passwdForm: {
        old_password: "admin123456",
        password: "admin12345",
        checkPass: "admin12345",
      },
      rule: {
        old_password: [{ validator: passrule, trigger: 'blur' }],
        password: [{ validator: passrule, trigger: 'blur' }],
        checkPass: [{ validator: passrule, trigger: 'blur' }]
      },
      logOutVisible: false,
    };
  },
  methods: {
    change_passwd(){
      this.passwdFormVisible = true
    },
    passwd_button(passwdForm){
          if (passwdForm.password !== passwdForm.checkPass) {
            Message.error({message: '两次密码不一样', type: 'error'});
          } else {
            reset_passwd(passwdForm)
                .then(res => {
                  if (res.code === 0) {
                    this.passwdFormVisible = false
                    setToken(res.data.token)
                  }
                })
          }
    },
    is_log_out(){
      this.logOutVisible = true
    },
    log_out(){
      removeToken()
      this.$router.push('/login')
    },
  }
}
</script>
<style lang="scss">
.Header{
  .el-header{
    background-color: skyblue;
    line-height: 60px;
    display: flex;
    color: white;
    justify-content: space-between;
    .head-icon{
      cursor: pointer;
      width: 60px;
      height: 50px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .fa-caret-down{
        //margin-bottom: 10px;
        margin-left: 10px;
        color: black;
      }
    }
    .title{
      font-size: 24px;
      width: 200px;
    }
  }
}

</style>