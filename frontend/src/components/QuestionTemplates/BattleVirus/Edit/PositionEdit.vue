




<template >

  <div >
    <el-form  class="InnerDiv" >
      <label class="InnerElement">问题 {{this.needSendIdx+1}}</label>
      <el-input class="InnerElement" v-model="QesData.question"
                placeholder="请输入问题"
                type="textarea" >
      </el-input>


      <label class="InnerElement">描述</label>
      <el-input v-model="QesData.describe"
                placeholder="请输入描述" class="InnerElement"
                type="textarea" style="font-size:12px" >
      </el-input>

    </el-form>
    <div class="InnerElementLeft" >





    </div>
    <div class="InnerDiv">
      <el-divider content-position="center">题目设置</el-divider>
      <el-form>
        <el-form-item class="left">
          <el-checkbox v-model="QesData.Must">必答题</el-checkbox>
        </el-form-item>
      </el-form>
    </div>



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
        number:"",
        edit:1,
        describe: "",
        question:"",
         Position:"",
        Must:true,
      },
    };
  },
  created() {
    bus.$on('SaveEdited',this.saveData)
  },
  beforeDestroy(){
    bus.$off('SaveEdited',this.saveData)
  },
  mounted() {
    console.log(this.FatherData)
    if ( this.FatherData.question!==null && this.FatherData.question!=={} && this.FatherData.question!==undefined ){
      this.QesData.edit = this.FatherData.edit;
      this.QesData.question = this.FatherData.question;
      this.QesData.choices = this.FatherData.choices;
      this.QesData.describe = this.FatherData.describe;
      this.QesData.radio = this.FatherData.radio;
      this.QesData.Must = this.FatherData.Must;
      // this.singleChoice = this.FatherData
    }
    console.log(this.needSendIdx)
  },

  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.QesData = newData;
      }
      else  {
        this.QesData = {
          id:"",
          number:"",
          edit:1,
          describe: "",
          Position: "",
          radio: 0,
          Must:true,
        }
      }
    },

    needSendIdx(newIndex,oldIndex){
      this.needSendIdx = newIndex
    },
    QesData:{
      handler(newData,oldData){

        console.log("同步ing"+this.needSendIdx)
        bus.$emit('changeData',this.QesData,this.needSendIdx)
      },
      deep: true

    },

  },
  methods: {
    saveData(index){
      console.log("传入修改器 当前需要修改"+this.needSendIdx)
      console.log("传入修改器 上一修改"+index)
      if (index===this.needSendIdx){
        console.log(index)
        this.save()
      }
    },


    save: function() {
      // this.$emit('saveSingleData',this.QesData)
      console.log("编辑保存"+this.needSendIdx);
      bus.$emit('SaveData',this.QesData,this.needSendIdx)

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


