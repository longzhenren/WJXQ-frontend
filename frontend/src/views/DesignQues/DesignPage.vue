<template>
  <div class="designPage">
    <nav class="designNav">
      <div class="QuesPreview"> 预览</div>

      <div class="release" @click="designDone"> 编辑完成</div>
    </nav>

    <div class="designContent">
      <div class="designComponent">
        <div class="ShowCntl">
          <div :class="{active: ShowNum===0}" @click="changeDesignTools(0)">题型选择</div>
          <div :class="{active: ShowNum===1}" @click="changeDesignTools(1)">问卷大纲</div>
        </div>

<!--        题型组件库-->
        <div class="components" v-if="ShowNum===0">

          <div class="choices" v-for="(item,index) in QuesTypeList">
            <div class="title"> {{ item.type }}</div>
            <ul>
              <li v-for="(i,idx) in item.details" @click="addNewQues(index,idx)">{{i}}</li>
            </ul>
          </div>

        </div>


<!--        该问卷的大纲-->
        <div class="outline" v-else >
          <ul ref="outline_nav">
            <li v-for="(item,index) in QuesList" class="outlineItem" @click="IndexNav(index)">
              <span v-if="isShowQuesNum">{{ item.idx + 1 }}</span>
              {{ item.Stem }}
            </li>
          </ul>
        </div>

      </div>


      <div class="designPreview">

          <div class="QuesBase">
            <div class="QuesTitle">{{ QuesTitle }}</div>

            <div class="QuesIntro">
              {{ QuesText }}
            </div>

            <div class="AutoNumSwitch">
              <el-switch
                  style="display: block"
                  v-model="isShowQuesNum"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="题号显示"
                  inactive-text="题号隐藏">
              </el-switch>
            </div>
          </div>

        <vue-scroll ref="vs"
            :ops="ops" >
          <ul class="QuesList" v-if="QuesList.length!==0">

              <li class="QuesItem" v-for="(item,index) in QuesList" :key="item.idx" :draggable="item.isDraggable"
                  @dragstart="handleDragStart($event,item)"
                  @dragover.prevent="handleDragOver($event)"
                  @dragenter="handleDragEnter($event,item)"
                  @dragend="handleDragEnd($event,item)">
                <span v-if="isShowQuesNum">{{ item.idx + 1 }}</span>
                {{ item.Stem }}

                <div class="componentsItem" @mouseover="OverDrag(index,item)" @mouseleave="LeaveDrag(index,item)">
                  <SingleChoose v-if="item.type==='singleChoice'" ref="child"
                                @saveSingleData="SingleChoiceSave($event,item)"
                                :father-data="item.subData"></SingleChoose>

                  <MultiChoose v-else-if="item.type==='multiChoose'" ref="child"
                               :father-data="item.subData"
                               @saveMultiData="MultiChoiceSave($event,item)"></MultiChoose>

                  <FillBlank v-else-if="item.type==='fillBlank'" ref="child"
                              :father-data="item.subData"
                              @saveBlankData="FillBlankSave($event,item)"></FillBlank>

                  <Evaluate v-else-if="item.type==='evaluate'" ref="child"
                            :father-data="item.subData"
                            @saveEvaluateData="EvaluateSave($event,item)"></Evaluate>
                </div>


                <div class="options">
                  <ul>
                    <li @click="deleteQues(index)">删除</li>
                    <li @click="moveUp(index)">上移</li>
                    <li @click="moveDown(index)">下移</li>
                  </ul>
                </div>

              </li>

          </ul>

          <div class="None" v-else>
            <div class="empty_pic">
              <img src="../../assets/imgs/empty.png">
            </div>
            <div class="empty_font">空空如也 ~</div>
          </div>

        </vue-scroll>

      </div>
    </div>

  </div>

</template>

<script>
import SingleChoose from "../../components/QuestionTemplates/SingleChoose";
import bus from "../../assets/utils/bus";
import MultiChoose from "../../components/QuestionTemplates/MultiChoose";
import FillBlank from "../../components/QuestionTemplates/FillBlank";
import Evaluate from "../../components/QuestionTemplates/Evaluate";
import {request} from "../../network/request";

export default {
  name: "DesignPage",
  components:{
    SingleChoose,
    MultiChoose,
    FillBlank,
    Evaluate
  },
  data(){
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },


      // 记录是否全部保存
      isSaveAll: false,

      // 问题类型列表
      QuesTypeList: [
        // 选择
        {
          type: '选择',
          details: [
              '单选',
              '多选',
          ]
        },
        {
          type: '填空',
          details: [
            '填空',
          ]
        },
        {
          type: '评分',
          details: [
            '评价',
          ]
        },

      ],


      ShowNum: 0,

      // 以下为需要传给后端进行保存的数据
      // 是否开启自动显示题号
      isShowQuesNum: false,


      // 问卷ID
      QuesId: 0,

      // 问卷标题
      QuesTitle: 'title',

      // 问卷描述
      QuesText: '',

      // 问卷问题列表
      QuesList: [

      ],

      // 问卷对象
      Questionnaire: {
        // 问卷id
        id: 0,
        // 问卷标题
        title: '',
        // 创建者信息
        CreateUser: '',
        // 问卷描述
        Text: '',
        // 问卷问题列表
        Question: [],
        // 是否可发布
        isReleaseable: false,
        // 是否已开放
        Open: false,
        // 创建时间
        CreateTime: '',
        // 开启时间
        UpdateTime: '',
        // 发布时间
        ReleaseTime: '',
        // 是否显示题号
        isShowSubNum: false
      },

      // 当前正在拖动的元素
      dragging: null,
    }
  },
  beforeDestroy() {
    bus.$emit('NewQuesDesigned',this.Questionnaire)
  },
  methods: {
    // 转到发布页面
    sendRequest(){
      this.$router.push({
        path: '/release',
        query: {
          username: this.$store.state.personalInfo.username,
          id: this.QuesId
        }
      });
    },

    // 问卷编辑完成，转到问卷发布页面
    designDone(){
      let child = this.$refs.child;
      for (let i = 0; i < child.length; i++) {
        // console.log(child[i].singleChoice.edit);
        let edit;
        if (child[i].singleChoice!==undefined) {
          edit= child[i].singleChoice.edit;
        }
        else if ( child[i].multiChoice!==undefined){
          edit= child[i].multiChoice.edit;
        }
        else if (child[i].fillBlank!==undefined){
          edit= child[i].fillBlank.edit;
        }
        else if (child[i].evaluate!==undefined){
          edit= child[i].evaluate.edit;
        }
        if (edit === 1) {
          child[i].save();
        }
      }
      this.Questionnaire.title = this.QuesTitle;
      this.Questionnaire.Question = this.QuesList;
      this.Questionnaire.isShowSubNum = this.isShowQuesNum
      this.Questionnaire.Text = this.QuesText
      this.sendAndSaveNewQues(this.Questionnaire)
      setTimeout(this.sendRequest,500)
    },

    // 创建问卷，向后端发送数据
    sendAndSaveNewQues(Ques){
      // console.log(Ques);
      let  FinalQuestionnaire = {
        id: 0,
        // Open: false,
        Text: '',
        Title: '',
        Question: [],
        ShowNumber: false,
        username: this.$store.state.personalInfo.username
      }
      FinalQuestionnaire.id = this.QuesId;
      FinalQuestionnaire.Title = Ques.title;
      FinalQuestionnaire.Text = Ques.Text;
      // FinalQuestionnaire.Open = Ques.Open;
      FinalQuestionnaire.ShowNumber = Ques.isShowSubNum;
      for (let i = 0; i < Ques.Question.length; i++) {
        let QuesItem = Ques.Question[i];
        let Question = this.changeDataStructToBackend(QuesItem);
        FinalQuestionnaire.Question.push(Question);
      }


      // console.log(FinalQuestionnaire)
      request({
        url: '/question/modifyQuestionnaire',
        method: 'post',
        data: FinalQuestionnaire
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


    // 向后端传送数据前进行格式转换
    changeDataStructToBackend(item,mode){
      let type =0;
      let Question;
      switch (item.type) {
        case 'singleChoice' :
          type=1;
          break;
        case 'multiChoose' :
          type=2;
          break;
        case 'fillBlank' :
          type=3;
          break;
        case 'evaluate' :
          type=4;
          break;
      }
      if (mode==='sendQuestion'){
         Question = {
          id: item.id===undefined?0:item.id,
          Stem: item.Stem,
          Type: type,
          Questionnaire: this.QuesId===undefined?0:this.QuesId,
          Must: item.subData.Must===undefined?false:item.subData.Must,
          Number: item.idx,
          Choice: [],
          Describe: item.subData.describe,
          username: this.$store.state.personalInfo.username
        }
      }
      else {
         Question = {
          id: item.id===undefined?0:item.id,
          Stem: item.Stem,
          Type: type,
          Questionnaire: this.QuesId===undefined?0:this.QuesId,
          Must: item.subData.Must===undefined?false:item.subData.Must,
          Number: item.idx,
          Choice: [],
          Describe: item.subData.describe,
        }
      }

      let choices = item.subData.choices;
      let describes = item.subData.describes;
      let level = item.subData.level;
      // console.log(choices)
      if (choices!==undefined){
        for (let i = 0; i <choices.length ; i++) {
          let CItem = {
            Text: choices[i],
          }
          Question.Choice.push(CItem);
        }
      }
      if (describes !== undefined && level !== undefined){
        for (let i = 0; i <describes.length ; i++) {
          let CItem = {
            Text: describes[i],
            Score: level[i],
          }
          Question.Choice.push(CItem);
        }
      }
      return Question;
    },

    // 题目修改保存
    modifyQuestion(item){
      // console.log("aaa")
      // console.log(item)
      let Question = this.changeDataStructToBackend(item,'sendQuestion');

      // console.log(Question)
      request({
        url: '/question/modifyQuestion',
        method: 'post',
        data: Question
      }).then(res=>{
        // console.log(res)
      }).catch( err=> {
        console.log(err);
      })
    },

    // 单选题数据保存
    SingleChoiceSave(val,item){
      item.subData = val;
      item.Stem=val.question

      this.modifyQuestion(item);
    },


    // 多选数据保存
    MultiChoiceSave(val,item){
      item.subData = val;
      item.Stem=val.question

      this.modifyQuestion(item);
    },

    // 填空数据保存
    FillBlankSave(val,item){
      item.subData = val;
      item.Stem=val.Questionnaire
      // console.log(val)

      this.modifyQuestion(item);
    },

    // 评价数据保存
    EvaluateSave(val,item){
      item.subData = val;
      item.Stem=val.question

      this.modifyQuestion(item);
    },

    // 增加题目
    addNewQues(type,QuesNum){
      let Opt = {};
      let  pra;
      // 增加选择题
      if (type===0){
        switch (QuesNum) {
          // 增加单选
          case 0:
             Opt = {
               Stem: '单选题标题',
              idx: this.QuesList.length,
              isDraggable: true,
              subData: {},
              type: 'singleChoice',
               id: 0,
            }
              pra = {
                Questionnaire: this.QuesId,
              Type: 1,
              MinChoice: 1,
              MaxChoice: 1,
              Stem: Opt.Stem,
                username: this.$store.state.personalInfo.username,
              Number: Opt.idx,
            }

            this.addNewQuestionToBackend(Opt,pra)

            // this.addNewQuesToQuesList(Opt);
            break;

            // 增加多选
          case 1:
            console.log('增加多选')
             Opt = {
               Stem: '多选题标题',
              idx: this.QuesList.length,
              isDraggable: true,
              subData: {},
              type: 'multiChoose'
            }

            pra = {
              Questionnaire: this.QuesId,
              Type: 2,
              MinChoice: 1,
              MaxChoice: 2,
              Stem: Opt.Stem,
              Number: Opt.idx,
              username: this.$store.state.personalInfo.username
            }
            this.addNewQuestionToBackend(Opt,pra)
            // this.addNewQuesToQuesList(Opt);
            break;

            // 增加下拉菜单
          case 2:
            console.log('增加下拉菜单')
            break;
        }
      }
      // 增加填空题
      else if (type===1){
        Opt = {
          Stem: '填空题标题',
          idx: this.QuesList.length,
          isDraggable: true,
          subData: {},
          type: 'fillBlank'
        }

        pra = {
          Questionnaire: this.QuesId,
          Type: 3,
          Stem: Opt.Stem,
          username: this.$store.state.personalInfo.username,
          Number: Opt.idx,
        }

        this.addNewQuestionToBackend(Opt,pra)
        // this.addNewQuesToQuesList(Opt);
      }
      // 增加评分题
      else if (type===2){
        Opt = {
          Stem: '评分题标题',
          idx: this.QuesList.length,
          isDraggable: true,
          subData: {},
          type: 'evaluate'
        }

        pra = {
          Questionnaire: this.QuesId,
          Type: 4,
          Stem: Opt.Stem,
          Number: Opt.idx,
          username: this.$store.state.personalInfo.username
        }

        this.addNewQuestionToBackend(Opt,pra)
        // this.addNewQuesToQuesList(Opt);
      }
    },

    // 增加新题目,向后端请求题目id
    addNewQuestionToBackend(Opt,pra){
      request({
        url: '/question/createQuestion',
        method: 'post',
        data: pra,
      }).then(res=>{
        console.log(res)
        if (res.data.Message === 'Success'){
          this.$message({
            showClose: true,
            message: '创建题目成功',
            type: 'success'
          });
          Opt.id=res.data.id
          this.addNewQuesToQuesList(Opt);
        }
        else {
          this.$message({
            showClose: true,
            message: '添加失败',
            type: 'error'
          });
        }

      }).catch(err=>{
        console.log(err)
      })
    },

    // 增加新题目到列表中
    addNewQuesToQuesList(SubjectObj){
      let length = this.QuesList.length;
      this.QuesList.splice(length,0,SubjectObj);
    },

    // 删除题目列表中的题目
    deleteQues(index){
      let quesList = this.QuesList;
      if (quesList.length===0){
        this.$message({
          showClose: true,
          message: '列表为空，不可操作',
          type: 'error'
        });
        return;
      }
      let quesListElement = quesList[index];
      // console.log(quesListElement)
      console.log(quesListElement.id)
      let  deleteItem ={
        id: quesListElement.id,
        username: this.$store.state.personalInfo.username
      }
      request({
        url: '/question/deleteQuestion',
        method: 'post',
        data: deleteItem
      }).then(res=> {
        console.log(res)
        if (res.data.Message === 'Success'){
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
        }
      }).catch(err=>{
        console.log(err)
      })
      quesList.splice(index,1);
      for (let i = 0; i < quesList.length; i++) {
        quesList[i].idx=i;
        this.modifyQuestion(quesList[i]);
      }
    },


    // 上移
    moveUp(index){
      // console.log('上')
      // console.log(this.QuesList)
      let quesList = this.QuesList;
      if (index===0){
        this.$message({
          showClose: true,
          message: '已在最前，不可上移',
          type: 'error'
        });
        return;
      }
      //
      let src = quesList[index];
      let dest = quesList[index-1];
      // console.log(src)
      // console.log(dest)
      quesList.splice(index,1,dest);
      quesList.splice(index-1,1,src);
      // console.log(this.QuesList)
      // for (let i = 0; i <= index; i++) {
      //   console.log(quesList[i])
      //   // quesList[i].idx=i;
      // }
      for (let i = 0; i <= index; i++) {
        // console.log(quesList[i])
        quesList[i].idx=i;
        this.modifyQuestion(quesList[i]);
      }
    },

    // 下移
    moveDown(index){
      // console.log('下')
      // console.log(this.QuesList)
      let quesList = this.QuesList;
      if (index===quesList.length-1){
        this.$message({
          showClose: true,
          message: '已在最后，不可下移',
          type: 'error'
        });
        return;
      }
      let src = quesList[index];
      let dest = quesList[index+1];
      quesList.splice(index,1,dest);
      quesList.splice(index+1,1,src);
      for (let i = 0; i < quesList.length; i++) {
        quesList[i].idx=i;
        this.modifyQuestion(quesList[i]);
      }
    },



    // 快速导航
    IndexNav(index){
      let QuesItems = document.querySelector(".QuesList").children;
      let height = 0;
      for (let i = 0; i < index; i++) {
        height+=QuesItems[i].clientHeight;
      }
      this.$refs.vs.scrollTo({
        y: height
      },
          500,
          "easeInQuad"
      )

    },


    // 判断鼠标是否经过子组件
    OverDrag(index,item){
      item.isDraggable=false;
    },


    // 判断鼠标离开组件
    LeaveDrag(index,item){
      item.isDraggable=true;
    },

    // 切换工具栏
    changeDesignTools(idx){
      this.ShowNum=idx
      console.log(this.ShowNum)
    },


    handleDragStart(e,item){
      this.dragging = item;
    },
    handleDragEnd(e,item){
      this.dragging = null
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e,item){
      e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件

      if(item === this.dragging){
        return
      }

      const newItems = [...this.QuesList]

      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      newItems.splice(dst, 0, ...newItems.splice(src, 1))

      for (let i = 0; i < newItems.length; i++) {
        newItems[i].idx=i;
        this.modifyQuestion(newItems[i]);
      }

      this.QuesList = newItems
    },

    // 接受输入的问卷标题
    acceptQuesTitle(Ques){
      let params = this.$route.params;
      this.QuesTitle=Ques.title;
      this.QuesText = Ques.Text;
      this.QuesId = Ques.id===0?params.id:Ques.id;
      localStorage.QuesId = this.QuesId
      localStorage.QuesText = this.QuesText
      localStorage.QuesTitle = this.QuesTitle
      // this.Questionnaire.id = this.QuesId
      // this.Questionnaire.title = this.QuesTitle
      // this.Questionnaire.Text = this.QuesText
      console.log(typeof this.QuesId)
      // this.getQuestionnaire(this.QuesId)
    },


    // 从发布页面接受原先的问卷继续设计
    continueDesign(Ques){
      let params = this.$route.params;
      this.QuesId = Ques.id===0?params.id:Ques.id;
      this.QuesTitle = Ques.title;
      this.QuesText = Ques.Text;
      // console.log(this.QuesId)
      // this.QuesList = Ques.Question
      this.isShowQuesNum = Ques.isShowSubNum
      // this.getQuestionnaire(this.QuesId)
    },

    // 调整问卷格式
    adjustDataStruct(Questionnaire){
      let Ques = {
        id: Questionnaire.id,
        Title: Questionnaire.Title,
        // CreateUser: '',
        CreateTime: Questionnaire.CreateTime,
        UpdateTime: Questionnaire.UpdateTime,
        ReleaseTime: Questionnaire.ReleaseTime ,
        ShowNumber: Questionnaire.ShowNumber,
        Open: Questionnaire.Open,
        Text: Questionnaire.Text,
        Question: [],
      }
      this.isShowQuesNum = Questionnaire.ShowNumber
      this.QuesText = Questionnaire.Text
      this.QuesTitle = Questionnaire.Title

      let Questions = Questionnaire.Question.sort(function(a,b){
        return a.Number - b.Number;
      });


      this.QuesList = [];
      for (let i = 0; i < Questions.length; i++) {
        let questionItem = Questions[i];
        // console.log(questionItem)
        let type ;
        let QuesInfo ;
        switch (questionItem.Type) {
          case 1 :
            type='singleChoice';
            console.log(questionItem.Describe)
            QuesInfo ={
              id:"",
              number:"",
              edit:0,
              describe: questionItem.Describe,
              question: questionItem.Stem,
              choices:[],
              radio: 0,
              Must:questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              QuesInfo.choices.push(questionItem.Choice[j].Text);
            }
            // console.log(QuesInfo)
            break;
          case 2 :
            type='multiChoose';
            QuesInfo = {
              edit:0,
              describe:questionItem.Describe,
              question:questionItem.Stem,
              choices:[],
              radio:[],
              max:questionItem.MaxChoice,
              min:questionItem.MinChoice,
              Must:questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              QuesInfo.choices.push(questionItem.Choice[j].Text);
            }
            break;
          case 3 :
            type='fillBlank';
            QuesInfo = {
              id:"",
              Number:"",
              edit:0,
              describe:questionItem.Describe,
              Questionnaire:questionItem.Stem,
              Must: questionItem.Must,
              Answer:""
            }
            break;
          case 4 :
            type='evaluate';
            QuesInfo = {
              edit:0,
              question:questionItem.Stem,
              score:null,
              describe:questionItem.Describe,
              describes:[],
              level:[],
              radio:[],
              Must: questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              let choiceElement = questionItem.Choice[j];
              QuesInfo.describes.push(choiceElement.Text);
              QuesInfo.level.push(choiceElement.Score);
            }
            // console.log(QuesInfo)
            break;
        }
        let DesignQuestionItem = {
          Stem: questionItem.Stem,
          idx: questionItem.Number,
          isDraggable: true,
          subData: QuesInfo,
          type: type,
          id: questionItem.id
        }
        this.QuesList.push(DesignQuestionItem)
      }
      // console.log(this.QuesList)
      Ques.Question = this.QuesList
      this.Questionnaire = Ques
      // console.log(Questionnaire);
    },

    // 向后端发送请求接受问卷信息
    getQuestionnaire(){
      console.log(typeof this.QuesId)
      console.log(this.QuesId)
      // 获取问卷
      request({
        url: '/question/questionnaireID',
        method: 'get',
        params: {
          id: this.QuesId
        }
      }).then(res=>{
        console.log(res);
        // this.Questionnaire.id = this.QuesId
        // this.Questionnaire.title = this.QuesTitle
        // this.Questionnaire.Text = this.QuesText
        if (res.data.Message !== 'No Such Questionnaire'){
          this.adjustDataStruct(res.data.Questionnaire);
        }
      }).catch(err=>{
        // console.log(err)
      })
    },

  },
  mounted() {
    this.Questionnaire.id = this.QuesId

    if (localStorage.QuesId){
      this.QuesId = Number(localStorage.QuesId);
      // console.log(this.QuesId)
    }

    if (localStorage.QuesTitle){
      this.QuesTitle = localStorage.QuesTitle
    }

    if (localStorage.QuesText){
      this.QuesText = localStorage.QuesText
    }
  },

  created() {
    // 从创建页面转到设计页面
    bus.$on('createNewQues',this.acceptQuesTitle)

    // 从发布页面转会设计页面
    bus.$on('backToDesign',this.continueDesign)

    // console.log(this.QuesId)

    setTimeout(this.getQuestionnaire,200);

  },
  watch: {
    QuesList(newList,oldList){
      this.QuesList=newList;
      // console.log(this.QuesList)
      // this.ShowOptions();
    },

    QuesId(newID){
      localStorage.QuesId = newID
      console.log(localStorage.QuesId)
    },

    QuesTitle(newTitle){
      localStorage.QuesTitle = newTitle
    },

    QuesText(newText){
      localStorage.QuesText = newText
    },

    Questionnaire(newText){
      localStorage.Questionnaire = newText
    }
  }
}
</script>

<style scoped>
  .designPage {
    width: 100vw;
    height: 100vh;
    background-color: #E6E6E6;
  }
  .designNav {
    background-color: #380B61;
    height: 6vh;
    position: relative;
  }

  .designNav .QuesPreview {
    height: 100%;
    background-color: white;
    color: #58ACFA;
    width: 7%;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10%;
    top: 0;
    transition: .4s all ease-in-out;
  }

  .designNav .QuesPreview:hover {
    background-color: #58ACFA;
    color: white;
    cursor: pointer;
  }

  .designNav .release {
    height: 100%;
    width: 10%;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
    position: absolute;
    top: 0;
    right: 5%;
    transition: .4s all ease-in-out;
  }

  .designNav .release:hover {
    background-color: white;
    color: #58ACFA;
    cursor: pointer;
  }

  .designContent {
    width: 80vw;

    box-sizing: border-box;
    height: 94vh;
    /*background-color: white;*/
    padding-top: 10px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 7fr;
    column-gap: 15px;
  }

  .designContent .designComponent {
    background-color: white;
    box-sizing: border-box;
    height: 92vh;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    /*box-sizing: border-box;*/
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .designContent .designComponent .ShowCntl {
    /*background-color: pink;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7%;
    font-weight: 600;
  }

  .designContent .designComponent .ShowCntl div {
    width: 50%;
    height: 70%;
    box-sizing: border-box;
    transition: .4s;
  }

  .designContent .designComponent .ShowCntl div:hover {
    cursor: pointer;
  }

  .designContent .designComponent .ShowCntl .active {
    border-bottom: 2px solid #A4A4A4;
    color: #CC2EFA;
    box-sizing: border-box;
    transition: .4s;
  }

  .designContent .designComponent .components {
    /*background-color: greenyellow;*/
    height: 90%;
  }

  .designContent .designComponent .components .choices {
    /*background-color: pink;*/
    /*height: 20%;*/
  }

  .designContent .designComponent .components .choices .title {
    width: 100%;
    /*background-color: blue;*/
    height: 50px;
    text-align: left;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .designContent .designComponent .components .choices ul {
    display: flex;
    justify-content: space-around;
    /*height: 70%;*/
    flex-direction: column;
    /*align-content: space-around;*/
  }
  .designContent .designComponent .components .choices ul li {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    text-align: left;
    margin-left: 20px;

  }

  .designContent .designComponent .components .choices ul li:hover {
    color: #58ACFA;
    cursor: pointer;
  }


  .designContent .designComponent .outline {
    /*background-color: skyblue;*/
    height: 90%;
  }

  .designContent .designComponent .outline .outlineItem {
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    line-height: 30px;
    text-align: start;
  }

  .designContent .designPreview {
    /*background-color: blue;*/
    box-sizing: border-box;
    height: 92vh;
    /*position: relative;*/
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
  }


  .designContent .designPreview  .QuesBase {
    width: 100%;
    height: 20%;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    /*box-shadow: 10px 10px 10px rgba(0,0,0,.7);*/
    padding-top: 20px ;
    position: relative;
    box-sizing: border-box;
  }

  .designContent .designPreview  .QuesBase .QuesTitle {
    font-size: 22px;
    color: #A4A4A4;
    font-weight: 600;
  }

  .designContent .designPreview  .QuesBase .QuesIntro {
    /*background-color: #58ACFA;*/
    width: 40%;
    height: 30%;
    position: absolute;
    bottom: 20px;
    left: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #A4A4A4;
  }

  .designContent .designPreview  .QuesBase .AutoNumSwitch {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .designContent .designPreview .None {
    background-color: #F2F2F2;
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

  }

  .designContent .designPreview .None .empty_pic {
    width: 50%;
    height: 50%;

  }

  .designContent .designPreview .None .empty_pic img {
    width: 100%;
    height: 100%;

  }

  .designContent .designPreview .None .empty_font {
    width: 100%;
    font-size: 30px;
    font-weight: 600;
    color: #6E6E6E;
    height: 40%;
  }

  .designContent .designPreview .QuesList {
    width: 100%;
    padding-bottom: 138px;
  }

  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    min-height: 130px;
    padding-top: 20px;
    padding-bottom: 10%;
    /*margin: 20px 0;*/
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    position: relative;

    z-index: 44;
  }

  .designContent .designPreview .QuesList .QuesItem .options {
    /*background-color: #58ACFA;*/
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 25px;
    /*display: none;*/
    display: flex;

    justify-content: space-around;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 350px;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li {
    height: 25px;
    width: 20%;
    display: inline-block;
    /*margin: 0;*/
    /*padding: 0;*/
    line-height: 25px;
    /*background-color: pink;*/
    font-size: 14px;
    color: #A4A4A4;
    border: 1px solid #A4A4A4;
    /*z-index: 200;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li:hover {
    cursor: pointer;
    border: 1px solid #2E9AFE;
    background-image: linear-gradient(to left,#00FFFF,#01A9DB);
    color: white;
  }

  .designContent .designPreview .QuesList .QuesItem:hover {
    cursor: move;
  }

</style>