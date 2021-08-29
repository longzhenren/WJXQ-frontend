


<template>

  <div  class="InnerDiv" >
      <div >

        <label v-if="QesData.Must==true" style="color: red" >*</label>
              <label  >单选题 - {{ QesData.question }}</label>

      </div>
      <div >
        <label  class="describe"> {{ QesData.describe }} </label>
      </div>

    <el-radio-group v-model="QesData.radio" class="InnerDiv"  >
      <el-radio v-for="(choice,i) in QesData.choices" :label="QesData.choices[i]"
                class="Choice"
                  >
      </el-radio>
    </el-radio-group>

<!--    <div class="RightDiv">-->
<!--      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement"  >修改</el-button></el-divider>-->
<!--    </div>-->
  </div>
</template>

<script>
import bus from "../../assets/utils/bus";

export default {
  props:{
    FatherData: Object,
    ItemIndex: Number,
  },
  data () {
    return {
      QesData:{
        id:"",
        Number: 0,
        edit:1,
        describe: "这是一个描述",
        question:"",
        choices:["选项1","选项2"],
        radio: 0,
        Must:true,
      }
    };
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
      this.QesData.Number = this.FatherData.Number
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
          Number: 0,
          edit:1,
          describe: "这是一个描述",
          question:"",
          choices:["选项1","选项2"],
          radio: 0,
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
    save() {
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
        console.log("子组件开始保存")
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
/deep/ .el-radio{
  display: block;
  line-height: 23px;
  white-space: normal;
  alignment: left;
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

