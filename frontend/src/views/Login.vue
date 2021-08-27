<template>
  <div id="Login" >
    <div id="top">
      <img src="" alt="">
      <button id="Register1" @click="Register1Clicked">注册</button>
      <button id="Home" @click="HomeClicked">返回首页</button>
    </div>
    <div id="mainBody">
      <div class="re_head">
        <h3>问卷星登录
        </h3>
      </div>
      <div class="reg_form">
        <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" style="margin-right:70px  ;">
          <span class="userLogo"></span>
          <el-form-item  prop="username" >
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>

          <span class="passwdLogo"></span>
          <el-form-item  prop="passwdLogo" style="margin-top: 30px" >
            <el-input v-model="loginForm.passwd" show-password placeholder="密码"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-button type="text" @click="dialog2FormVisible = true" id="findPwd">忘记密码？</el-button>
      <el-dialog title="重置密码" :visible.sync="dialog2FormVisible" style="width: 60%;margin-left: 19%">
        <el-form :model="form2" :rules="rules2">
          <el-form-item label="用户名" prop="username" :label-width="formLabelWidth" >
            <el-input v-model="form2.username" ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :label-width="formLabelWidth"
            :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ]"style="margin-top:25px  ;">
            <el-input v-model="form2.email" ></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPasswd">
            <el-input v-model="form2.newPasswd" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog2FormVisible = false">取 消</el-button>
          <el-button type="primary" @click="subChange2">确 定</el-button>
        </div>
      </el-dialog>

      <div class="confirmButton">
        <button class="loginBtn" @click="Login">登录 </button>
      </div>
      <div id="Register2"><router-link to="/Register" class="style_orange">立即注册</router-link></div>
    </div>
  </div>
</template>

<script>
import {request} from "../network/request";

export default {
  name: "Login",
  data(){
    return{
      isPwdOneOk:false,
      cname:'',
      loginForm: {
        username: '',
        passwd: '',
        //验证码
        code: '',
      },
      rules: {
        username: [
          {  message: '请输入用户名', trigger: 'blur' },
        ],
        passwd: [
          { pattern: /^[a-zA-Z0-9]{3,10}$/, message: '请确保密码在3到10个字符间，且只有数字与字母', trigger: 'blur' }
        ],
      },
      form2: {
      },
      formLabelWidth: '100px',
      dialog2FormVisible: false,
      rules2: {
        username: [
          {  required: true,message: '请输入用户名', trigger: 'blur' },
        ],
        newPasswd: [
          { required: true, message: '请输入新密码',  trigger: 'blur',}
        ],
      },
    }
  },
  methods:{

Login(){
      console.log(this.loginForm)
      // let par=new URLSearchParams();
      // par.append('username',this.loginForm.username);
      // par.append('password',this.loginForm.passwd);
      request({
        url: '/user/login/',
        method: 'post',
        data: {
          'username':this.loginForm.username,
          'password':this.loginForm.passwd
        }
      }).then( res=> {
        console.log(res);
        if (res.data.msg==='success'){
          this.$store.commit("login",this.loginForm.username,this.loginForm.passwd);
          this.$message({
            showClose: true,
            message: '登陆成功！',
            type: 'success'
          });
          window.sessionStorage.setItem('isLogin', 'true');
          window.sessionStorage.setItem('username', this.loginForm.username);
          window.sessionStorage.setItem('passwd', this.loginForm.passwd);
          request({
            url: '/user/getinfo/',
            method: 'post',
            data:{
              'username':this.loginForm.username
            }
          }).then(res2=>{
            this.$store.commit('getEmail',res2.data.userinfo.email);
            window.sessionStorage.setItem('email', res2.data.userinfo.email);
          })
          this.$router.push('/Management')
        }
        else if (res.data.msg==='认证失败,请检查账号密码是否正确'){
          this.$message({
            showClose: true,
            message: '登陆失败,请检查账号密码是否正确',
            type: 'warning'
          });
        }
      }).catch( err=> {
        console.log(err)
      })
    },
    Register1Clicked(){
      this.$router.push('/Register');
    },
    HomeClicked(){
      this.$router.push('/');
    },
    subChange2(){
      this.dialog2FormVisible = false;
      request({
        url: '/user/resetpassword/',
        method: 'post',
        data: {
          'username':this.form2.username,
          'email':this.form2.email,
          'newpassword':this.form2.newPasswd
        }
      }).then( res=> {
        if (res.data.msg==='用户名与邮箱不匹配'){
          this.$message({
            showClose: true,
            message: '用户名与邮箱不匹配！',
            type: 'warning'
          });
        }
        else if (res.data.msg==="success"){
          this.$message({
            showClose: true,
            message: '重置密码成功！',
            type: 'success'
          });
        }
        console.log(res.data)
      }).catch( err=> {
        console.log(err)
      })
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 添加背景色
  //   document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2')
  //   next()
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 去除背景色
  //   document.querySelector('body').setAttribute('style', '')
  //   next()
  // }

}
</script>

<style scoped>
@import "../assets/css/base.css";
#top{
  top: 0px;
  left: 0px;
  position: absolute;
  background-color: skyblue;
  height: 100px;
  width: 100%;
  box-shadow: 5px 5px 2px rgba(192,196,204,0.3);
}
#mainBody{
  display: block;
  position: absolute;
  background-color: white;
  top: 20%;
  height: 450px;
  width: 400px;
  left: 50%;
  margin-left: -200px;
  border-radius: 5%;
}
#mainBody:hover{
  box-shadow: 10px 10px 5px rgba(192,196,204,0.3);
  transition: all 0.2s ease-out;
}
#Register1{
  position: absolute;
  background-color: #8e9aaf;
  top: 20px;
  height: 40px;
  width: 80px;
  right: 12%;
  border-radius: 22px;
  font-size: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  color: white;
}
#Home{
  position: absolute;
  background-color: #8e9aaf;
  top: 20px;
  height: 40px;
  width: 120px;
  right: 2%;
  border-radius: 22px;
  font-size: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  color: white;
}
#Home:hover,#Register1:hover{
  border-width: 2px ;
  font-size: 17px;
  transition: all 0.2s ease-out ;
}
.re_head{
  margin:30px 0px 0px -240px;
  font-size: 17px;
  color: orange;
}
.reg_form{
  margin:30px 0px 0px -50px;
}
.loginBtn{
  display: block;
  width: 300px;
  height: 40px;
  margin-top: 60px;
  background-color: orange;
  font-size:16px ;
  color: white;
}
.loginBtn:hover{
  background-color: #eaa200;
}
#Register2{
  display: block;
  margin-top: 20px;
}
.style_orange{
  font-size:15px ;
  color: orange;
}
#findPwd{
  position: absolute;
  font-size: 15px;
  top:210px;
  right: 15%;
  color:gray;
  text-decoration:underline
}
span[class=userLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e968';
  top: 70px;
  left:50px;
}
span[class=passwdLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e97c';
  top: 140px;
  left:50px;
}
</style>