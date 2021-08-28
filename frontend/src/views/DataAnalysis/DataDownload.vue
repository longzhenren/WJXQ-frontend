<template>
  <div class="DownloadData">
    <el-table
        :data="DataTable"
        style="width: 100%"
        max-height="300">
      <el-table-column
        prop="userID"
        label="提交者ID"
        width="200">
      </el-table-column>
      <el-table-column
          fixed
          prop="StartTime"
          label="开始时间"
          sortable
          width="200">
      </el-table-column>
      <el-table-column
          prop="Deadline"
          label="结束时间"
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
              @click.native.prevent="showDetials(scope.$index, DataTable)"
              type="text"
              size="small">
            查看
          </el-button>
        </template>
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "DataDownload",
  data(){
    return {
      // 是否展示详细信息界面
      isShowDetails: false,

      // 数据表
      DataTable: [
        {

        }
      ],
    }
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
    showDetials(index,rows){
      this.isShowDetails = true
    },
  }
}
</script>

<style scoped>

</style>