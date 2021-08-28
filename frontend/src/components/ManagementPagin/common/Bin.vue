<template>
  <div class="Bin">
    <el-table
      :data="DeletedQuestionnaires"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="Title"
        label="问卷名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="ReleaseTime"
        label="发布时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="Submission"
        label="答卷数">
      </el-table-column>

      <el-table-column
        prop="Submission"
        label="答卷数">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            class="myHover"
            @click.native.prevent="resetQues(scope.$index, DeletedQuestionnaires)"
            type="text"
            size="small">
            <span class="recycle">恢复</span>
          </el-button>

          <el-button
            class="myHover"
            @click.native.prevent="reallyDeleteQues(scope.$index, DeletedQuestionnaires)"
            type="text"
            size="small">
            <span >彻底删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {request} from "../../../network/request";

export default {
  name: "Bin",
  props: {
    // 从父组件接受的问卷数组
    DeletedQuestionnaires: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      // 所有要放入回收站的问卷
      Questionnaires: [],
    }
  },
  methods:{
    // 将问卷恢复
    resetQues(index,Queses){
      request({
        url: '/question/removeQuestionnaire',
        method: 'post',
        data: {
          'id':Queses[index].id,
          'username':this.$store.state.personalInfo.username,
          'Remove':'false'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '已将问卷从回收站恢复！',
            type: 'success'
          });
        }
      })
    },

    // 将问卷彻底删除
    reallyDeleteQues(index,Queses){
      request({
        url: '/question/deleteQuestionnaire',
        method: 'post',
        data: {
          'id':Queses[index].id,
          'username':this.$store.state.personalInfo.username,
        }
      }).then(res=>{
        console.log(res)
        console.log(this.DeletedQuestionnaires)
        if(res.data.Message==='Success'){
          this.$parent.getManageQes();
          this.$message({
            showClose: true,
            message: '已将问卷从回收站彻底删除！',
            type: 'success'
          });
        }
      })
    }
  },
}
</script>

<style scoped>
.recycle{
  display: inline-block;
  position: relative;
  text-align: center;
  left: 10px;
  letter-spacing: 31px;
}
.myHover:hover{
  color:orangered;
}
</style>