


<template>

  <div class="InnerDiv"  >
    <el-form  label-width="80px"  >



      <div >
        <label v-if="QesData.Must==true" style="color: red;float:left;margin-left: -10px;" >*</label>
        <label>{{ QesData.question }}</label>
        <label class="type">[评分题] </label>
        <div >
          <label  class="describe"> {{ QesData.describe }} </label>
        </div>

      </div>
    </el-form>
    <div class="InnerDiv">
    <el-rate
        v-model="QesData.score"
        show-text

        :texts="QesData.describes"
        :max="QesData.describes.length"
    > </el-rate>
    </div>

  </div>



</template>

<script>
import bus from "../../assets/utils/bus";

export default {
  props:{
    FatherData: {
      type:Object,
      default(){
        return {}
      }
    },
    ItemIndex: {
      type:Number,
      default() {
        return 0;
      }
    },
  },
  data () {
    return {
      QesData:{
        question:"",
        score:null,
        Number: 0,
        describe:"这是一个描述",
        describes:["不行","很棒"],
        level:["1","2"],
        radio:[],
        Must:true,
      }
    };
  },

  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.question!==null && this.FatherData.question!=={} && this.FatherData.question!==undefined ){
      this.QesData.edit = this.FatherData.edit;
      this.QesData.question = this.FatherData.question;
      this.QesData.radio = this.FatherData.radio;
      this.QesData.score = this.FatherData.score;
      this.QesData.describe = this.FatherData.describe;
      this.QesData.describes = this.FatherData.describes;
      this.QesData.level = this.FatherData.level;
      this.QesData.Must = this.FatherData.Must;
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
          edit:1,
          question:"",
          score:null,
          describe:"",
          describes:["不行","很棒"],
          level:["1","2"],
          radio:[],
          Must:true,
        }
      }
    },
  },
  created() {
    bus.$on('SaveData',this.saveData)
    bus.$on('changeData',this.changeData)
  },
  beforeDestroy(){
    bus.$off('SaveData',this.saveData)
    bus.$off('changeData',this.changeData)
  },
  methods: {
    // 保存数据
    saveData(QesData,index){
      console.log("要保存的题号："+index)
      console.log("本体题号:"+this.QesData.Number)
      if (index===this.ItemIndex){
        console.log(index)
        console.log(this.QesData)
        this.QesData = QesData
        this.save()
      }
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.QesData.level.length; i++) {
        if(this.QesData.level[i]===""){
          find=true;
          break;
        }
      }
      if(find){
        alert("选项分数设置不可以为空")
      }else {
        this.QesData.edit=0
        this.$emit('saveEvaluateData',this.QesData)
      }
    },
    edit: function() {
      this.QesData.edit=1
    }
  }
}
</script>
<style scoped>
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
.type{
  font-size: 5px;
  color: gray;
  float: right;
  margin-right: -50px;
}
</style>

