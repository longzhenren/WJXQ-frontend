

<template>

  <div  class="InnerDiv" >
    <div >

      <label v-if="QesData.Must==true" style="color: red;float:left;margin-left: -10px;" >*</label>
      <label  >{{ QesData.question }}</label>
      <label class="type">[投票单选题]</label>

    </div>
    <div >
      <label  class="describe"> {{ QesData.describe }} </label>
    </div>
    <el-radio-group v-model="QesData.radio" class="InnerDiv" style="width: 100%" >
      <el-row :gutter="10" class="Choice" type="flex" align="top" justify="left"  v-for="(choice,i) in QesData.choices" >
        <el-col :span="12">
          <el-radio class="Choice" :label="QesData.choices[i]" >
          </el-radio>
        </el-col>
        <el-col :span="2" v-if="QesData.Amount==true">
          <label style="font-size: 12px" >0票</label>
        </el-col>
        <el-col :span="10" v-if="QesData.Rate==true">
          <el-progress :percentage="0"  ></el-progress>
        </el-col>

      </el-row>
    </el-radio-group>

    <!--    <div class="RightDiv">-->
    <!--      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement"  >修改</el-button></el-divider>-->
    <!--    </div>-->
  </div>
</template>

<script>
import bus from "../../../../assets/utils/bus";

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
        id:"",
        number:"",
        describe: "这是一个描述",
        question:"",
        choices:["选项1","选项2"],
        radio: 0,

        //settings
        edit:1,
        Must:true,
        Amount:true
      }
    };
  },
  created() {
    bus.$on('SaveData',this.saveData)
    bus.$on('changeData',this.changeData)
  },
  beforeDestroy(){
    bus.$off('SaveData',this.saveData)
    bus.$off('changeData',this.changeData)
  },
  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.question!==null && this.FatherData.question!=={} && this.FatherData.question!==undefined ){
      this.QesData.edit = this.FatherData.edit;
      this.QesData.question = this.FatherData.question;
      this.QesData.choices = this.FatherData.choices;
      this.QesData.describe = this.FatherData.describe;
      this.QesData.radio = this.FatherData.radio;
      this.QesData.Must = this.FatherData.Must;
      // this.singleChoice = this.FatherData
    }
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
          describe: "",
          question:"",
          choices:["选项1","选项2"],
          radio: 0,
          Must:true,
        }
      }
    },
  },
  methods: {
    // 保存数据
    saveData(QesData,index){
      console.log("要保存的题号："+index)
      console.log("本体题号:"+this.QesData.ItemIndex)
      if (index===this.ItemIndex){
        console.log(index)
        console.log(this.QesData)
        this.QesData = QesData
        this.save()
      }
    },

    changeData(QesData,index){
      // console.log(index)
      // console.log(this.QesData.Number)
      if (index===this.ItemIndex){
        this.QesData = QesData
      }
    },

    add: function() {
      this.QesData.choices.push("")
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.QesData.choices.length; i++) {
        for (let j = i + 1; j < this.QesData.choices.length; j++) {
          if (this.QesData.choices[i]== this.QesData.choices[j] ) {
            find = true; break;
          }
        }
        if (find) break;
      }
      if(find){
        alert("不可以存在重复项")
      }else {
        this.QesData.edit=0
        this.$emit('SaveQes',this.QesData)
      }
    },
    edit: function() {
      this.QesData.edit=1
    }
  }
}
</script>
<style scoped>
/deep/ .el-radio Choice{
  display: block;
  line-height: 23px;
  white-space: normal;
  alignment: left;
  margin:0px
}
.InnerDiv{
  text-align: left;
  margin-left:10px;
}

.describe{
  font-size: 12px;
  color: darkgrey
}
.Choice{
  margin-left: 0px;margin-bottom:10px;

}
.type{
  font-size: 5px;
  color: gray;
  float: right;
  margin-right: -50px;
}
</style>

