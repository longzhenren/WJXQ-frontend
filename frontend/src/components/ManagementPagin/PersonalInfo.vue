<template>
  <div class="personalInfo">
    <h3 id="title">注册信息</h3>
    <div id="mainBody">
      <ul>
        <li class="style_grey" id="username"><label >用户名:</label><label>{{this.$store.state.personalInfo.username}}</label></li>
        <li class="style_grey" id="email"><label >邮箱:</label><label>{{this.$store.state.personalInfo.email}}</label>
        <el-button type="text" @click="dialog1FormVisible = true">修改邮箱</el-button>

        <el-dialog title="修改邮箱" :visible.sync="dialog1FormVisible" style="width: 60%;margin-left: 20%">
          <el-form :model="form1" :rules="rules1">
            <el-form-item prop="email" label="新邮箱" :label-width="formLabelWidth"
                          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ]"style="margin-top:25px  ;">
              <el-input v-model="form1.email" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog1FormVisible = false">取 消</el-button>
            <el-button type="primary" @click="subChange1">确 定</el-button>
          </div>
        </el-dialog></li>

        <li class="style_grey" id="password"><label >密码:</label><el-button type="text" @click="dialog2FormVisible = true">修改密码</el-button></li>
        <el-dialog title="修改密码" :visible.sync="dialog2FormVisible" style="width: 60%;margin-left: 20%">
          <el-form :model="form2" :rules="rules2">
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPasswd">
              <el-input v-model="form2.newPasswd" show-password></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog2FormVisible = false">取 消</el-button>
            <el-button type="primary" @click="subChange2">确 定</el-button>
          </div>
        </el-dialog>
      </ul>
    </div>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "personalInfo",
  data(){
    return{
      rules1: {
      },
      rules2: {
        newPasswd: [
          { required: true, message: '请输入新密码',  trigger: 'blur',}
        ],
      },
      dialog1FormVisible: false,
      dialog2FormVisible: false,
      form1: {
      },
      form2: {
      },
      formLabelWidth: '100px'
    }
  },
  methods:{
    subChange1(){
      this.dialog1FormVisible = false;
      request({
        url: '/user/changeinfo/',
        method: 'post',
        data: {
          'username':this.$store.state.personalInfo.username,
          'email':this.form1.email,
        }
      }).then( res=> {
        if (res.data.msg==='用户未登录'){
          this.$message({
            showClose: true,
            message: '用户未登录！',
            type: 'warning'
          });
        }
        else if (res.data.msg==="success"){
          this.$message({
            showClose: true,
            message: 'success！',
            type: 'success'
          });
        }
        console.log(res.data)
      }).catch( err=> {
        console.log(err)
      })
    },
    subChange2(){
      this.dialog2FormVisible = false;
      request({
        url: '/user/changeinfo/',
        method: 'post',
        data: {
          'username':this.$store.state.personalInfo.username,
          'password':this.form2.newPasswd
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
            message: '修改密码成功！',
            type: 'success'
          });
        }
        console.log(res.data)
      }).catch( err=> {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#mainBody{
  position: absolute;
  width: 40%;
  height: 400px;
  background-color: white;
  top: 120px;
  left: 30%;
  border-radius: 5%;
}
#mainBody:hover{
  box-shadow: 10px 10px 5px rgba(192,196,204,0.3);
  transition: all 0.2s ease-out;
}
#title{
  display: block;
  position: absolute;
  top: 80px;
  left: 30%;
}
.style_grey{
  margin-left: 40px;
  color: grey;
}
#username{
  display: block;
  position: absolute;
  top: 10%;
  left: 5%;
}
#email{
  display: block;
  position: absolute;
  top: 40%;
  left: 5%;
}
#password{
  display: block;
  position: absolute;
  top: 70%;
  left: 5%;
}
</style>