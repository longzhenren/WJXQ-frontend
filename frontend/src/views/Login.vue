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
      }
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
        console.log(res.data);
        if (res.data.msg==='success'){
          this.$store.commit("login",this.loginForm.username,this.loginForm.passwd);
          console.log(this.$store.state.personalInfo.username)
          this.$message({
            showClose: true,
            message: '登陆成功！',
            type: 'success'
          });
          request({
            url: '/user/getinfo/',
            method: 'post',
            data:{
            }
          }).then(res2=>{
            console.log(res2)
            this.$store.commit('getEmail',res2.data.userinfo.email);
          })
          console.log('email='+this.$store.state.personalInfo.email);
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

<style scoped src="../assets/css/base.css"></style>
<style scoped src="../assets/css/common.css"></style>
<style scoped>

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
  width: 28%;
  left: 35%;
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
  margin-top: 40px;
  margin-left: 70px;
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
span[class=userLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e911';
  top: 70px;
  left:50px;
}
span[class=passwdLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e914';
  top: 140px;
  left:50px;
}
</style>