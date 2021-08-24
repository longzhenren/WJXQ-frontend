


<template>

  <div class="InnerDiv" v-if="fillBlank.edit==1" >
    <el-form  label-width="80px"  >
      <el-form-item label="填空题">
        <el-input v-model="fillBlank.Questionnaire"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="fillBlank.describe"
                  placeholder="请输入描述"
                  type="textarea" style="font-size:12px">
        </el-input>

      </el-form-item>
    </el-form>
    <el-input placeholder="回答区域" type="textarea"  :disabled="true" class="InnerDiv2"></el-input>
    <div class="RightDiv">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
        <el-checkbox v-model="fillBlank.Must" class="RightElement">必答题</el-checkbox>
          <el-button type="success" @click="save" class="RightElement" >保存</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"></el-divider>
    </div>
  </div>

  <div v-else class="InnerDiv" >
    <div >
      <label v-if="fillBlank.Must==true" style="color: red" >*</label>
      <label>填空题 - {{ fillBlank.Questionnaire }}</label>
    </div>
    <div >
      <label  style="font-size: 12px;color: darkgrey"> {{fillBlank.describe}} </label>
    </div>
    <el-divider content-position="left" class="el-divider-top"></el-divider>
    <el-input placeholder="回答区域" type="textarea" v-model="fillBlank.Answer" class="InnerDiv2"></el-input>
    <div class="RightDiv">
      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement" >修改</el-button></el-divider>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    FatherData: Object
  },
  data () {
    return {
      fillBlank:{
        id:"",
        Number:"",
        edit:1,
        describe:"",
        Questionnaire:"",
        Must: true,
        Answer:""
      }
    };
  },

  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.Questionnaire!==null && this.FatherData.Questionnaire!=={} && this.FatherData.Questionnaire!==undefined ){
      this.fillBlank.edit = this.FatherData.edit;
      this.fillBlank.Answer = this.FatherData.Answer;
      this.fillBlank.Must = this.FatherData.Must;
      this.fillBlank.describe = this.FatherData.describe;
      this.fillBlank.Questionnaire = this.FatherData.Questionnaire;
      return
    }
  },

  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.fillBlank = newData;
        return
      }
      else  {
        this.fillBlank = {
          id:"",
          Number:"",
          edit:1,
          describe:"",
          Questionnaire:"",
          Must: true,
          Answer:""
        }
      }
    },
  },
  methods: {


    save: function() {

        this.fillBlank.edit=0
        this.$emit('saveBlankData',this.fillBlank)

    },
    edit: function() {
      this.fillBlank.edit=1
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
.InnerDiv{
  text-align: left;
  margin-left:10px;
}
.InnerDiv2{
  text-align: left;
  margin-left:80px;
}
.RightDiv{
  text-align: right;
  margin-left:70px;
}
.RightElement{
  display: inline;
  margin-left: 20px
}
.LeftDiv{
  text-align: left;
  margin-left:70px;
  margin-bottom:20px ;
}
.el-divider-top{
  margin-top: 5px;
}
</style>

