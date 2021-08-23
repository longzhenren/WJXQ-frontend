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
      id: 1,
      Title: "测试标题",
      CreateUser: "",
      CreateTime: "",
      ShowNumber: true,
      Text: "测试文本",
      Question: [
        {
          id: 1,
          Stem: "测试单选题的题干",
          Describe: "测试描述",
          RadioValue: 0,
          Type: 1,
          Must: true,
          Number: 1,
          Choice: [
            {
              id: 1,
              Text: "选项A",
            },
            {
              id: 2,
              Text: "选项B",
            },
            {
              id: 3,
              Text: "选项C",
            },
          ],
        },
        {
          id: 2,
          Stem: "测试多选题的题干",
          CheckList: [],
          Type: 2,
          MinChoice: 1,
          MaxChoice: 2,
          Must: true,
          Number: 2,
          Choice: [
            {
              id: 1,
              Text: "选项A",
            },
            {
              id: 2,
              Text: "选项B",
            },
            {
              id: 3,
              Text: "选项C",
            },
          ],
        },
        {
          id: 3,
          Stem: "测试填空题的题干",
          Answer: "",
          Type: 3,
          Must: true,
          Number: 3,
        },
        {
          id: 4,
          Stem: "测试评分题的题干",
          Score: 0,
          Type: 4,
          Must: true,
          Number: 4,
          Text: ["坏", "普通", "好"],
        },
      ],
      Answer: {
        submissionID: 1,
        content: [],
      },
    };
  },

  methods: {
    // //本地测试用
    // save() {
    //   this.Answer.submissionID = this.id;
    //   var q;
    //   for (q in this.Question) {
    //     let i = this.Question[q];
    //     if (i.Type == 1)
    //       this.Answer.content.push({
    //         questionID: i.id,
    //         answerSelectionIDSet: [i.RadioValue],
    //         type: 1,
    //       });
    //     if (i.Type == 2)
    //       this.Answer.content.push({
    //         questionID: i.id,
    //         answerSelectionIDSet: i.CheckList,
    //         type: 2,
    //       });
    //     if (i.Type == 3)
    //       this.Answer.content.push({
    //         questionID: i.id,
    //         answerText: i.Answer,
    //         type: 3,
    //       });
    //     if (i.Type == 4)
    //       this.Answer.content.push({
    //         questionID: i.id,
    //         answerScore: i.Score,
    //         type: 4,
    //       });
    //   }
    //   console.log(this.Answer);
    // },
    
    submit() {
      //检测是否答完
      let flag = true;
      var q;
      for (q in this.Question) {
        let i = this.Question[q];
        if (i.Must == true && i.Type == 1 && i.RadioValue == 0) flag = false;
        if (i.Must == true && i.Type == 2 && i.CheckList == []) flag = false;
        if (i.Must == true && i.Type == 3 && i.Text == "") flag = false;
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
  },

  mounted() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
