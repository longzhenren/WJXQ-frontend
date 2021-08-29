<template>
  <div class="cardDiv">
    <div class="cardContent">
    <div>
      <el-row type="flex"  justify="center">
        <el-col :span="12">
          <el-row type="flex"  justify="left">
              <div >
                <label class="titleElement">问卷题目:{{QesInfo.Title}}</label>
              </div>
          </el-row>
        </el-col>

        <el-col :span="12" >
          <el-row type="flex"  justify="end">

            <label class="divElement" >ID:{{QesInfo.id}}</label>
            <label class="divElement" v-if="QesInfo.Open===false"><i class="el-icon-remove" style="color: crimson"/>未发布</label>
            <label class="divElement" v-else><i class="el-icon-success" style="color: #088A08"/>已发布</label>
            <label class="divElement" >答卷:{{QesInfo.Submission}}</label>
            <label class="divElement" >{{ QesInfo.CreateTime }}</label>
          </el-row>

        </el-col>


      </el-row>
    </div>
    <div class="innerDiv">
      <el-divider class="divider" />
    </div>
    <div >
      <el-row type="flex"  justify="center" >
        <el-col :span="12">
          <el-row type="flex"  justify="left" >
            <div class="operationElement">
              <el-dropdown>
                <span class="el-dropdown-link">
                  设计问卷<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="el-dropdown-item" @click.native.prevent="encodeClicked">编辑问卷</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-item" @click.native.prevent="modelShow=true">预览问卷</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="operationElement">
              <el-dropdown>
                <span class="el-dropdown-link">
                  发送问卷<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="el-dropdown-item" @click.native.prevent="linkClicked">二维码&链接</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="operationElement">
              <el-dropdown>
                <span class="el-dropdown-link">
                  数据分析<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
<!--                  <el-dropdown-item  class="el-dropdown-item">查看分析</el-dropdown-item>-->
                  <el-dropdown-item class="el-dropdown-item" @click.native.prevent="exportDocumentExcel">下载excel</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-item" @click.native.prevent="exportDocumentWord">下载word</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-row>
        </el-col>

        <el-col :span="12" >
          <el-row  type="flex"  justify="end" >
            <el-button class="divElement" type="text" STYLE="color: #6E6E6E" v-if="QesInfo.Open===false" @click="close2Open"><i class="el-icon-circle-check"></i>发布</el-button>
            <el-button class="divElement" type="text" STYLE="color: #6E6E6E" v-else @click="open2Close"><i class="el-icon-video-pause"></i>暂停</el-button>
            <el-button class="divElement" type="text" STYLE="color: #6E6E6E" @click="dialogFormVisible=true"><i class="el-icon-document-copy"></i>复制</el-button>
            <el-dialog title="复制问卷" :visible.sync="dialogFormVisible" style="width: 60%;margin-left: 20%">
              <el-form :model="form" :rules="rules">
                <el-form-item label="问卷标题" :label-width="formLabelWidth" prop="title">
                  <el-input v-model="form.title" :placeholder=title></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="copyQes">确 定</el-button>
              </div>
            </el-dialog>
            <el-button class="divElement" type="text" STYLE="color: #6E6E6E" @click="removeQes"><i class="el-icon-delete-solid"></i>删除</el-button>
            <el-button class="divElement" type="text" STYLE="color: #6E6E6E"  @click="starQes"><i v-if="QesInfo.Star" class="el-icon-star-on" style="color: #FFBF00" ></i><i v-else class="el-icon-star-off"></i>收藏</el-button>
          </el-row>

        </el-col>


      </el-row>
    </div>

    </div>
    <Model :show="modelShow"  @hideModal="hideModal" :QesInfoModel="QesInfo"/>
  </div>
</template>

<script>
import Model from "@/components/ManagementPagin/common/Model.vue";
import {request} from "../../../network/request";

export default {
  name: "QesCard",
  data(){
    return{
      title:'',
      modelShow: false,
      rules: {
      },
      dialogFormVisible: false,
      form: {
      },
      formLabelWidth: '100px'
    }
  },
  props:{
    QesInfo:Object,
  },
  components:{
    Model
  },
  methods:{
    // 关闭弹窗
    hideModal() {
      this.modelShow = false;
    },
    // 将问卷导出为word
    exportDocumentWord(){
      let  pra = {
        username: this.$store.state.personalInfo.username,
        id: this.QesInfo.id
      }
      request({
        url:'/question/exportQuestionnaire',
        method:'post',
        data: pra,
        responseType: "blob"
      }).then(res=>{
        console.log(res)
        if ( res.data.Message ){
        }
        else {
          this.downloadWord(res);
        }

      }).catch(err=>{
        console.log()
      })
    },
    // excel
    exportDocumentExcel(){
      let  pra = {
        // username: this.$store.state.personalInfo.username,
        questionnaireID: this.QesInfo.id
      }
      request({
        url:'/submit/report',
        method:'post',
        data: pra,
        responseType: "blob"
      }).then(res=>{
        console.log(res)
        if ( res.data.Message ){
        }
        else {
          this.downloadExcel(res);
        }

      }).catch(err=>{
        console.log()
      })
    },

    downloadExcel(res) {
      if (!res.data) {
        return;
      }
      let fileName = 'aaa.xls';
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'data.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    downloadWord(res) {
      if (!res.data) {
        return;
      }
      let fileName = 'aaa.docx';
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'word.docx')

      document.body.appendChild(link)
      link.click()
    },
    linkClicked(){
      if(this.QesInfo.Open){
        this.$store.commit('leftMenuCurrentOne')
        this.$router.push({
          path:'/release',
          query:{
            username:this.$store.state.personalInfo.username,
            id:this.QesInfo.id
          }
        })
      }
      else {
        this.$message({
          showClose: true,
          message: '问卷未发布，不可发送问卷',
          type: 'warning'
        });
      }
    },
    encodeClicked(){
      this.$store.commit('leftMenuCurrentZero')
      this.$router.push({
        path:'/release',
        query:{
          username:this.$store.state.personalInfo.username,
          id:Number(this.QesInfo.id)
        }
      })
    },
    open2Close(){
      request({
        url: '/question/releaseQuestionnaire',
        method: 'post',
        data: {
          'id':this.QesInfo.id,
          'username':this.$store.state.personalInfo.username,
          'Open':'false'
        }
      }).then(res=>{
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '关闭问卷成功！',
            type: 'success'
          });
        }
      })
    },
    close2Open(){
      request({
        url: '/question/releaseQuestionnaire',
        method: 'post',
        data: {
          'id':this.QesInfo.id,
          'username':this.$store.state.personalInfo.username,
          'Open':'true'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '发布问卷成功！',
            type: 'success'
          });
        }
      })
    },
    copyQes(){
      this.dialogFormVisible = false
      request({
        url: '/question/copyQuestionnaire',
        method: 'post',
        data: {
          'id':this.QesInfo.id,
          'username':this.$store.state.personalInfo.username,
          'Title':this.form.title===undefined?this.title:this.form.title,
        }
      }).then(res=>{
        console.log(res)
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '复制问卷成功！',
            type: 'success'
          });
        }
      })
    },
    removeQes(){
      request({
        url: '/question/removeQuestionnaire',
        method: 'post',
        data: {
          'id':this.QesInfo.id,
          'username':this.$store.state.personalInfo.username,
          'Remove':'true'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '已将问卷回收至回收站！',
            type: 'success'
          });
        }
      })
    },
    starQes(){
      if(this.QesInfo.Star){
        request({
          url: '/question/starQuestionnaire',
          method: 'post',
          data: {
            'id':this.QesInfo.id,
            'username':this.$store.state.personalInfo.username,
            'Star':'false'
          }
        }).then(res=>{
          if(res.data.Message==='Success'){
            this.$parent.getManageQes();
            this.$message({
              showClose: true,
              message: '取消星标问卷成功！',
              type: 'success'
            });
          }
        })
      }
      else {
        request({
          url: '/question/starQuestionnaire',
          method: 'post',
          data: {
            'id':this.QesInfo.id,
            'username':this.$store.state.personalInfo.username,
            'Star':'true'
          }
        }).then(res=>{
          if(res.data.Message==='Success'){
            this.$parent.getManageQes();
            this.$message({
              showClose: true,
              message: '星标问卷成功！',
              type: 'success'
            });
          }
        })
      }
    },
  },
  updated() {
    this.title=this.QesInfo.Title+'.副本'
  }
}
</script>

<style scoped>
.cardDiv{
  display: block;
  margin: 5px;
  background: white;
  border-radius: 5px;
  border-style: hidden;
}
.titleElement{
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
}
.divElement{
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
}
.operationElement{
  display: inline;
  margin-right: 15px;
  margin-left: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #6E6E6E;
}
.divider{
  margin:0px;
}
.innerDiv{
  margin-bottom:20px;
}
.cardContent{
  margin:20px;
  padding-bottom: 10px;
  padding-top: 10px;
}
.el-dropdown-item{
  font-size: 13px;
  color: #6E6E6E;
}

</style>