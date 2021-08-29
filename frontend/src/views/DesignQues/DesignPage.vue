<template>
  <div class="designPage">
    <nav class="designNav">
      <div class="QuesPreview" @click="goPreview">
        <i class="el-icon-zoom-in"></i>
        预览
      </div>

      <div class="BackHome">

      </div>

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

<!--          <div class="choices" v-for="(item,index) in QuesTypeList">-->
<!--&lt;!&ndash;            <div class="title"> {{ item.type }}</div>&ndash;&gt;-->

<!--          </div>-->
          <div v-if="Questionnaire.Type === 2">
            <el-collapse v-model="activeName" v-for="(item,index) in VoteQuesTypeList">
              <el-collapse-item :name="index" class="choices">
                <template slot="title">
                  <div class="title">
                    <i class="el-icon-stopwatch"></i>
                    {{ item.type }}</div>
                </template>
                <ul ref="choices">
                  <li v-for="(i,idx) in item.details" @click="addNewQues(item.type,idx)">{{i}}</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div v-else-if="Questionnaire.Type === 5">
            <el-collapse v-model="activeName" v-for="(item,index) in AntiVirus">
              <el-collapse-item :name="index" class="choices">
                <template slot="title">
                  <div class="title">
                    <i class="el-icon-stopwatch"></i>
                    {{ item.type }}</div>
                </template>
                <ul ref="choices">
                  <li v-for="(i,idx) in item.details" @click="addNewQues(item.type,idx)">{{i}}</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div v-else-if="Questionnaire.Type === 4">
            <el-collapse v-model="activeName" v-for="(item,index) in ExamQuesTypeList">
              <el-collapse-item :name="index" class="choices">
                <template slot="title">
                  <div class="title">
                    <i class="el-icon-stopwatch"></i>
                    {{ item.type }}</div>
                </template>
                <ul ref="choices">
                  <li v-for="(i,idx) in item.details" @click="addNewQues(item.type,idx)">{{i}}</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>


          <div v-else>
            <el-collapse
                v-model="activeName"
                v-for="(item,index) in QuesTypeList" >
              <el-collapse-item :name="index" class="choices">
                <template slot="title">
                  <div class="title">
                    <i class="el-icon-stopwatch"></i>
                    {{ item.type }}
                  </div>
                </template>
                <ul ref="choices">
                  <li v-for="(i,idx) in item.details" @click="addNewQues(item.type,idx)">{{i}}</li>
                </ul>

              </el-collapse-item>
            </el-collapse>
          </div>


          <div class="choicesPreview" ref="choicesPreview">
            <div class="arrow"></div>
            <div>
              <SingleChoose v-if="ItemPreviewType==='singleChoice'" ref="child"></SingleChoose>

              <MultiChoose v-else-if="ItemPreviewType==='multiChoose'" ref="child"></MultiChoose>

              <FillBlank v-else-if="ItemPreviewType==='fillBlank'" ref="child"></FillBlank>

              <Evaluate v-else-if="ItemPreviewType==='evaluate'" ref="child"></Evaluate>

              <VoteSingleChoose v-else-if="ItemPreviewType==='VoteSingleChoose'" ref="child"></VoteSingleChoose>

              <Position v-else-if="ItemPreviewType==='Position'" ref="child"></Position>
            </div>
          </div>

        </div>


<!--        该问卷的大纲-->
        <div class="outline" v-else>
          <ul ref="outline_nav">
            <li class="outlineFirstItem">
              {{ QuesTitle }}
            </li>
            <li v-for="(item,index) in QuesList" class="outlineItem" @click="IndexNav(index)">
              <span>{{ item.idx + 1 }}. </span>
              {{ item.Stem }}
            </li>
          </ul>
        </div>

      </div>


      <div class="designPreview">

          <div class="QuesBase" >
            <div class="QuesTitle" @click="editQuestionnaireHead">{{ QuesTitle }}</div>

            <div class="QuesIntro" @click="editQuestionnaireHead">
              点击可修改问卷信息
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
          <ul class="QuesList" v-if="QuesList.length!==0" ref="list">
              <li class="QuesItem" v-for="(item,index) in QuesList" :key="item.idx" :draggable="true"
                  @dragstart="handleDragStart($event,item)"
                  @dragover.prevent="handleDragOver($event)"
                  @dragenter="handleDragEnter($event,item)"
                  @dragend="handleDragEnd($event,item)">

<!--                {{ item.Stem }}-->
                <span v-if="isShowQuesNum">{{ item.idx + 1 }}. </span>
                <span v-else></span>
                <div class="componentsItem">
                  <SingleChoose v-if="item.type==='singleChoice'" ref="child"
                                @SaveQes="SaveQes($event,item)"
                                :item-index="index"
                                :father-data="item.subData"></SingleChoose>

                  <MultiChoose v-else-if="item.type==='multiChoose'" ref="child"
                               @SaveQes="SaveQes($event,item)"
                               :father-data="item.subData"
                               :item-index="index"></MultiChoose>

                  <FillBlank v-else-if="item.type==='fillBlank'" ref="child"
                              :father-data="item.subData"
                             :item-index="index"
                              @SaveQes="SaveQes($event,item)"></FillBlank>

                  <Evaluate v-else-if="item.type==='evaluate'" ref="child"
                            :father-data="item.subData"
                            :item-index="index"
                            @SaveQes="SaveQes($event,item)"></Evaluate>


                  <VoteSingleChoose v-else-if="item.type==='VoteSingleChoose'" ref="child"
                                    :father-data="item.subData"
                                    :item-index="index"
                                    @SaveQes="SaveQes($event,item)"></VoteSingleChoose>


                  <VoteMChoose v-else-if="item.type==='VoteMultiChoose'" ref="child"
                               :father-data="item.subData"
                               :item-index="index"
                               @SaveQes="SaveQes($event,item)"></VoteMChoose>

                  <Position v-else-if="item.type==='Position'" ref="child"
                      :father-data="item.subData"
                      :item-index="index"
                      @SaveQes="SaveQes($event,item)"></Position>

                  <ExamSingleChoose v-else-if="item.type==='ExamSingleChoose'" ref="child"
                                    :father-data="item.subData"
                                    :item-index="index"
                                    @SaveQes="SaveQes($event,item)"></ExamSingleChoose>

                  <ExamMChoose v-else-if="item.type ==='ExamMChoose'" ref="child"
                               :father-data="item.subData"
                               :item-index="index"
                               @SaveQes="SaveQes($event,item)"></ExamMChoose>
                </div>


                <div class="options">
                  <ul>
                    <li @click="deleteQues(index)">
                      <i class="el-icon-delete"></i>
                      删除
                    </li>
                    <li @click="moveUp(index)">
                      <i class="el-icon-caret-top"></i>
                      上移
                    </li>
                    <li @click="moveDown(index)">
                      <i class="el-icon-caret-bottom"></i>
                      下移
                    </li>

                    <li @click="changeQuestions(index)">
                      <i class="el-icon-edit-outline"></i>
                      修改
                    </li>
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



        <div class="quickbtn">

        </div>

      </div>

<!--      编辑问卷侧边栏-->
      <div class="editQuestion">
<!--        该题目基本信息-->
        <div class="quesInfo">
        </div>
        <div class="editContain">
          <vue-scroll ref="editScroll"
                      :ops="editScroll" >

            <el-card class="box-card">
              <div class="editTitle">
                题目编辑
              </div>
              <el-divider></el-divider>
              <div v-if="isCanChangeItem">
                <SingleChooseEdit v-if="editingQuestion.type === 'singleChoice'"
                                  :father-data="editingQuestion.subData"
                                  :need-send-idx="editingQuestion.index"
                                  ref="childEdit"></SingleChooseEdit>
                <MultiChooseEdit v-else-if="editingQuestion.type === 'multiChoose'"
                                 :father-data="editingQuestion.subData"
                                 :need-send-idx="editingQuestion.index"
                                 ref="childEdit"></MultiChooseEdit>
                <EvaluateEdit v-else-if="editingQuestion.type === 'evaluate'"
                              :father-data="editingQuestion.subData"
                              :need-send-idx="editingQuestion.index"
                              ref="childEdit"></EvaluateEdit>
                <FillBlankEdit v-else-if="editingQuestion.type === 'fillBlank'"
                               :father-data="editingQuestion.subData"
                               :need-send-idx="editingQuestion.index"
                               ref="childEdit"></FillBlankEdit>

                <VoteSingleChooseEdit v-else-if="editingQuestion.type === 'VoteSingleChoose'"
                                      :father-data="editingQuestion.subData"
                                      :need-send-idx="editingQuestion.index"
                                      ref="childEdit"></VoteSingleChooseEdit>

                <VoteMultiChooseEdit v-else-if="editingQuestion.type === 'VoteMultiChoose'"
                                     :father-data="editingQuestion.subData"
                                     :need-send-idx="editingQuestion.index"
                                     ref="childEdit"></VoteMultiChooseEdit>

                <PositionEdit  v-else-if="editingQuestion.type === 'Position'"
                              :father-data="editingQuestion.subData"
                              :need-send-idx="editingQuestion.index"
                              ref="childEdit"></PositionEdit>

                <ExamSingleChooseEdit v-else-if="editingQuestion.type === 'ExamSingleChoose'"
                                      :father-data="editingQuestion.subData"
                                      :need-send-idx="editingQuestion.index"
                                      ref="childEdit"></ExamSingleChooseEdit>

                <ExamMultiChooseEdit v-else-if="editingQuestion.type === 'ExamMChoose'"
                                     :father-data="editingQuestion.subData"
                                     :need-send-idx="editingQuestion.index"
                                     ref="childEdit"></ExamMultiChooseEdit>

<!--                <VoteMChoose v-else-if=""></VoteMChoose>-->

<!--                <VoteSingleChoose v-else-if="editingQuestion.type === 'VoteSingleChoose'"-->
<!--                                  :father-data="editingQuestion.subData"-->
<!--                                  :need-send-idx="editingQuestion.index"-->
<!--                                  ref="childEdit"></VoteSingleChoose>-->
              </div>


              <div v-else>
                <el-result icon="success" title="编辑完成" >
                </el-result>
              </div>
            </el-card>
          </vue-scroll>
        </div>
      </div>

      <el-dialog title="修改问卷头信息" :visible.sync="dialogFormVisible">
        <el-form >
          <el-form-item label="问卷标题">
            <el-input v-model="QuesTitle" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>

          <el-form-item label="问卷描述">
            <el-input v-model="QuesText" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Confirm">确定修改</el-button>
        </div>


      </el-dialog>

    </div>

  </div>

</template>

<script>
import SingleChoose from "../../components/QuestionTemplates/SingleChoose";
import bus from "../../assets/utils/bus";
import MultiChoose from "../../components/QuestionTemplates/MultiChoose";
import FillBlank from "../../components/QuestionTemplates/FillBlank";
import Evaluate from "../../components/QuestionTemplates/Evaluate";
import SingleChooseEdit from "../../components/QuestionTemplates/TemplatesEdit/SingleChooseEdit";
import {request} from "../../network/request";
import MultiChooseEdit from "../../components/QuestionTemplates/TemplatesEdit/MultiChooseEdit";
import EvaluateEdit from "../../components/QuestionTemplates/TemplatesEdit/EvaluateEdit";
import FillBlankEdit from "../../components/QuestionTemplates/TemplatesEdit/FillBlankEdit";
import VoteSingleChooseEdit from "../../components/QuestionTemplates/VoteTemplates/Edit/VoteSingleChooseEdit";
import VoteSingleChoose from "../../components/QuestionTemplates/VoteTemplates/View/VoteSingleChoose";
import VoteMChoose from "../../components/QuestionTemplates/VoteTemplates/View/VoteMChoose";
import VoteMultiChooseEdit from "../../components/QuestionTemplates/VoteTemplates/Edit/VoteMultiChooseEdit";
import Position from "../../components/QuestionTemplates/BattleVirus/View/Position";
import PositionEdit from "../../components/QuestionTemplates/BattleVirus/Edit/PositionEdit";
import ExamSingleChoose from "../../components/QuestionTemplates/Exam/View/ExamSingleChoose";
import ExamSingleChooseEdit from "../../components/QuestionTemplates/Exam/Edit/ExamSingleChooseEdit";
import ExamMChoose from "../../components/QuestionTemplates/Exam/View/ExamMChoose";
import ExamMultiChooseEdit from "../../components/QuestionTemplates/Exam/Edit/ExamMultiChooseEdit";


export default {
  name: "DesignPage",
  components:{
    FillBlankEdit,
    EvaluateEdit,
    MultiChooseEdit,
    SingleChoose,
    MultiChoose,
    FillBlank,
    Evaluate,
    SingleChooseEdit,
    VoteSingleChoose,
    VoteSingleChooseEdit,
    VoteMChoose,
    VoteMultiChooseEdit,
    Position,
    PositionEdit,
    ExamSingleChoose,
    ExamSingleChooseEdit,
    ExamMChoose,
    ExamMultiChooseEdit,

  },
  data(){
    return {

      // 当前编辑的题目
      editingQuestion: {
        type: '',
        subData: {},
        index: -1,
      },

      dialogFormVisible: false,
      activeName: 0,
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
          /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
          locking: true,
        },
        scrollPanel: {},
        rail: {
          background: '#A9F5F2',
          opacity: .2,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {
          showDelay: 300,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#2ECCFA',
          opacity: .8,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      },

      editScroll: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
          /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
          locking: true,
        },
        scrollPanel: {},
        rail: {
          background: '#A9F5F2',
          opacity: .8,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {
          showDelay: 300,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#2ECCFA',
          opacity: .8,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
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

      // 带有特殊题型的问题列表
      // 投票问题列表
      VoteQuesTypeList: [
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
        {
          type: '投票题型',
          details: [
            '投票单选',
            '投票多选',
          ],
        }
      ],

      // 考试问题列表
      ExamQuesTypeList: [
        // 选择
        {
          type: '选择题',
          details: [
            '单选题',
            '多选题',
          ]
        },
        {
          type: '填空',
          details: [
            '填空',
          ]
        },
      ],

      // 疫情打卡问卷
      AntiVirus: [
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
        {
          type: '获取定位',
          details: [
            '获取定位',
          ],
        }
      ],

      ShowNum: 0,

      // 以下为需要传给后端进行保存的数据
      // 是否开启自动显示题号
      isShowQuesNum: false,


      // 是否可以修改题目
      isCanChangeItem: true,

      // 问卷ID
      QuesId: 0,

      // 问卷标题
      QuesTitle: 'title',

      // 问卷描述
      QuesText: '',

      // 问卷问题列表
      QuesList: [

      ],

      // 题目预览的类型值
      ItemPreviewType: 0,

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
        isShowSubNum: false,

        Type: 1,
        Settings: {},
        EncodeID: '',
      },

      // 当前正在拖动的元素
      dragging: null,
    }
  },
  beforeDestroy() {
    bus.$emit('NewQuesDesigned',this.Questionnaire)
  },
  methods: {

    Confirm(){
      this.Questionnaire.Text = this.QuesText;
      this.Questionnaire.title = this.QuesTitle;
      this.dialogFormVisible = false;
    },

    // 编辑题目标题及说明
    editQuestionnaireHead(){
      this.dialogFormVisible = true;
    },


    // 进行预览
    goPreview(){
      let psthH = '/answer/'+this.Questionnaire.EncodeID
      this.$router.push({
        path: psthH,
        query: {
          Mode: 'preview',
        }
      })
    },

    // 转到发布页面
    sendRequest(){
      this.$router.push({
        path: '/release',
        query: {
          username: this.$route.query.username,
          id: this.QuesId
        }
      });
    },

    // 问卷编辑完成，转到问卷发布页面
    designDone(){
      bus.$emit('SaveEdited',this.editingQuestion.index)

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
        username: this.$route.query.username,
      }
      FinalQuestionnaire.id = this.QuesId;
      FinalQuestionnaire.Title = Ques.title;
      FinalQuestionnaire.Text = Ques.Text;
      // FinalQuestionnaire.Open = Ques.Open;
      FinalQuestionnaire.ShowNumber = Ques.isShowSubNum;
      for (let i = 0; i < Ques.Question.length; i++) {
        console.log(Ques.Question[i])
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




    // 展示题目预览
    showChoicesPreview(){
      let choices = this.$refs.choices;
      // console.log(choices)
      let timer=null;
      let choicesPreview = this.$refs.choicesPreview;
      let self = this
      for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];

        // console.log(choice)
        let li = choice.children;
        for (let j = 0; j < li.length; j++) {
          let liElement = li[j];
          // console.log('i:',i,'j:',j)

          // console.log(liElement)
          // console.log(this.ItemPreviewType)
          liElement.addEventListener('mouseover',function () {
            if (i===0 ){
              switch (j) {
                case 0:
                  self.ItemPreviewType = 'singleChoice';
                  break;
                case 1:
                  self.ItemPreviewType = 'multiChoose';
                  break;
              }
            }

            else if (i===1){
              self.ItemPreviewType  = 'fillBlank';
            }
            else if (i===2){
              self.ItemPreviewType  = 'evaluate';
            }
            else if (i===3){
              if (self.Questionnaire.Type === 2){
                switch (j) {
                  case 0:
                    self.ItemPreviewType  = 'VoteSingleChoose';
                    break;
                    case 1:
                      this.ItemPreviewType = 'VoteMultiChoose';
                      break;
                }
              }
              else if (self.Questionnaire.Type === 5){
                switch (j) {
                  case 0:
                    self.ItemPreviewType  = 'Position';
                    break;
                    // case 1:
                    //   this.ItemPreviewType = 'multiChoose';
                    //   break;
                }
              }

            }
            // console.log(self.ItemPreviewType )
            let top = liElement.offsetTop;
            timer = setTimeout(function () {
              choicesPreview.style.top = top+'px';
              choicesPreview.style.display = 'block'
            },500)


          })
          liElement.addEventListener('mouseout',function () {
            // let top = liElement.offsetTop;
            choicesPreview.style.display = 'none'
            clearTimeout(timer);
            // choicesPreview.style.top = top
          })
        }
        // console.log(li)
      }
      // for (let i = 0; i < choic; i++) {
      //
      // }
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

        case 'VoteSingleChoose' :
          type=6;
          break;

        case 'VoteMultiChoose' :
          type=7;
          break;

        case 'Position' :
          type=5;
          break;
        case 'ExamSingleChoose' :
          type=1;
          break;

        case 'ExamMChoose' :
          type=2;
          break;

      }
      if (mode==='sendQuestion'){
         Question = {
          id: item.id===undefined?0:item.id,
          Stem: item.Stem,
          Type: type,
           // MaxChoice: item.max===undefined?
           MaxChoice: item.subData.max===undefined?0:item.subData.max,
           MinChoice: item.subData.min===undefined?0:item.subData.min,
          Questionnaire: this.QuesId===undefined?0:this.QuesId,
          Must: item.subData.Must===undefined?false:item.subData.Must,
          Number: item.idx,
          Choice: [],

          Describe: item.subData.describe,
          username: this.$route.query.username
        }
      }
      else {
         Question = {
          id: item.id===undefined?0:item.id,
          Stem: item.Stem,
          Type: type,
           MaxChoice: item.subData.max===undefined?0:item.subData.max,
           MinChoice: item.subData.min===undefined?0:item.subData.min,
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
      console.log('Quesion',Question);
      return Question;
    },


    modifyQuestionSuccess(item){
      // console.log("aaa")
      // console.log(item)
      let Question = this.changeDataStructToBackend(item,'sendQuestion');

      // console.log(Question)
      request({
        url: '/question/modifyQuestion',
        method: 'post',
        data: Question
      }).then(res=>{
        this.$message.success("题目 "+ (item.idx+1) +" 保存成功")
      }).catch( err=> {
        console.log(err);
      })
    },

    // 题目修改保存
    modifyQuestion(item){
      // console.log("aaa")
      // console.log(item)
      this.isCanChangeItem = false;

      let Question = this.changeDataStructToBackend(item,'sendQuestion');

      // console.log(Question)
      request({
        url: '/question/modifyQuestion',
        method: 'post',
        data: Question
      }).then(res=>{
      }).catch( err=> {
        console.log(err);
      })
    },

    // 题目数据保存
    SaveQes(val, item){
      item.subData = val;
      item.Stem=val.question
      console.log("SaveQes")
      this.modifyQuestionSuccess(item);
    },




    // 填空数据保存
    // SaveQes(val, item){
    //   item.subData = val;
    //   item.Stem=val.Questionnaire
    //   // console.log(val)
    //
    //   this.modifyQuestion(item);
    // },



    // 增加题目
    addNewQues(type,QuesNum){
      console.log(type)
      let Opt = {};
      let  pra;
      // 增加选择题
      if (type==='选择'){
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
                username: this.$route.query.username,
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
              username: this.$route.query.username,
            }
            this.addNewQuestionToBackend(Opt,pra)
            // this.addNewQuesToQuesList(Opt);
            break;
        }
      }

      // 增加填空题
      else if (type==='填空'){
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
          username: this.$route.query.username,
          Number: Opt.idx,
        }

        this.addNewQuestionToBackend(Opt,pra)
        // this.addNewQuesToQuesList(Opt);
      }
      // 增加评分题
      else if (type==='评分'){
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
          username: this.$route.query.username,
        }

        this.addNewQuestionToBackend(Opt,pra)
        // this.addNewQuesToQuesList(Opt);
      }

      else if (type==='投票题型'){
        if (QuesNum === 0){
          Opt = {
            Stem: '投票单选',
            idx: this.QuesList.length,
            isDraggable: true,
            subData: {},
            type: 'VoteSingleChoose'
          }

          pra = {
            Questionnaire: this.QuesId,
            Type: 6,
            Stem: Opt.Stem,
            Number: Opt.idx,
            username: this.$route.query.username,
          }
          console.log(typeof pra.Type)
          this.addNewQuestionToBackend(Opt,pra)
        }
        else if (QuesNum === 1) {
          Opt = {
            Stem: '投票多选',
            idx: this.QuesList.length,
            isDraggable: true,
            subData: {},
            type: 'VoteMultiChoose'
          }

          pra = {
            Questionnaire: this.QuesId,
            Type: 7,
            Stem: Opt.Stem,
            Number: Opt.idx,
            username: this.$route.query.username,
          }
          this.addNewQuestionToBackend(Opt,pra)
        }
      }

      else if (type==='获取定位'){
        if (QuesNum === 0){
          Opt = {
            Stem: '获取定位',
            idx: this.QuesList.length,
            isDraggable: true,
            subData: {},
            type: 'Position'
          }

          pra = {
            Questionnaire: this.QuesId,
            Type: 5,
            Stem: Opt.Stem,
            Number: Opt.idx,
            username: this.$route.query.username,
          }
          console.log(typeof pra.Type)
          this.addNewQuestionToBackend(Opt,pra)
        }
      }

      else if (type === '选择题'){
        switch (QuesNum) {
            // 增加单选
          case 0:
            Opt = {
              Stem: '单选题',
              idx: this.QuesList.length,
              isDraggable: true,
              subData: {},
              type: 'ExamSingleChoose',
              id: 0,
            }
            pra = {
              Questionnaire: this.QuesId,
              Type: 1,
              MinChoice: 1,
              MaxChoice: 1,
              Stem: Opt.Stem,
              username: this.$route.query.username,
              Number: Opt.idx,
            }

            this.addNewQuestionToBackend(Opt,pra)

            // this.addNewQuesToQuesList(Opt);
            break;

            // 增加多选
          case 1:
            console.log('增加多选')
            Opt = {
              Stem: '多选题',
              idx: this.QuesList.length,
              isDraggable: true,
              subData: {},
              type: 'ExamMChoose'
            }

            pra = {
              Questionnaire: this.QuesId,
              Type: 2,
              MinChoice: 1,
              MaxChoice: 2,
              Stem: Opt.Stem,
              Number: Opt.idx,
              username: this.$route.query.username,
            }
            this.addNewQuestionToBackend(Opt,pra)
            // this.addNewQuesToQuesList(Opt);
            break;
        }
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

      bus.$emit('SaveEdited',this.editingQuestion.index)
      let length = this.QuesList.length;
      this.isCanChangeItem = true
      console.log(SubjectObj)
      this.QuesList.splice(length,0,SubjectObj);
      this.editingQuestion = SubjectObj;
      this.editingQuestion.index = length
      this.IndexNav(length);
      console.log(this.editingQuestion)
    },

    // 修改题目
    changeQuestions(index){
      console.log('需要改的题目',index)
      bus.$emit('SaveEdited',this.editingQuestion.index)
      let quesList = this.QuesList;
      let quesListElement = quesList[index];
      this.editingQuestion = quesListElement;
      this.editingQuestion.index = index
      this.isCanChangeItem =true;
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
        username: this.$route.query.username,
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
      // this.moveUpQuesAni(index,index-1);
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


    showOptions(){
      if (this.$refs.list) {
        let children = this.$refs.list.children;
        // console.log(children)
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          child.addEventListener("mouseover",function () {
            child.classList.add('QuesItemHover')
            let element = child.querySelector(".options");
            // console.log(element)
            if (!element.classList.contains('OptActive')){
              element.classList.add('OptActive')
            }

          })
          child.addEventListener('mouseout',function () {
            child.classList.remove('QuesItemHover')
            let element = child.querySelector(".options");
            // console.log(element)
            if (element.classList.contains('OptActive')){
              element.classList.remove('OptActive')
            }
            // element.classList.remove('OptActive')
          })
        }
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

      // height-=10*index;
      height -= 8;
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

      bus.$emit('SaveEdited',this.editingQuestion.index)

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
      let params = this.$route.query;
      this.QuesTitle=Ques.title;
      this.QuesText = Ques.Text;
      this.QuesId = Number(params.id)===0?Ques.id:Number(params.id);
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
      let params = this.$route.query;
      this.QuesId = Number(params.id)===0?Ques.id:Number(params.id);
      // this.QuesTitle = Ques.title;
      // this.QuesText = Ques.Text;
      // this.isShowQuesNum = Ques.isShowSubNum
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
        Type: Questionnaire.Type,
        Settings: Questionnaire.Settings,
        EncodeID: Questionnaire.EncodeID
      }
      this.isShowQuesNum = Questionnaire.ShowNumber
      this.QuesText = Questionnaire.Text
      this.QuesTitle = Questionnaire.Title

      console.log('aaa')
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
              Number:questionItem.Number,
              edit:0,
              describe: questionItem.Describe,
              question: questionItem.Stem,
              choices: [],
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
              Number:questionItem.Number,
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
              Number:questionItem.Number,
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
              Number:questionItem.Number,
              Must: questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              let choiceElement = questionItem.Choice[j];
              QuesInfo.describes.push(choiceElement.Text);
              QuesInfo.level.push(choiceElement.Score);
            }
            // console.log(QuesInfo)
            break;
          case 5:
            type='Position';
            QuesInfo = {
              Number: questionItem.Number,
              Position:"",
              id:"",
              choices:[],
              radio: 0,
              //settings
              edit:1,
              Amount:true,

              question:questionItem.Stem,
              describe:questionItem.Describe,
              Must: questionItem.Must,
            }
            // for (let j = 0; j < questionItem.Choice.length; j++) {
            //   let choiceElement = questionItem.Choice[j];
            //   QuesInfo.choices.push(choiceElement.Text);
            // }
            break;
          case 6:
            type='VoteSingleChoose';
            QuesInfo = {
              id:"",
              number:"",
              choices:[],
              radio: 0,
              //settings
              edit:1,
              Amount:true,

              question:questionItem.Stem,
              describe:questionItem.Describe,
              Must: questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              let choiceElement = questionItem.Choice[j];
              QuesInfo.choices.push(choiceElement.Text);
            }
            break;

          case 7:
            type='VoteMultiChoose';
            QuesInfo = {
              id:"",
              number:"",
              choices:[],
              radio: 0,
              //settings
              edit:1,
              Amount:true,
              //settings
              max:questionItem.MaxChoice,
              min:questionItem.MinChoice,
              question:questionItem.Stem,
              describe:questionItem.Describe,
              Must: questionItem.Must,
            }
            for (let j = 0; j < questionItem.Choice.length; j++) {
              QuesInfo.choices.push(questionItem.Choice[j].Text);
            }
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
      this.editingQuestion = Ques.Question[0]===undefined?{}:Ques.Question[0];
      // console.log(this.editingQuestion)
      this.Questionnaire = Ques
      console.log('bbb')
      // console.log(Questionnaire);
    },

    // 向后端发送请求接受问卷信息
    getQuestionnaire(){
      console.log(typeof this.QuesId)
      console.log(this.QuesId)

      this.QuesId = Number(this.$route.query.id)

      // 获取问卷
      request({
        url: '/question/questionnaireID',
        method: 'get',
        params: {
          id: this.QuesId
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          this.adjustDataStruct(res.data.Questionnaire);
        }
      }).catch(err=>{
        // console.log(err)
      })
    },

  },
  updated() {
    // console.log(this.$refs.list)
    this.showChoicesPreview();
    this.showOptions();
  },
  mounted() {
    // this.showOptions();

    // console.log(this.$refs.list);

    this.Questionnaire.id = this.QuesId
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
    },
    editingQuestion(n,o){

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
    background-color: #2E2E2E;
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
    width: 95vw;

    box-sizing: border-box;
    height: 94vh;
    /*background-color: white;*/
    padding-top: 10px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 15fr 50fr 30fr;
    column-gap: 15px;
  }

  .designContent .editQuestion {
    height: 98%;
    /*background-color: pink;*/

  }

  .designContent .editQuestion .quesInfo {
    /*background-color: #58ACFA;*/
    height: 5%;
    width: 95%;
    margin: 0 auto;
    margin-top: 5px;
  }


  .designContent .designComponent {
    background-color: white;
    box-sizing: border-box;
    height: 92vh;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    /*box-sizing: border-box;*/
    padding: 10px;
    /*width: 15vw;*/
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
    position: relative;
    height: 90%;
  }

  .designContent .designComponent .components .choicesPreview {
    /*height: 150px;*/
    width: 600px;
    padding: 5px;
    position: absolute;
    /*overflow: hidden;*/
    left: 15vw;
    display: none;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
    z-index: 99;
  }

  .designContent .designComponent .components .choicesPreview .arrow {
    background-color: white;
    width: 20px;
    height: 20px;
    /*top: 50px;*/
    transform: translate(-30%,50%) rotate(45deg) ;
    /*transform: ;*/
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
    justify-content: start;
    /**/
    flex-direction: row;
    flex-wrap: wrap;
  }
  .designContent .designComponent .components .choices ul li {
    width: 45%;
    /*flex: 40%;*/
    height: 30px;
    margin: 5px;
    /*background-color: red;*/
    text-align: left;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    transition: .4s;
    color: #58ACFA;
    font-weight: 600;
    word-spacing: 5px;
    letter-spacing: 5px;
  }

  .designContent .designComponent .components .choices ul li:hover {
    background-color: #58ACFA;
    cursor: pointer;
    color: white;
    border-radius: 99999px;
  }


  .designContent .designComponent .outline {
    /*background-color: skyblue;*/
    height: 90%;
  }

  .designContent .designComponent .outline .outlineFirstItem {
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    line-height: 30px;
    box-sizing: border-box;
    padding: 10px 5px;
    text-align: start;
    font-size: 18px;
    color: #A4A4A4;
    transition: .4s;
  }
  .designContent .designComponent .outline .outlineItem {
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    line-height: 30px;
    box-sizing: border-box;
    padding: 10px 5px;
    text-align: start;
    transition: .4s all ease-in-out;

  }

  .designContent .designComponent .outline .outlineItem:hover {
    cursor: pointer;
    color: #58ACFA;
    font-weight: 500;
    background-color: #F2F2F2;
  }

  .designContent .designPreview {
    /*background-color: blue;*/
    box-sizing: border-box;
    height: 92vh;
    /*width: 60vw;*/
    /*position: relative;*/
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
  }


  .designContent .designPreview .quickbtn {
    background-color: pink;
    width: 5%;
    height: 10%;
    position: absolute;
    top: 20%;
    right: -10% ;
    z-index: 2;
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
    z-index: 1;
  }

  .designContent .designPreview  .QuesBase .QuesTitle {
    font-size: 22px;
    color: #A4A4A4;
    font-weight: 600;
    cursor: pointer;
  }

  .designContent .designPreview  .QuesBase .QuesIntro {
    /*background-color: #58ACFA;*/
    /*width: 40%;*/
    height: 30%;
    position: absolute;
    bottom: 20px;
    left: 20px;
    text-align: left;
    font-size: 14px;
    /*font-weight: 600;*/
    display: flex;
    align-items: center;
    /*color: #A4A4A4;*/
    cursor: pointer;
    transition: .4s all ease-in-out;
  }

  .designContent .designPreview  .QuesBase .QuesIntro:hover {
    text-decoration: underline;
    color: #58ACFA;
    font-style: oblique;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    /*justify-content: center;*/
    /*background-color: #A9E2F3;*/
    /*opacity: .75;*/
    padding-bottom: 138px;
    margin-top: 9px;
    z-index: 1;
  }

  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    min-height: 50px;
    padding-top: 20px;
    padding-bottom: 5%;
    padding-left: 25px;
    padding-right: 25px;
    /*box-sizing: ;*/
    overflow: hidden;
    display: flex;
    flex-direction: row;
    /*justify-content: space-around;*/
    /*margin-bottom: 15px ;*/
    /*margin: 8px 0;*/
    /*z-index: 2;*/
    /*margin-bottom: -10px;*/
    /*position: relative;*/
    /*top: -10px;*/
    /*border-bottom-right-radius: 20px;*/
    /*border-bottom-left-radius: 20px;*/
    /*border-top-right-radius: 20px;*/
    /*border-top-left-radius: 20px;*/
    /*opacity: .7;*/
    transform: translateY(-15px);
    box-shadow: 0 0 2px rgba(0,0,0,.5);
    background-color: white;
    /*border-bottom: 1px solid #BDBDBD;*/
    position: relative;
    transition: .4s all ease-in-out;

    /*z-index: 2;*/
  }

  .designContent .designPreview .QuesList .QuesItem span {
    width: 10px;
    height: 10px;
  }

  .designContent .designPreview .QuesList .QuesItem .componentsItem {
    width: 80%;
    /*height: 100%;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options {
    /*background-color: #58ACFA;*/
    width: 100%;
    height: 10%;
    position: absolute;
    padding-right: 50px;
    /*bottom: 31px;*/
    /*display: none;*/
    bottom: -15%;
    transition: .4s all ease-in-out;
    display: flex;
    justify-content: space-around;
  }

  .designContent .designPreview .QuesList .QuesItem .OptActive {
    /*display: flex;*/
    bottom: 20px;
    /*justify-content: end;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 350px;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li {
    height: 25px;
    width: 35%;
    display: inline-block;
    line-height: 25px;
    background-color: white;
    opacity: .7;
    /*border-radius: 10px;*/
    box-shadow: 0 0 3px rgba(0,0,0,.5);
    color: #A4A4A4;
    transition: .4s;
    font-size: 14px;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li:hover {
    cursor: pointer;
    /*border: 1px solid #2E9AFE;*/
    /*background-color: #FAAC58;*/
    transform: scale(1.05);
    /*font-weight: 600;*/
    /*background-image: linear-gradient(to left,#00FFFF,#01A9DB);*/
    /*color: #FAFAFA;*/
  }

  .designContent .designPreview .QuesList .QuesItemHover {
    cursor: move;
    /*transform: scale(1.01);*/
    background-color: rgba(250,250,250,.6);
  }


  .editContain {
    width: 100%;
    height: 80vh;
  }

</style>