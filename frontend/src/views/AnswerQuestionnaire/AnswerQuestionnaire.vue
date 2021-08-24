<template>
  <div class="AnswerQuestionnaire">
    <!-- 问卷标题 -->
    <h3>{{ Title }}</h3>

    <!-- 问卷描述 -->
    <div v-if="Text != ''">
      {{ Text }}
    </div>

    <!-- 问题部分 -->
    <div class="questions" v-for="(item, index) in Question">
      <!-- 标号 -->
      <span v-if="ShowNumber == true">
        {{ "第" + (index + 1) + "题" }}
      </span>

      <!-- 单选题 -->
      <div class="SingleChoice" v-if="item.Type == 1">
        <div>
          <!-- 必选符 -->
          <label v-if="item.Must == true" style="color: red">*</label>
          <!-- 类型与题干 -->
          <label>单选题 - {{ item.Stem }}</label>
        </div>

        <!-- 描述 -->
        <div>
          <label style="font-size: 12px; color: darkgrey">
            {{ item.Describe }}
          </label>
        </div>

        <el-divider content-position="left" class="el-divider-top"></el-divider>

        <!-- 选项 -->
        <el-radio-group v-model="item.RadioValue">
          <el-radio
            v-for="(choiceItem, i) in item.Choice"
            :label="choiceItem.id"
            style="margin-left: 60px; margin-bottom: 10px; display: block"
          >
            {{ choiceItem.Text }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- 多选 -->
      <div class="MultiChoice" v-if="item.Type == 2">
        <div>
          <!-- 必选符 -->
          <label v-if="item.Must == true" style="color: red">*</label>
          <!-- 类型与题干 -->
          <label>多选题 - {{ item.Stem }}</label>
        </div>

        <!-- 描述 -->
        <div>
          <label style="font-size: 12px; color: darkgrey">
            {{ item.Describe }}
          </label>
        </div>

        <el-divider content-position="left" class="el-divider-top"></el-divider>

        <!-- 选项 -->
        <el-checkbox-group
          v-model="item.CheckList"
          :min="item.MinChoice"
          :max="item.MaxChoice"
        >
          <el-checkbox
            v-for="(choice, i) in item.Choice"
            :label="choice.id"
            style="margin-left: 60px; margin-bottom: 10px; display: block"
          >
            {{ choice.Text }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- 填空 -->
      <div class="FillBlank" v-if="item.Type == 3">
        <div>
          <!-- 必选符 -->
          <label v-if="item.Must == true" style="color: red">*</label>
          <!-- 类型与题干 -->
          <label>填空题 - {{ item.Stem }}</label>
        </div>
        <!-- 描述 -->
        <div>
          <label style="font-size: 12px;color: darkgrey">
            {{ item.Describe }}
          </label>
        </div>

        <el-divider content-position="left" class="el-divider-top"></el-divider>

        <!-- 作答框 -->
        <el-input
          placeholder="回答区域"
          type="textarea"
          v-model="item.Answer"
        ></el-input>
      </div>

      <!-- 评分 -->
      <div class="Evaluate" v-if="item.Type == 4">
        <!-- 必选符 -->
        <label v-if="item.Must == true" style="color: red">*</label>
        <!-- 类型与题干 -->
        <label>评分题 - {{ item.Stem }}</label>
        <!-- 描述 -->
        <div>
          <label style="font-size: 12px;color: darkgrey">
            {{ item.Describe }}
          </label>
        </div>
        <el-divider class="el-divider-top"></el-divider>

        <!-- 评分器 -->
        <el-rate
          v-model="item.Score"
          show-text
          :texts="item.Text"
          :max="item.Text.length"
        >
        </el-rate>
      </div>
      <!-- 其他题型 -->
    </div>

    <!-- 提交按钮 -->
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "AnswerQuestionnaire",
  data() {
    return {
      ip: "",
      id: this.$route.params.id,
      Title: "",
      ShowNumber: true,
      Text: "",
      Question: [],
    };
  },

  methods: {
    //提交
    submit() {
      //检测是否答完
      let flag = true;
      var q;
      for (q in this.Question) {
        let i = this.Question[q];
        if (i.Must == true && i.Type == 1 && i.RadioValue == 0) flag = false;
        if (i.Must == true && i.Type == 2 && i.CheckList == []) flag = false;
        if (i.Must == true && i.Type == 3 && i.Answer == "") flag = false;
        if (i.Must == true && i.Type == 4 && i.Score == 0) flag = false;
      }
      if (flag == false) this.$message.error("请回答所有带*题目");
      //向后端发送答案（按题分类）
      else {
        for (q in this.Question) {
          let i = this.Question[q];
          if (i.Type == 1)
            request({
              url: "/submit/savans",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: {
                submissionID: this.id,
                questionID: i.id,
                answerSelectionIDSet: [i.RadioValue],
              },
            });
          if (i.Type == 2)
            request({
              url: "/submit/savans",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: {
                submissionID: this.id,
                questionID: i.id,
                answerSelectionIDSet: i.CheckList,
              },
            });
          if (i.Type == 3)
            request({
              url: "/submit/savans",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: {
                submissionID: this.id,
                questionID: i.id,
                answerSelectionIDSet: i.Answer,
              },
            });
          if (i.Type == 4)
            request({
              url: "/submit/savans",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: {
                submissionID: this.id,
                questionID: i.id,
                answerSelectionIDSet: i.Score,
              },
            });
        }
        this.$message.success("提交成功");
      }
    },
    //排序
    sortRule(a, b) {
      return a.Number - b.Number;
    },
  },

  mounted() {
    //获取客户ip
    this.ip = localStorage.getItem('Ip');
    console.log(this.ip);
    //加载问卷
    request({
      url: "/question/answerQuestionnaire",
      method: "get",
      params: {
        id: this.id,
      },
    })
      .then((res) => {
        console.log(res);
        var Questionnaire = res.data.Questionnaire;
        this.Title = Questionnaire.Title;
        this.ShowNumber = Questionnaire.ShowNumber;
        this.Text = Questionnaire.Text;
        //对this.Question[]赋值
        var i;
        for (i in this.Question) {
          var q = Questionnaire.Question[i];
          if (q.Type == 1) {
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
              Type: 1,
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
              Type: 1,
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
              Type: 1,
              Must: q.Must,
              Number: q.Number,
              Answer: "",
            });
          }
          if (q.Type == 4) {
            var i;
            var t = [];
            for (i in q.Choice) t.push(q.Choice[i].Text);
            this.Question.push({
              id: q.id,
              Stem: q.Stem,
              Type: 1,
              Must: q.Must,
              Number: q.Number,
              Text: t,
              Score: 0,
            });
          }
        }
        this.Question.sort(this.sortRule);
        console.log(this.Question);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
