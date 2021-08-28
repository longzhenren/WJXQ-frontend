


<template>

  <div class="InnerDiv"  >


    <el-form  class="InnerDiv">
      <label class="InnerElement">问题</label>
      <el-input class="InnerElement" v-model="QesData.Questionnaire"
                placeholder="请输入问题"
                type="textarea">
      </el-input>

      <label class="InnerElement">描述</label>
      <el-input v-model="QesData.describe"
                placeholder="请输入描述" class="InnerElement"
                type="textarea" style="font-size:12px">
      </el-input>
    </el-form>

    <el-button  @click="save" >保存</el-button>
    <el-divider content-position="center">题目设置</el-divider>
    <el-form>
      <el-form-item class="left">
        <el-checkbox v-model="QesData.Must">必答题</el-checkbox>
      </el-form-item>

    </el-form>
  </div>


</template>

<script>
import bus from "../../../assets/utils/bus";

export default {
  props:{
    FatherData: {
      type: Object,
      default(){
        return {}
      }
    },
    needSendIdx: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data () {
    return {
      QesData:{
        id:"",
        Number:"",
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
    needSendIdx(newIndex,oldIndex){
      // console.log('旧',oldIndex)
      // console.log('新',newIndex)
      this.needSendIdx = newIndex
      // if (newIndex !== oldIndex) {
      //   console.log('自动')
      //   bus.$emit('saveSingleData',this.QesData,oldIndex)
      // }
    }
  },
  methods: {


    save: function() {

        this.QesData.edit=0
      console.log('内部前',this.QesData)
      bus.$emit('saveBlankData',this.QesData,this.needSendIdx)
        // this.$emit('saveBlankData',this.QesData)

    },
    edit: function() {
      this.QesData.edit=1
    }
  }
}
</script>
<style scoped>
.InnerDiv{
  margin-left:10px;
  margin-right: 10px;
}
.InnerElement{
  margin-top: 10px;
  margin-bottom: 20px;
}
.InnerElementLeft{
  margin-left:10px;
  margin-right: 10px;
  alignment: left;
  text-align: left;
}

.centerElement{
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}
.left{
  text-align: left;
}
</style>

