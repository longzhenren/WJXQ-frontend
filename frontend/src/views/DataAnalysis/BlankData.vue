<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
          prop="answerText"
          label="答案内容"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="submitTime"
          label="提交时间"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="submitUID"
          label="提交者ID"
          sortable
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "BlankData",
  props: {
    QuestionID: Number
  },
  mounted() {
    this.getBlankData()
  },
  data(){
    return {
      // 数据表
      tableData: [],
    }
  },
  methods: {
    // 获取填空题答案数据
    getBlankData(){
      request({
        url: '/submit/qesrep',
        method: 'post',
        data: {
          questionID: this.QuestionID
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          // this.Questionnaire = res.data.Questionnaire
          // this.QesData=res.data.QesData,
          //     this.ChooseData=res.data.ChooseData,
              this.tableData=res.data.AnswerData
          // this.BasicData = res.data.ChooseData
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>