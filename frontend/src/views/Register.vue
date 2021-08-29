<template>
  <div class="Register" style="width: 100vw;height: 100vh;">
    <div id="top">
      <img src="" alt="">
      <button id="login1" @click="login1Clicked">登陆</button>
      <button id="Home" @click="HomeClicked">返回首页</button>
    </div>
    <div id="mainBody">
      <div class="reg_head">
        <h3>注册新用户</h3>
      </div>
      <div class="reg_form">
        <el-form :model="registForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" style="margin-right:70px  ;">

          <span class="userLogo"></span>
          <el-form-item  prop="Username" >
            <el-input v-model="registForm.Username" placeholder="用户名"></el-input>
          </el-form-item>

          <span class="passwdLogo1"></span>
          <el-form-item  prop="password" style="margin-top:25px  ;">
            <el-input v-model="registForm.password" show-password placeholder="密码"></el-input>
          </el-form-item>

          <span class="passwdLogo2"></span>
          <el-form-item  prop="confirmPwd" style="margin-top:25px  ;">
            <el-input v-model="registForm.confirmPwd" show-password placeholder="确认密码"></el-input>
          </el-form-item>

          <span class="emailLogo"></span>
          <el-form-item
            prop="email"
            :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ]"style="margin-top:25px  ;">
            <el-input v-model="registForm.email" placeholder="邮箱"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="registerBtn" plain @click="submitMsg">确认提交</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div id="login2"><router-link to="/Login" class="style_orange">我有账号,立即登陆</router-link></div>
    </div>
    <img src="../assets/imgs/bg1.jpg" class="bg" alt="">
  </div>
</template>

<script>
import {request} from "../network/request";

export default {
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
        console.log(this.registForm.passwd)
      } else {
        callback()
      }
    }
    return{
      registForm: {
        name: '',
        sex: '',
        Username: '',
        passwd: '',
        confirmPwd: '',
        email: '',
      },
      rules: {
        Username: [
          { required: true, message: '请输入您的用户名,长度为3~11之间', trigger: 'blur',pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{3,11}$/ }
        ],
        password: [
          { pattern: /^[a-zA-Z0-9]{3,10}$/,required: true, message: '请确保密码在3到10个字符间，且只有数字或字母', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validatePass,  trigger: 'blur',}
        ],
      }
    }
  },
  computed:{
  },
  methods:{

    //提交信息
    submitMsg(){
      console.log(this.registForm)
      // let par=new URLSearchParams();这个是改为非json方式
      // let par;
      // par.append('username',this.registForm.Username);
      // par.append('password',this.registForm.password);
      // par.append('email',this.registForm.email);
      request({
        url: '/user/register/',
        method: 'post',
        data: {
          'username':this.registForm.Username,
          'password':this.registForm.password,
          'email':this.registForm.email
        }
      }).then( res=> {
        if (res.data.msg==='用户名已存在'){
          this.$message({
            showClose: true,
            message: '该用户名已被使用！',
            type: 'warning'
          });
        }
        else if (res.data.msg==="success"){
          this.$message({
            showClose: true,
            message: '注册成功！',
            type: 'success'
          });
          this.$router.replace('/Login') ;
        }
        console.log(res.data)
      }).catch( err=> {
        console.log(err)
      })
    },
    login1Clicked(){
      this.$router.push('/Login');
    },
    HomeClicked(){
      this.$router.push('/');
    },
  },
  components:{
  },

}
</script>

<!--<style scoped src="../assets/css/register.css"></style>-->
<style scoped src="../assets/css/base.css"></style>
<style scoped src="../assets/css/common.css"></style>
<style scoped>

#top{
  top: 0px;
  left: 0px;
  position: absolute;
  /*background-color: skyblue;*/
  height: 100px;
  width: 100%;
  /*box-shadow: 5px 5px 2px rgba(192,196,204,0.3);*/
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
#login1{
  position: absolute;
  background-color: #9eaabf;
  top: 20px;
  height: 35px;
  width: 70px;
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
  background-color: #9eaabf;
  top: 20px;
  height: 35px;
  width: 100px;
  right: 4%;
  border-radius: 22px;
  font-size: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  color: white;
}
#Home:hover,#login1:hover{
  border-width: 2px ;
  font-size: 17px;
  transition: all 0.2s ease-out ;
}
.reg_head{
  margin:30px 0px 0px -240px;
  font-size: 17px;
  color: orange;
}
.reg_form{
  margin:30px 0px 0px -50px;
}
.registerBtn{
  display: block;
  width: 300px;
  height: 40px;
  margin-top: 40px;
  margin-left: -30px;
  background-color: orange;
  font-size:16px ;
  color: white;
}
.registerBtn:hover{
  background-color: #eaa200;
}
#login2{
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
  content: '\e968';
  top: 70px;
  left:50px;
}
span[class=passwdLogo1]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e97c';
  top: 135px;
  left:50px;
}
span[class=passwdLogo2]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e97c';
  top: 200px;
  left:50px;
}
span[class=emailLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\f1d8';
  top: 265px;
  left:50px;
}
.bg{
  z-index: -1;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>