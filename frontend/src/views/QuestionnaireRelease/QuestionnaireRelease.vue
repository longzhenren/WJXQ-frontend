<template>
  <div class="questionnaireRelease">
<!--    侧边菜单-->
    <div class="releaseMenu">
      <ul class="menuItems">
        <li class="menuItem" @click="backToDesign">
          <span class="backLogo"></span>
          <div>返回设计页面</div>
        </li>

        <li class="menuItem"
            :class="{horzontalActive: $store.state.leftMenuCurrent===0}"
            @click="changeLeft(0)">
          <span class="releaseLogo"></span>
          <div>问卷发布</div>
        </li>

<!--        <li class="menuItem"-->
<!--            :class="{horzontalActive: $store.state.leftMenuCurrent===1}"-->
<!--            @click="changeLeft(1)">-->
<!--          <span class="sendLogo"></span>-->
<!--          <div>问卷发送</div>-->
<!--        </li>-->

        <li class="menuItem"
            :class="{horzontalActive: $store.state.leftMenuCurrent===2}"
            @click="BackToHome">
          <span class="homeLogo"></span>
          <div>返回首页</div>
        </li>

<!--        <li class="menuItem">-->

<!--        </li>-->
      </ul>
    </div>

<!--    顶部导航栏-->
    <div class="topNav">
      <ul v-if="$store.state.leftMenuCurrent===0">
        <!--      问卷状态-->
        <li v-for="(item,index) in releaseTopNavData"
            :class="{ active: topNavCurrent===index}"
            @click="changeTop(index)" >
          <span v-if="index===0" class="stateLogo"></span>
          <span v-if="index===1" class="prevLogo"></span>
          <span v-if="index===2" class="setLogo"></span>
          <div>{{ item.title }}</div>
        </li>
      </ul>

<!--      <ul v-else-if="$store.state.leftMenuCurrent===1">-->
<!--        <li v-for="(item,index) in sendTopNavData"-->
<!--            :class="{ active: topNavCurrent===index}"-->
<!--            @click="changeTop(index)" >-->
<!--          <span v-if="index===0" class="linkLogo"></span>-->
<!--          <span v-if="index===1" class="prev2Logo"></span>-->
<!--          <div>{{ item.title }}</div>-->
<!--        </li>-->
<!--      </ul>-->

      <div class="quesTitle" @click="ShowQues">
        {{DesignedQuestionnaire.Title}}
      </div>
    </div>


    <div class="release" v-if="$store.state.leftMenuCurrent===0">
      <div class="status" v-if="topNavCurrent===0">
        <div class="releasable" v-if="DesignedQuestionnaire.Open">
          此问卷已经设计完成,您可以开始
          <button @click="sendQues">逐一发送问卷</button>或者
          <button @click="continueToDesign">继续编辑问卷</button>
        </div>

        <div class="disreleasable" v-else>
          此问卷还未设计完成,如果准备就绪,您可以
          <button @click="releaseMyQues">开启问卷</button>
        </div>

          <div class="link" v-if="DesignedQuestionnaire.Open">
            <div class="erweima">
<!--              <div class="intro">点击二维码即可下载分享</div>-->
              <div class="code">
                <QRCode ref="Myqrcode"
                        :urlpath="QuesLink"
                        :code-height="150"
                        :code-width="150"></QRCode>
              </div>
            </div>

            <div class="generateLink">
              <div class="title">问卷链接</div>
              <div class="quesLink">
                <input id="links" type="text" v-model="QuesLink">
                <div class="operations">
                  <button @click="copyLink">复制</button>
                  <button @click="openQuesLink">打开</button>
                </div>
              </div>
            </div>
          </div>

        <div class="warning" v-else>
          <div class="linksWarning">
            问卷还未发布，发布后才可获取问卷链接
          </div>

          <div class="tims">
            根据中国相关法规和主管部门要求，不允许发布与政治、军事、宗教，信仰，民族，人权、民主、国家主权、国家统一、外交事件 等相关的 敏感话题调查，请您谅解！
          </div>

        </div>





        <div class="check">
<!--          查看历史记录-->
          <div class="checkHistory">
            <span>发布记录</span>
            <span>可以查看问卷的发布历史记录</span>
          </div>

<!--          导出-->
          <div class="export" @click="exportDocument">
            <span>导出到word</span>
            <span>可以将编辑好的问卷导出word</span>
          </div>

        </div>
      </div>

      <div class="settings" v-if="topNavCurrent===2">
        <div class="baseSetting">

        </div>

        <div class="ansTimesSetting">

        </div>

        <div class="submitSetting">

        </div>


      </div>
    </div>


    <div class="send" v-if="$store.state.leftMenuCurrent===1">

    </div>


    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>现在返回设计页面会关闭问卷，确认返回吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBackToDesign">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from "../../assets/utils/bus";
import {request} from "../../network/request";
import QRCode from "../../components/QRCode";

export default {
  name: "QuestionnaireRelease",
  components:{
    QRCode
  },
  data(){
    return{
      // 问卷id的加密结果
      EncodeID: '',

      // 是否弹出对话框
      dialogVisible: false,

      // 测试用链接
      TestLink: '',


      //需要发送得到的问卷id
      QuesId: 0,

      // 得到的问卷
        DesignedQuestionnaire: {},

      // 顶部菜单计数器
      topNavCurrent: 0,

      // 问卷链接
      QuesLink: '',

      releaseTopNavData: [
        {
          title: '问卷状态',
        },
        {
          title: '问卷预览',
        },
        {
          title: '问卷设置',
        }
      ],

      sendTopNavData: [
        {
          icon: '',
          title: '问卷链接',
        },
        {
          icon: '',
          title: '问卷预览',
        },
      ]

    }
  },
  methods: {
    // 进行预览
    goPreview(){
      let psthH = '/answer/'+this.DesignedQuestionnaire.EncodeID
      this.$router.push({
        path: psthH,
        query: {
          Mode: 'preview',
        }
      })
    },


    // 将问卷导出为word
    exportDocument(){
      let  pra = {
        username: this.$store.state.personalInfo.username,
        id: this.QuesId
      }
      request({
        url:'/question/exportQuestionnaire',
        method:'post',
        data: pra,
        responseType: "blob"
      }).then(res=>{
        console.log(res)
        this.download(res);
      }).catch(err=>{
        console.log()
      })
    },

    // 返回首页
    BackToHome(){
      this.$router.push({
        path: '/Management',
        query: {
          username: this.$store.state.personalInfo.username
        }
      })
    },

    // 返回设计页面条船
    BackLink(){
      this.$router.push({
        path: '/design',
        query: {
          username: this.$store.state.personalInfo.username,
          id: this.QuesId
        }
      });
    },

    // 确认返回设计页面
    confirmBackToDesign(){
      this.dialogVisible =false;

      this.continueToDesign();

      this.BackLink();
    },


    // 继续编辑问卷
    continueToDesign(){
      this.DesignedQuestionnaire.Open = false;

      let pra = {
        id: this.DesignedQuestionnaire.id,
        username: this.$store.state.personalInfo.username,
        Open: this.DesignedQuestionnaire.Open
      }

      request({
        url: '/question/releaseQuestionnaire',
        method: 'post',
        data: pra
      }).then(res=> {
        console.log(res)
        if (res.data.Message === 'Success'){
          this.$message({
            showClose: true,
            message: '问卷已停止发布',
            type: 'success'
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    ShowQues(){
      console.log(this.DesignedQuestionnaire)
      console.log(this.QuesId)
      this.$router.push({
        path: '/dataanalysis',
        query: {
          id: this.QuesId,
          username: this.$route.query.username
        }
      });
    },

    // 打开问卷链接
    openQuesLink(){
      let href = window.location.href;
      let split = href.split('/release')
      split[0]+='/Management';
      console.log(split[0])
      console.log(href)

      // window.open(this.QuesLink,'_blank')
      window.open(this.QuesLink,'_blank')
    },

    // 复制问卷链接
    copyLink(){
      let input = document.getElementById("links");
      input.select();
      document.execCommand('copy');
      this.$message({
        showClose: true,
        message: '已复制',
        type: 'success'
      });
    },

    // 问卷可以发送
    sendQues(){
      this.$store.commit('leftMenuCurrentOne')
    },

    // 发布问卷
    releaseMyQues(){
      this.DesignedQuestionnaire.Open = true

      let pra = {
        id: this.DesignedQuestionnaire.id,
        username: this.$store.state.personalInfo.username,
        Open: this.DesignedQuestionnaire.Open
      }

      request({
        url: '/question/releaseQuestionnaire',
        method: 'post',
        data: pra
      }).then(res=> {
        console.log(res)
        if (res.data.Message === 'Success'){
          this.$message({
            showClose: true,
            message: '问卷已发布',
            type: 'success'
          });
        }
      }).catch(err=>{
        console.log(err)
      })


    },

    // 切换顶部导航栏
    changeTop(index){
      this.topNavCurrent=index
      if (index===1){
        this.goPreview();
      }
    },

    // 切换侧边导航栏
    changeLeft(index){
      if (index === 1 && !this.DesignedQuestionnaire.Open){
        this.$message({
          showClose: true,
          message: '问卷未发布，不可发送问卷',
          type: 'warning'
        });
      }
      else  {
        if(index===0){
          this.$store.commit('leftMenuCurrentZero')
        }else if(index===1){
          this.$store.commit('leftMenuCurrentOne')
        }else if(index===2){
          this.$store.commit('leftMenuCurrentTwo')
        }
      }
    },
    // 返回问卷设计页面
    backToDesign(){
      if (this.DesignedQuestionnaire.Open){
        this.dialogVisible = true;
      }
      else {
        this.BackLink();
      }
    },
    download(res) {
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
    // 得到打开问卷的链接
    getQuestionnaireLink() {
      let split1 = window.location.href.split('/release');
      this.TestLink = split1[0]+ '/answer/'+this.DesignedQuestionnaire.id;
      split1[0]+='/answer/'+this.EncodeID;
      this.QuesLink =    split1[0]   ;
      // // split[0]+='/Management';
      console.log(this.QuesLink)
      console.log(this.TestLink)

      // console.log(href)
    },

    acceptDesignedQuestionnaire(Questionnaire){
      let params = this.$route.query;
      this.DesignedQuestionnaire = Questionnaire
      this.QuesId = Number(params.id)===0?Questionnaire.id:Number(params.id);
      // this.QuesId = ===0?Number(params.id):Questionnaire.id
       localStorage.QuesId = this.QuesId
    },
    // 向后端发送请求接受问卷信息
    getDesignedQuestionnaire(){
      // 获取问卷

      this.QuesId = Number(this.$route.query.id);
      localStorage.QuesId = this.QuesId
      request({
        url: '/question/questionnaireID',
        method: 'get',
        params: {
          id: this.QuesId
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          this.DesignedQuestionnaire = res.data.Questionnaire
          console.log(this.DesignedQuestionnaire)
          this.EncodeID = res.data.Questionnaire.EncodeID
          this.getQuestionnaireLink();
        }
      }).catch(err=>{
        // console.log(err)
      })
    },

  },
  mounted() {
    // if (localStorage.QuesId){
    //   this.QuesId = Number(localStorage.QuesId);
    //   // console.log(this.QuesId)
    // }
  },
  beforeDestroy() {
    bus.$emit('backToDesign',this.DesignedQuestionnaire)
  },

  created() {
    bus.$on('NewQuesDesigned',this.acceptDesignedQuestionnaire)

    setTimeout(this.getDesignedQuestionnaire,200)

  },
  watch: {
    QuesId(newID){
      localStorage.QuesId = newID
    },
  },

}
</script>

<style scoped>
  .questionnaireRelease {
    width: 100vw;
    height: 100vh;
    background-color: #F2F2F2;
  }
  .releaseMenu {
    width: 8%;
    height: 100%;
    background-color: #08298A;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
  }

  .releaseMenu .menuItems {
    width: 100%;
  }


  .releaseMenu .menuItems .menuItem {
    height: 13vh;
    /*background-color: pink;*/
    width: 100%;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #BDBDBD;
    margin-bottom: 20px;
  }

  .releaseMenu .menuItems .menuItem:hover {
    cursor: pointer;
  }

  .releaseMenu .menuItems .menuItem span {
    font-size: 40px;
    margin-bottom: 10px;
  }


  .topNav {
    width: 100%;
    height: 10%;
    position: fixed;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: 4;
  }

  .topNav .quesTitle {
    width: 10%;
    height: 100%;
    /*line-height: 13vh;*/
    position: absolute;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #848484;
    right: 10%;
    bottom: 0;
  }

  .topNav ul {
    width: 30%;
    height: 100%;
    /*background-color: pink;*/
    margin-left: 250px;
    display: flex;
    justify-content: space-around;
  }

  .topNav ul li {
    height: 100%;
    width: 33%;
    /*background-color: white;*/
    /*color: #848484;*/
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .topNav ul li:hover {
    cursor: pointer;
  }

  .topNav ul li span {
    font-size: 40px;
    margin-bottom: 10px;
  }



   .active {
    background-color: #58ACFA;
    color: white;
  }


   .horzontalActive {
     background-color: #088A08;
     color: #D8D8D8;
   }

   .release {
     background-color: white;
     width: 50%;
     height: 80%;
     position: absolute;
     left: 50%;
     top: 16%;
     transform: translateX(-50%);
   }
  .release>div {
    width: 100%;
    height: 100%;
  }


  .release .status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

  }

  .release .status div:first-child {
    background-color: white;
    width: 100%;
    height: 15%;
    display: flex;
    box-sizing: border-box;
    justify-content: start;
    padding-left: 10% ;
    align-items: center;
    box-shadow: 0 0 6px rgba(2,2,2,.5);
  }
  .release .status div:first-child button {
    border: 0;
    outline: none;
    background-color: #FE9A2E;
    color: #F2F2F2;
    height: 30%;
    width: 100px;
    margin-left: 10px;
    transition: all .4s ease-in-out;
  }

  .release .status div:first-child button:hover {
    cursor: pointer;
    background-color: #FFBF00;
  }

  /*.release .status .warning {*/
  /*  background-color: white;*/
  /*  width: 100%;*/
  /*  height: 25%;*/
  /*  padding: 20px 30px;*/
  /*  !*padding: 30px 0;*!*/
  /*  text-align: left;*/
  /*  color: #A4A4A4;*/
  /*}*/

  .release .status .link div {
    box-shadow: none;
  }
  .release .status .check {
    background-color: white;
    width: 100%;
    height: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 20px;
  }

  .release .status .check .checkHistory {
    box-shadow: none;
      display: flex;
      height: 70px;
      flex-direction: column;
      justify-content: space-around;
      align-items: start;
  }

  .release .status .check .export {
    padding-left: 10% ;
    box-shadow: none;
    display: flex;
    height: 70px;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
  }

  /*.release .status .check div {*/
  /*  box-shadow: none;*/
  /*  !*background-color: pink;*!*/
  /*  display: flex;*/
  /*  height: 70px;*/
  /*  flex-direction: column;*/
  /*  justify-content: space-around;*/
  /*  align-items: start;*/
  /*}*/

  .release .settings {

  }

  .release .status .check div span:first-child {
    color: #58ACFA;
  }

  .release .status .check div span:first-child:hover {
    cursor: pointer;
  }

  .send {
    background-color: white;
    width: 50%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 16%;
    transform: translateX(-50%);
  }

  .release .status  .link {
    width: 100%;
    /*background-color: pink;*/
    height: 180px;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 0;
  }

  .release .status  .warning {
    width: 100%;
    /*background-color: pink;*/
    height: 180px;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0;
  }

  .release .status  .warning .tims {
    box-shadow: none;
    height: 100px;
    padding: 0 63px;
    text-align: left;
    color: #A4A4A4;
  }

  .release .status  .warning .linksWarning {
    box-shadow: none;
    height: 100px;
  }

  .release .status  .link .generateLink {
    /*background-color: blue;*/
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /*padding-left: 20px;*/
    box-sizing: border-box;
  }

  .release .status  .link .generateLink .title {
    /*background-color: #58ACFA;*/
    width: 100%;
    height: 30%;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    color: #1C1C1C;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .release .status  .link .generateLink .quesLink {
    /*background-color: purple;*/
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }

  .release .status  .link .generateLink .quesLink input {
    border: 0;
    outline: none;
    width: 60%;
    height: 30%;
    margin-bottom: 20px;
    background-color: #E6E6E6;
    padding-left: 20px;
  }

  .release .status  .link .generateLink .quesLink .operations {
    /*background-color: #F2F2F2;*/
    width: 85%;
    height: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .release .status  .link .generateLink .quesLink .operations button {
    border: 0;
    outline: none;
    background-image: linear-gradient(to left,#A9D0F5,#58FAF4);
    width: 20%;
    height: 80%;
    border-radius: 999999999px;
    color: #848484;
  }

  .release .status  .link .generateLink .quesLink .operations button:hover {
    /*background-image: linear-gradient(to left,,#58FAF4);
    */
    cursor: pointer;
    background-image: none;
    background-color: white;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    color: #58ACFA;
  }

  .release .status  .link .erweima {
    /*background-color: red;*/
    width: 60%;
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*margin-left: 5px;*/
    margin-left: 0;
  }

  .release .status  .link .erweima .code {
    width: 150px;
    height: 150px;
    margin: 0;
  }

  .backLogo{
    font-family: icomoon;
    content: '\e90e';
  }
  .releaseLogo{
    font-family: icomoon;
    content: '\e935';
  }
  .sendLogo{
    font-family: icomoon;
    content: '\e006';
  }
  .homeLogo{
    font-family: icomoon;
    content: '\e902';
  }
  span[class=stateLogo]::after{
    font-size: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-family: icomoon;
    content: '\e937';
  }
  span[class=prevLogo]::after{
    font-size: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-family: icomoon;
    content: '\e9ce';
  }
  span[class=setLogo]::after{
    font-size: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-family: icomoon;
    content: '\e939';
  }
  span[class=linkLogo]::after{
     font-size: 50px;
     line-height: 70px;
     vertical-align: middle;
     font-family: icomoon;
     content: '\e93b';
  }
  span[class=prev2Logo]::after{
      font-size: 50px;
      line-height: 70px;
      vertical-align: middle;
      font-family: icomoon;
      content: '\e9ce';
    }
  {
    font-family: icomoon;
    content: 'e93b';
  }
  {
    font-family: icomoon;
    content: '\e935';
  }



</style>

