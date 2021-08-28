


<template>

  <div v-else class="InnerDiv" >
    <div >
      <label v-if="QesData.Must==true" style="color: red" >*</label>
      <label>填空题 - {{ QesData.Questionnaire }}</label>
    </div>
    <div >
      <label  class="describe" > {{ QesData.describe }} </label>
    </div>

    <el-input placeholder="回答区域" type="textarea" v-model="QesData.Answer" class="InnerDiv"></el-input>

  </div>

</template>

<script>
import bus from "../../assets/utils/bus";

export default {
  props:{
    FatherData: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
      QesData:{
        id:"",
        Number: 0,
        describe:"这是一个描述",
        Questionnaire:"",
        Must: true,
        Answer:""
      }
    };
  },

  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.Questionnaire!==null && this.FatherData.Questionnaire!=={} && this.FatherData.Questionnaire!==undefined ){
      this.QesData.edit = this.FatherData.edit;
      this.QesData.Answer = this.FatherData.Answer;
      this.QesData.Must = this.FatherData.Must;
      this.QesData.describe = this.FatherData.describe;
      this.QesData.Questionnaire = this.FatherData.Questionnaire;
      return
    }
  },

  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.QesData = newData;
        return
      }
      else  {
        this.QesData = {
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
  created() {
    bus.$on('saveBlankData',this.saveData)
  },
  methods: {
    // 保存数据
    saveData(QesData){
      console.log('内部',QesData)
      this.QesData = QesData
      this.save()
      // this.$emit('saveBlankData',this.QesData)
    },

    save: function() {

        this.QesData.edit=0
        this.$emit('saveBlankData',this.QesData)

    },
    edit: function() {
      this.QesData.edit=1
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
.InnerDiv{
  margin-top:20px;
  text-align: left;
  margin-left:10px;
}

.el-divider-top{
  margin-top: 5px;
}
.describe{
  font-size: 12px;
  color: darkgrey
}
.Choice{
  margin-left: 0px;margin-bottom:10px;display: block
}
</style>

