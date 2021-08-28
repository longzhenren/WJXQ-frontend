<template>
  <div class="setting">
    <div class="settingNav">
      <ul>
        <li :class="{activeNav: nowPos===0}" @click="changePosIndex(0)">
          <div>
            <i class="el-icon-setting"></i>
            基本设置
          </div>
        </li>
        <li :class="{activeNav: nowPos===1}" @click="changePosIndex(1)">
          <div>
            <i class="el-icon-edit"></i>
            作答次数设置
          </div>

        </li>
        <li :class="{activeNav: nowPos===2}" @click="changePosIndex(2)">
          <div>
            <i class="el-icon-collection"></i>
            其他设置
          </div>

        </li>
      </ul>
    </div>

    <div class="saveAll" @click="saveAll">
      <MyButton :title="'全部保存'" ></MyButton>
    </div>


    <div class="TimeSet" ref="TimeSet">
      <div class="title">
        时间设置
        <el-switch
            v-model="isNeedSetTime"
            active-text="开启"
            inactive-text="关闭">
        </el-switch>
      </div>

      <el-divider></el-divider>
      <div class="timeSetContain" v-if="isNeedSetTime">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              开始时间
            </template>
            <div class="TimeContent">
              <div class="TimeTitle">选择时间</div>
              <el-date-picker
                  v-model="StartTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
              </el-date-picker>
            </div>
          </el-collapse-item>

          <el-collapse-item name="2">
            <template slot="title">
              结束时间
            </template>
            <div class="TimeContent">
              <div class="TimeTitle">选择时间</div>
              <el-date-picker
                  v-model="DeadLine"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
              </el-date-picker>
            </div>

          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              作答时间设置
            </template>
            <div class="TimeContent">
              <div class="TimeTitle">选择时间</div>
              <el-input placeholder="请输入内容" v-model="TimeSetting.AnswerTime" clearable ref="inputAnswer">
                <template slot="append">
                  <el-select v-model="AnswerDanwei" placeholder="单位">
                    <el-option label="小时" value="小时"></el-option>
                    <el-option label="分钟" value="分钟"></el-option>
                    <el-option label="天" value="天"></el-option>
                  </el-select>
                </template>
              </el-input>
            </div>

          </el-collapse-item>
        </el-collapse>
        <div class="saveTime">
          <button @click="confirmTimeSetting">保存</button>
        </div>
      </div>


    </div>

<!--    <div class="AfterSubmit">-->
<!--      <div class="title">提交后显示</div>-->
<!--      <el-divider></el-divider>-->
<!--      <div class="SubmitSetContain">-->
<!--        <el-radio-group v-model="AfterSubmit.isJump" class="group">-->
<!--          <el-radio :label="false" class="item">显示默认界面</el-radio>-->
<!--          <el-radio :label="true" class="item">跳转到指定页面</el-radio>-->
<!--        </el-radio-group>-->


<!--        <div class="setDestination" v-if="AfterSubmit.isJump">-->
<!--          <div class="Destination">页面目标地址：</div>-->
<!--          <el-input placeholder="请输入内容" class="inputH" size="small" v-model="AfterSubmit.Destination">-->
<!--            <template slot="prepend">http://</template>-->
<!--          </el-input>-->
<!--        </div>-->

<!--        <div class="setDestination" v-else>-->
<!--          <div class="default" @click="editMessage">您的答卷已经提交，感谢参与！</div>-->
<!--        </div>-->

<!--        <div class="saveTime">-->
<!--          <button>保存</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="AnswerTimeControl" ref="AnswerSet">
      <div class="title">
        作答次数设置
        <el-switch
            v-model="isNeedSetAnswerTimes"
            active-text="开启"
            inactive-text="关闭">
        </el-switch>
      </div>
      <el-divider></el-divider>
      <div class="timeSetContain" v-if="isNeedSetAnswerTimes">
        <el-collapse v-model="activeNames2">
          <el-collapse-item name="1">
            <template slot="title">
              作答次数设置
            </template>
            <div class="container">
              <div class="Times">是否限制作答次数</div>
              <el-switch
                  v-model="AnswerTimeSetting.Times"
                  active-text="限制为1次"
                  inactive-text="不限制次数">
              </el-switch>
<!--              <el-input v-model="AnswerTimeSetting.Times" type="number" :min="1" class="inputH"></el-input>-->
            </div>
         </el-collapse-item>

          <el-collapse-item name="2">
            <template slot="title">
              登录作答设置
            </template>
            <div class="container">
              <div class="Times">是否需要登录才能答题</div>
<!--              <el-input v-model="AnswerTimeSetting.isNeedLogin" type="number" :min="1" class="inputH"></el-input>-->
<!--              <div>次</div>-->
              <el-switch
                  v-model="AnswerTimeSetting.isNeedLogin"
                  active-text="登录后答题"
                  inactive-text="无需登录">
              </el-switch>
            </div>
          </el-collapse-item>

          <el-collapse-item name="3">
            <template slot="title">
              问卷收集限额
            </template>
            <div class="container">
              <div class="Times">问卷收集限额</div>
<!--              <el-switch-->
<!--                  v-model="AnswerTimeSetting.SelectAnswerTimes"-->
<!--                  active-text="限制为1次"-->
<!--                  inactive-text="不限制次数">-->
<!--              </el-switch>-->
                            <el-input v-model="AnswerTimeSetting.SelectAnswerTimes" type="number" :min="1" class="inputH"></el-input>
              <!--              <el-input v-model="AnswerTimeSetting.Times" type="number" :min="1" class="inputH"></el-input>-->
            </div>
          </el-collapse-item>


        </el-collapse>
        <div class="saveTime">
          <button @click="confirmAnswerTImeSetting">保存</button>
        </div>
      </div>



    </div>

    <div class="SpecialSetting" ref="SpecialSet">
      <div class="title">特殊设置</div>
      <el-divider></el-divider>
      <el-collapse>
        <div v-if="NowsQuestionnaire.Type===4">
          <el-collapse-item >
            <template slot="title">
              是否开启答题乱序
            </template>
            <el-switch
                v-model="SpecialSetting.isReorder"
                active-text="开启"
                inactive-text="关闭">
            </el-switch>
          </el-collapse-item>
        </div>


        <div v-else-if="NowsQuestionnaire.Type === 2">
          <el-collapse-item  >
            <template slot="title">
              是否在投票前显示结果
            </template>
            <el-switch
                v-model="SpecialSetting.isReorder"
                active-text="开启"
                inactive-text="关闭">
            </el-switch>
          </el-collapse-item>
        </div>

      </el-collapse>

      <div class="saveTime">
        <button @click="confirmSpecialSetting" class="button-caution">保存</button>
      </div>
    </div>

    <div class="Bottom"></div>
  </div>
</template>

<script>
import {request} from "../../network/request";
import MyButton from "./MyButton";

export default {
  name: "QuestionnaireSetting",
  components: {
    MyButton
  },
  props: {
    NowsQuestionnaire: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      // 是否开启时间设置
      isNeedSetTime: true,

      // 是否开启作答次数设置
      isNeedSetAnswerTimes: true,


      // 当前所处位置
      nowPos: 0,

      activeNames: ['1'],

      activeNames2: ['1'],


      StartTime: new Date(),
      DeadLine: new Date(),
      AnswerTime: new Date(),


      // 特殊设置
      SpecialSetting: {
        // 是否需要开启乱序
        isReorder: false,

        // 是否在投票前显示结果
        isShowResultBeforeVote: false,

      },

      // 提交后显示内容设置
      AfterSubmit: {
        // 是否跳转到其他页面
        isJump: false,

        // 要跳转的地址
        Destination: '',
      },

      // 作答次数设置
      AnswerTimeSetting: {
        // 作答次数
        Times: false,

        //收集问卷的限额
        SelectAnswerTimes: 1,

        // 是否需要登录
        isNeedLogin: false,
      },

      // 作答时间单位
      AnswerDanwei: '',

      // 时间设置
      TimeSetting: {
        StartTime: '',
        DeadLine: '',
        AnswerTime: '',
      },

      // 设置信息数据
      Setting: {
        StartTime: '',
        DeadLine: '',
        AnswerTime: 0,
        IPLimit: false,
        Login: false,
        Reorder: false,
        Times: 1,
        ShowResultBeforeVote: false,
      }
    }

  },
  mounted() {

  },
  methods: {
    // 全部保存
    saveAll(){
      this.confirmTimeSetting();
      this.confirmAnswerTImeSetting();
      this.confirmSpecialSetting();
    },

    // 保存设置信息
    saveSettings(){
      if (this.Setting.StartTime === ''){
        this.Setting.StartTime = null
      }

      if (this.Setting.DeadLine === ''){
        this.Setting.DeadLine = null
      }

      let pra = {
        id: this.$route.query.id,
        username: this.$route.query.username,
        Settings: this.Setting
      }
      request({
        url: '/question/modifySettings',
        method: 'post',
        data: pra
      }).then(res=>{
        console.log(res)
        if (res.data.Message === 'Success'){
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    // 编辑问卷结束信息
    editMessage(){

    },

    // 时间格式转换
    changeTimeFormat(date){
      console.log(typeof date)
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y+M+D+h+m+s;

      // return Data.format("yyyy-MM-dd hh:mm:ss")
    },

    changePosIndex(index){
      this.nowPos = index
      let timeSet = this.$refs.TimeSet;
      let answerSet = this.$refs.AnswerSet;
      let specialSet = this.$refs.SpecialSet;
      // console.log(timeSet.offsetTop)
      // console.log(answerSet.offsetTop)
      // console.log(specialSet.offsetTop)
      let html = document.documentElement;
      if (index===0){
        html.scrollTop = timeSet.offsetTop
      }
      else if (index===1){
        html.scrollTop = answerSet.offsetTop
      }
      else  {
        html.scrollTop = specialSet.offsetTop
      }
    },

    // 确认作答次数设置
    confirmAnswerTImeSetting(){
      this.Setting.IPLimit = this.AnswerTimeSetting.Times;
      this.Setting.Login = this.AnswerTimeSetting.isNeedLogin;
      this.Setting.Times = this.AnswerTimeSetting.SelectAnswerTimes;
      this.saveSettings()
    },


    // 确认特殊设置
    confirmSpecialSetting(){
      this.Setting.Reorder = this.SpecialSetting.isReorder;
      this.Setting.ShowResultBeforeVote = this.SpecialSetting.isShowResultBeforeVote
      this.saveSettings();
    },

    // 确定时间设置
    confirmTimeSetting(){
      console.log(this.NowsQuestionnaire)
      // console.log(this.TimeSetting.StartTime)
      this.TimeSetting.StartTime=this.changeTimeFormat(this.StartTime)
      this.TimeSetting.DeadLine=this.changeTimeFormat(this.DeadLine)
      // this.TimeSetting.AnswerTime+=this.AnswerDanwei
      // this.TimeSetting.AnswerTime=this.changeTimeFormat(this.AnswerTime)
      console.log(this.TimeSetting)
      let  Answer;
      switch (this.AnswerDanwei) {
        case "分钟":
          Answer = Number(this.TimeSetting.AnswerTime)*60;
          break;
        case "小时":
          Answer = Number(this.TimeSetting.AnswerTime)*60*60;
          break;
        case "天":
          Answer = Number(this.TimeSetting.AnswerTime)*60*60*24;
          break;
      }
      console.log(Answer)
      this.Setting.StartTime = this.TimeSetting.StartTime
      this.Setting.DeadLine = this.TimeSetting.DeadLine
      this.Setting.AnswerTime = Answer
      console.log(this.Setting);
      this.saveSettings()
    }
  }
}
</script>

<style scoped>
  .setting {
    width: 100%;
    /*height: 300vh;*/
    /*background-color: white;*/
    /*position: relative;*/
    /*padding-top: 30px;*/
    margin-bottom: 50px;
  }



  .settingNav {
    width: 9vw;
    height: 30vh;
    /*background-color: pink;*/
    position: fixed;
    top: 16vh;
    right: 16vw;
  }


  .saveAll {
    /*width: 50vw;*/
    /*height: 30px;*/
    /*height: 50vh;*/
    /*background-color: #58ACFA;*/
    position: fixed;
    right: 15vw;
    top: 46vh;
  }

  .settingNav ul {
    width: 100%;
    height: 80%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
  }

  .settingNav ul li {
    /*margin-left: 10px;*/
    width: 100%;
    height: 35px;
    display: flex;
    line-height: 35px;
    font-size: 12px;
    justify-content: start;
    padding: 2px;
    cursor: pointer;
    transition: .4s;
  }

  .settingNav ul li:hover {
    background-color: rgba(0,191,255,.2);
  }

  .settingNav ul .activeNav {
    background-color: rgba(0,191,255,.2);
    color: #58ACFA;
  }

  .TimeSet {
    /*background-color: pink;*/
    width: 100%;
    /*height: 30vh ;*/
    padding: 0 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
  }

  .title {
    width: 100%;
    height: 7vh;
    line-height: 7vh;
    font-weight: 600;
    letter-spacing: 3px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*background-color: #42b983;*/
  }

  .TimeContent {
    /*background-color: pink;*/
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    /*justify-content: space-around;*/
  }

  .TimeTitle {
    /*background-color: #42b983;*/
    width: 5vw;
    height: 3vh;
    display: inline-block;
    /*position: absolute;*/
    /*left: 5vw;*/
    margin-left: 2vw ;
    font-size: 16px;
    line-height: 3vh;
    margin-right: 2vw ;
  }

  .saveTime {
    /*background-color: #42b983;*/
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    margin-top: 10px;
    /*padding-left: 3vw;*/
  }
  .saveTime button {
    /*border: 0;*/
    outline: none;
    width: 50px;
    height: 3vh;
    border-radius: 0;
    border: 1px solid #00BFFF;
    background-color: white;
    color: #00BFFF;
    margin: 0;
  }

  .saveTime button:hover {
    background-color: rgba(0,191,255,.2);
  }

  .AfterSubmit {
    width: 100%;
    padding: 0 10px;
    margin-top: 30px;
    /*background-color: #42b983;*/
  }

  .group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
  }

  .item {
    margin: 10px 0;
  }

  .setDestination {
    background-color: #F2F2F2;
    width: 100%;
    /*height: 50vh;*/
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 10px 0;
    margin-top: 15px;
  }

  .Destination {
    /*margin-top: 30px;*/
    /*background-color: #58ACFA;*/
    width: 15vw;
    line-height: 4vh;
    height: 4vh;
    display: inline-block;
  }

  .default {
    width: 15vw;
    line-height: 4vh;
    height: 4vh;
    display: inline-block;
    margin-left: 3vw;
  }

  .default:hover {
    font-style:oblique;
    text-decoration: underline;
    color: #58ACFA;
    cursor: pointer;
  }

  .inputH {
    width: 300px;
  }

  .AnswerTimeControl {
    width: 100%;
    padding: 0 10px;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
  }

  .SpecialSetting {
    width: 100%;
    padding: 0 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
  }

  .container {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
  }

  .container .Times {
    width: 200px;

  }

  .Bottom {
    width: 100%;
    height: 5vh;

    /*padding: 0 10px;*/
    /*margin-top: 30px;*/
    /*margin-bottom: 30px;*/
    background-color: transparent;
    /*box-shadow: 0 0 5px rgba(0,0,0,.4);*/
  }

  /*.saveAll {*/
  /*  width: 10vw;*/
  /*  height: 50vh;*/
  /*  !*background-color: #58ACFA;*!*/
  /*  position: fixed;*/
  /*  right: 15vw;*/
  /*  top: 15vh;*/
  /*}*/
</style>