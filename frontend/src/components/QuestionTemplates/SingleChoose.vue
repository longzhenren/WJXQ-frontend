<template>
  <div style="alignment: left;display: block">
    <button content="新增选项" @click="add">新建选项</button>
  <el-radio-group v-model="singleChoice.radio"  style="alignment: left;display: block">

   <el-radio  :label="i" v-for="(choice,i) in singleChoice.choices" >{{i+1}}. {{choice}}</el-radio>


  </el-radio-group>
    <el-button content="新增选项" @click="add">新建选项</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      singleChoice:{
        question:"",
        choices:["选项1","选项2"],
        radio: 0
      }

    };
  },
  methods: {
    add: function() {
      this.singleChoice.choices.push("请输入选项内容")
    }
  }
}
</script>
<style scoped>
/deep/ .el-radio{
  display: block;
  line-height: 23px;
  white-space: normal;
  alignment: left;
}
/deep/ .el-radio-group{
  alignment: left;
}
</style>
————————————————
