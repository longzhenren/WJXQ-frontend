<template>
  <div class="AnswerQuestionnaire">
    <MyMk v-if="myMkShow" :id="id"></MyMk>
    <Time
      :remainTime.default="this.ExamTime"
      v-if="this.Type == 4 && state == 0"
      style="position:fixed; top:60px; left:60px"
    ></Time>
    <div class="content" v-if="state == 0">
      <!-- 问卷标题 -->
      <h3>{{ Title }}</h3>

      <!-- 问卷描述 -->
      <div v-if="Text != ''" class="top">
        {{ Text }}
      </div>

      <!-- 问题部分 -->
      <el-card
        :class="{ boxCard: true, filterBlur: !isLogin }"
        v-for="(item, index) in Question"
      >
        <div slot="header">
          <!-- 题号题干 -->
          <span v-if="ShowNumber == true">
            {{ index + 1 + "." }}
          </span>
          <label v-if="item.Must == true" style="color: red">*</label>
          <label v-if="item.Type == 1">单选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 2">多选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 3">填空题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 4">评分题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 5">定位题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 6">投票单选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 7">投票多选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 8">报名单选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 9">报名多选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 10">考试单选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 11">考试多选题 - {{ item.Stem }}</label>
          <label v-if="item.Type == 12">考试填空题 - {{ item.Stem }}</label>
          <label
            v-if="item.Type >= 10 && item.Type <= 12"
            style="color: red;font-size: 14px"
          >
            （{{ item.Score }}分）</label
          >
          <!-- 描述 -->
          <div>
            <label style="font-size: 12px; color: darkgrey">
              {{ item.Describe }}
            </label>
          </div>
        </div>

        <!-- 单选题 -->
        <div class="SingleChoice" v-if="item.Type == 1">
          <el-radio-group v-model="item.RadioValue">
            <el-radio
              v-for="(choiceItem, i) in item.Choice"
              :label="choiceItem.id"
              style="margin-left: 60px; margin-bottom: 10px; AnswerQuestionnaire: block"
            >
              {{ choiceItem.Text }}
            </el-radio>
          </el-radio-group>
        </div>

        <!-- 多选 -->
        <div class="MultiChoice" v-if="item.Type == 2">
          <el-checkbox-group
            v-model="item.CheckList"
            :min="item.MinChoice"
            :max="item.MaxChoice"
          >
            <el-checkbox
              v-for="(choice, i) in item.Choice"
              :label="choice.id"
              style="margin-left: 60px; margin-bottom: 10px; AnswerQuestionnaire: block"
            >
              {{ choice.Text }}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <!-- 填空 -->
        <div class="FillBlank" v-if="item.Type == 3">
          <el-input
            placeholder="回答区域"
            type="textarea"
            v-model="item.AnswerText"
          ></el-input>
        </div>

        <!-- 评分 -->
        <div class="Evaluate" v-if="item.Type == 4">
          <el-rate
            v-model="item.Score"
            show-text
            :texts="item.Text"
            :max="item.Text.length"
          >
          </el-rate>
        </div>

        <!-- 定位 -->
        <div class="Position" v-if="item.Type == 5">
          <el-row :gutter="10" type="flex" justify="center">
            <el-col :span="18">
              <div class="Choice">
                <el-input
                  class="InnerElement"
                  v-model="item.Position"
                  placeholder="点击按钮获取地理位置..."
                  :disabled="true"
                >
                </el-input>
              </div>
            </el-col>
            <el-col>
              <el-button @click="getPosition(item)">
                <i class="el-icon-discover" />获取定位
              </el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 投票单选 -->
        <div class="VoteSingleChoice" v-if="item.Type == 6">
          <el-radio-group v-model="item.RadioValue">
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-col :span="12">
                <el-radio :label="choice.id">
                  {{ choice.Text }}
                </el-radio>
              </el-col>
              <el-col :span="2" v-if="item.ShowResultBeforeVote == true">
                <label style="font-size: 12px">{{ choice.value }}</label>
              </el-col>
              <el-col :span="10" v-if="item.ShowResultBeforeVote == true">
                <el-progress :percentage="choice.percent"></el-progress>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>

        <!-- 投票多选 -->
        <div class="VoteMultiChoice" v-if="item.Type == 7">
          <el-checkbox-group
            v-model="item.CheckList"
            :min="item.MinChoice"
            :max="item.MaxChoice"
          >
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-col :span="12">
                <el-checkbox :label="choice.id">
                  {{ choice.Text }}
                </el-checkbox>
              </el-col>
              <el-col :span="2" v-if="item.ShowResultBeforeVote == true">
                <label style="font-size: 12px">{{ choice.value }}</label>
              </el-col>
              <el-col :span="10" v-if="item.ShowResultBeforeVote == true">
                <el-progress :percentage="choice.percent"></el-progress>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>

        <!-- 报名单选 -->
        <div class="RegisterSingleChoice" v-if="item.Type == 8">
          <el-radio-group v-model="item.RadioValue" style="width: 100%">
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-col>
                <el-radio
                  v-if="choice.Times === 0"
                  disabled
                  class="Choice"
                  :label="choice.id"
                >
                  {{ choice.Text }}
                </el-radio>
                <el-radio v-else :label="choice.id"> </el-radio>
                <label style="font-size: 12px;color: #6E6E6E"
                >剩余:{{ choice.Times }}
                </label>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>
        <!-- 报名多选 -->
        <div class="RegisterMultiChoice" v-if="item.Type == 9">
          <el-checkbox-group v-model="item.CheckList">
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-checkbox
                v-if="choice.Times === 0"
                disabled
                :label="choice.id"
                :key="choice.Text"
              >
              </el-checkbox>
              <el-checkbox v-else :label="choice.id" :key="choice.Text">
              </el-checkbox>
              <label style="font-size: 12px;color: #6E6E6E"
              >剩余:{{ choice.Times }}</label
              >
            </el-row>
          </el-checkbox-group>
        </div>
        <!-- 考试单选 -->
        <div class="ExamSingleChoice" v-if="item.Type == 10">
          <el-radio-group v-model="item.RadioValue" style="width: 100%">
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-col :span="24">
                <el-radio :label="choice.id">{{ choice.Text }} </el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>
        <!-- 考试多选 -->
        <div class="ExamMultiChoice" v-if="item.Type == 11">
          <el-checkbox-group v-model="item.CheckList">
            <el-row
              :gutter="10"
              type="flex"
              align="top"
              justify="left"
              v-for="(choice, i) in item.Choice"
            >
              <el-col :span="24">
                <el-checkbox :label="choice.id" :key="choice.Text">
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
        <!-- 考试填空 -->
        <div class="ExamFillBlank" v-if="item.Type == 12">
          <el-input
            placeholder="回答区域"
            type="textarea"
            v-model="item.AnswerText"
          ></el-input>
        </div>
      </el-card>

      <!-- 提交按钮 -->
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <div class="bottom" v-if="state == 0">
      <el-link type="info" href="/">问卷星球&nbsp;</el-link>
    </div>
    <div v-if="state == 1"><p>问卷已关闭</p></div>
    <div v-if="state == 2 && Type != 2"><p>已提交</p></div>
  </div>
</template>

<script>
import { request } from "../../network/request";
import MyMk from "../../components/AnswerQuestionnaire/MyMk";
import Time from "../../components/AnswerQuestionnaire/Time";
export default {
  name: "AnswerQuestionnaire",
  data() {
    return {
      Type: 0,
      ExamTime: 0,
      isLogin: window.sessionStorage.getItem("isLogin"),
      myMkShow: false,
      ip: "",
      id: this.$route.params.id, //加密后的问卷id
      questionnaireID: 0,
      submissionID: 0,
      Title: "",
      Settings: [],
      ShowNumber: true,
      Text: "",
      Question: [],
      model: "preview",
      isWatch: false,
      state: 0, //0：开放 1：关闭 2：提交
      Position: "",
    };
  },
  props: {
    qesId: "",
  },
  components: {
    MyMk,
    Time,
  },
  computed: {
    newQuestion() {
      return JSON.parse(JSON.stringify(this.Question));
    },
  },
  watch: {
    newQuestion: {
      handler(val, old) {
        if (this.isWatch) this.autoSave(val, old);
        else this.isWatch = true;
      },
      deep: true,
    },
  },
  methods: {
    // 结果查看
    goVoteShow() {
      let psthH = "/VoteShow/" + this.id;
      this.$router.push({
        path: psthH,
        query: {
          Mode: "preview",
        },
      });
    },
    getPosition(i) {
      this.$confirm("是否同意获取位置？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
        .then(() => {
          request({
            url: "https://restapi.amap.com/v5/ip",
            method: "get",
            params: {
              key: "24975cc0d788296567a2d7f807a6d81d",
              type: 4,
              ip: this.ip,
            },
          }).then((res) => {
            //console.log(res);
            i.Position =
              res.data.country +
              " " +
              res.data.province +
              " " +
              res.data.city +
              " " +
              res.data.district;
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    autoSave: _.debounce(function(val, old) {
      if (!_.eq(val, old) && this.state != 2) {
        this.$message.success("已自动保存");
        this.save();
        console.log("自动保存", val);
      }
    }, 3000),
    //保存答案
    save() {
      let q;
      for (q in this.Question) {
        let i = this.Question[q];
        //单选
        if (i.Type == 1 || i.Type == 6 || i.Type == 8 || i.Type == 10) {
          request({
            url: "/submit/savans",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              submissionID: this.submissionID,
              questionID: i.id,
              answerSelectionIDSet: [i.RadioValue],
            },
          }).then((res) => {
            console.log("savans-single", res);
          });
        }
        //多选
        if (i.Type == 2 || i.Type == 7 || i.Type == 9 || i.Type == 11)
          request({
            url: "/submit/savans",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              submissionID: this.submissionID,
              questionID: i.id,
              answerSelectionIDSet: i.CheckList,
            },
          }).then((res) => {
            console.log("savans-multi", res);
          });
        //填空、定位
        if (i.Type == 3 || i.Type == 12 || i.Type == 5)
          request({
            url: "/submit/savans",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              submissionID: this.submissionID,
              questionID: i.id,
              answerText: i.AnswerText,
            },
          }).then((res) => {
            console.log("savans-blank", res);
          });
        //打分
        if (i.Type == 4)
          request({
            url: "/submit/savans",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              submissionID: this.submissionID,
              questionID: i.id,
              answerScore: i.Score,
            },
          }).then((res) => {
            console.log("savans-score", res);
          });
        //console.log(i.id);
      }
    },
    //点击按钮后提交
    async submit() {
      this.save();
      await this.ssubmit();
    },
    ssubmit() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          request({
            url: "/submit/submit",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              submissionID: this.submissionID,
            },
          }).then((res) => {
            console.log("总提交", res.data);
            if (res.data.code === -1) this.$message.warning("有必答题未做");
            else this.state = 2;
            this.goVoteShow();//
          });
        }, 1000);
      });
    },
    //排序
    sortRule(a, b) {
      return a.Number - b.Number;
    },
  },

  mounted() {
    //获取客户ip
    this.ip = localStorage.getItem("Ip");
    // console.log(this.ip);
    let pra;
    if (this.qesId === undefined) {
      if (this.$route.query.Mode === undefined) {
        //填写时
        console.log(this.id);
        pra = {
          EncodeID: this.id,
          Mode: "",
        };
      } else {
        pra = {
          EncodeID: this.id,
          Mode: this.$route.query.Mode,
        };
      }
    } else {
      pra = {
        EncodeID: this.qesId,
        Mode: this.model,
      };
    }
    //请求问卷数据
    request({
      url: "/question/answerQuestionnaire",
      method: "post",
      data: pra,
    })
      .then((res) => {
        console.log("源数据", res);
        //存储问卷信息
        if (res.data.Message === "Questionnaire is closed") this.state = 1;
        var Questionnaire = res.data.Questionnaire;
        this.Type = Questionnaire.Type;
        this.Title = Questionnaire.Title;
        this.ShowNumber = Questionnaire.ShowNumber;
        this.Text = Questionnaire.Text;
        this.questionnaireID = Questionnaire.id;
        this.ExamTime = Questionnaire.AnswerTime;
        //存储题目数据并排序
        var i;
        for (i in Questionnaire.Question) {
          var q = Questionnaire.Question[i];
          if (q.Type == 1) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            //if(this.Type == 4) diorder(c);
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              RadioValue: 0,
            });
          }
          if (q.Type == 2) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              MaxChoice: q.MaxChoice,
              Minchoice: q.Minchoice,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              CheckList: [],
            });
          }
          if (q.Type == 3) {
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              AnswerText: "",
            });
          }
          if (q.Type == 4) {
            var i;
            var t = [];
            for (i in q.Choice) t.push(q.Choice[i].Text);
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Text: t,
              Score: 0,
            });
          }
          if (q.Type == 5) {
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Position: "",
            });
          }
          if (q.Type == 6) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              RadioValue: 0,
              ShowResultBeforeVote: false//q.ShowResultBeforeVote,
            });
            this.getQesInfo();
          }
          if (q.Type == 7) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              MaxChoice: q.MaxChoice,
              Minchoice: q.Minchoice,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              CheckList: [],
              ShowResultBeforeVote: false//q.ShowResultBeforeVote,
            });
          }
          if (q.Type == 8) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
                Times: q.Choice[i].Times,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              RadioValue: 0,
            });
          }
          if (q.Type == 9) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
                Times: q.Choice[i].Times,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              MaxChoice: q.MaxChoice,
              Minchoice: q.Minchoice,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              CheckList: [],
            });
          }
          if (q.Type == 10) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              RadioValue: 0,
              Score: q.Score,
            });
          }
          if (q.Type == 11) {
            var i;
            var c = [];
            for (i in q.Choice)
              c.push({
                id: q.Choice[i].id,
                Text: q.Choice[i].Text,
              });
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              MaxChoice: q.MaxChoice,
              Minchoice: q.Minchoice,
              Must: q.Must,
              Number: q.Number,
              Choice: c,
              CheckList: [],
              Score: q.Score,
            });
          }
          if (q.Type == 12) {
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Describe: q.Describe,
              Type: q.Type,
              Must: q.Must,
              Number: q.Number,
              AnswerText: "",
              Score: q.Score,
            });
          }
        }
        this.Question.sort(this.sortRule);
        console.log("获取数据", this.Question);
        //创建提交
        request({
          url: "/submit/crtsub",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            ip: this.ip,
            questionnaireID: this.questionnaireID,
          },
        }).then((res) => {
          console.log("crtsub", res);
          if (res.data.code == -1) this.state = 2;
          this.submissionID = res.data.submissionID;
          console.log("submissionID", this.submissionID);
        });
        //getsub
        request({
          url: "submit/getsub",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            submissionID: this.submissionID,
          },
        }).then((res) => {
          console.log("getsub", res);
          //获取之前的提交
          if (res.data.code === 0) {
            let list = res.data.answerList;
            for (let i = 0; i < list.length; i++) {
              let ans = list[i];
              for (let j = 0; j < this.Question.length; j++) {
                if (this.Question[j].id === ans.answerid) break;
              }
              switch (this.Question[j].Type) {
                case 1:
                case 6:
                case 8:
                case 10:
                  this.Question[j].RadioValue = ans.choiceIDList[0];
                  break;
                case 2:
                case 7:
                case 9:
                case 11:
                  this.Question[j].CheckList = ans.choiceIDList;
                  break;
                case 3:
                case 12:
                  this.Question[j].AnswerText = ans.answerText;
                  break;
                case 5:
                  this.Question[j].Position = ans.answerText;
                  break;
                case 4:
                  this.Question[j].Score = ans.answerScore;
              }
            }
          }
        });
        if(this.qesId===undefined&&window.sessionStorage.getItem('isLogin')===null&&this.Settings.Login){
          this.myMkShow=true;
        }//
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.AnswerQuestionnaire {
  text-align: center;
  padding: 20px;
  width: 700px;
  margin: 30px auto;
  background-color: white;
}
.top {
  color: #606266;
  padding: 0 10px 10px 10px;
  border-bottom: 3px solid #409eff;
  font-size: 15px;
  line-height: 22px;
  text-align: left;
}
.content {
  width: 100%;
  max-width: 800px;
  display: inline-block;
  text-align: center;
}
.boxCard {
  text-align: left;
  width: 100%;
  margin: 10px 0 10px 0;
}
.filterBlur {
  filter: blur(4px);
}
.bottom {
  margin: 20px 10px 20px 10px;
  color: #909399;
}
</style>
