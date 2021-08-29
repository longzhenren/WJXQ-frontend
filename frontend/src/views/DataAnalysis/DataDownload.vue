<template>
  <div class="DownloadData">
    <el-table
        :data="DataTable"
        style="width: 100%"
        max-height="300">
      <el-table-column
        prop="提交者ID"
        label="提交者ID"
        width="200">
      </el-table-column>
      <el-table-column
          fixed
          prop="开始时间"
          label="开始时间"
          sortable
          width="200">
      </el-table-column>
      <el-table-column
          prop="作答耗时"
          label="作答耗时"
          width="200">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="deleteRow(scope.$index, DataTable)"
              type="text"
              size="small">
            移除
          </el-button>

          <el-button
              @click.native.prevent="showDetials(scope.row, DataTable)"
              type="text"
              size="small">
            查看
          </el-button>
        </template>
      </el-table-column>


    </el-table>


    <el-dialog title="详细作答记录" :visible.sync="dialogTableVisible">
<!--      <div class="AnswerTime">答题时间</div>-->
      <el-table :data="NeedShowData">
       <el-table-column property="提交者ID" label="提交者ID" width="200"></el-table-column>
        <div v-for="(item) in Questionnaire.Question">
          <el-table-column :property="item.id.toString()" :label="item.Stem" width="150" ></el-table-column>
        </div>
<!--        <el-table-column property="address" label="地址"></el-table-column>-->
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "DataDownload",
  props: {
    Questionnaire: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      // 需要展示的数据
      NeedShowData: [],
      // 是否显示详细信息
      dialogTableVisible: false,

      // 是否展示详细信息界面
      isShowDetails: false,

      // 数据表
      DataTable: [
        {

        }
      ],
    }
  },
  mounted() {
    setTimeout(this.getData,200);
  },
  methods: {
    // 删除答卷
    deleteRow(index,rows){
      rows.splice(index,1);
      // request({
      //
      // })
    },


    // 查看详细信息
    showDetials(row){
      this.NeedShowData = [];
      this.isShowDetails = true
      this.dialogTableVisible = true
      let pa = row
      this.NeedShowData.push(pa)
    },


    // 获取表格数据
    getData(){
      let pra = {
        questionnaireID: this.Questionnaire.id
      }
      request({
        url: '/submit/allsub',
        method: 'post',
        data: pra
      }).then(res=>{
        console.log(res);
        this.DataTable = res.data.submissions;
        console.log(this.DataTable)
      }).catch(err=>{

      })

    },
  },

}
</script>

<style scoped>
  .AnswerTime {
    /*background-color: #58ACFA;*/
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    font-size: 18px;
    color: #848484;
    text-align: left;
    padding-left: 30px;
    width: 100%;
  }
</style>