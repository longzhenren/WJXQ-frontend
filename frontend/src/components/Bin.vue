<template>
  <div class="Bin">
    <el-table
        :data="Questionnaires"
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
              @click.native.prevent="resetQues(scope.$index, Questionnaires)"
              type="text"
              size="small">
            恢复
          </el-button>

          <el-button
              @click.native.prevent="reallyDeleteQues(scope.$index, Questionnaires)"
              type="text"
              size="small">
            彻底删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
      Queses.splice(index,1);
      // 转换该问卷的状态
      this.$emit('resetQues',Queses);
    },

    // 将问卷彻底删除
    reallyDeleteQues(index,Queses){
      Queses.splice(index,1);
      this.$emit('reallyDelete',Queses);
    }
  },
  mounted() {
    this.Questionnaires = this.DeletedQuestionnaires
  },
  watch: {
    DeletedQuestionnaires(newArray){
      this.Questionnaires = newArray
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>