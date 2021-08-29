

<template>
  <div class="InnerDiv">
    <div >

      <label v-if="QesData.Must==true" style="color: red" >*</label>
      <label  >投票多选题 - {{ QesData.question }}</label>

    </div>
    <div >
      <label  class="describe"> {{ QesData.describe }} </label>
    </div>
    <el-divider content-position="left" class="el-divider-top"></el-divider>

  <el-checkbox-group v-model="QesData.radio" class="InnerDiv"  >
    <el-row :gutter="10" class="Choice" type="flex" align="top" justify="left"  v-for="(choice,i) in QesData.choices" >
      <el-col :span="12">
        <el-checkbox :label="QesData.choices[i]" :key="choice"
                     class="Choice"
        >
        </el-checkbox>

      </el-col>
      <el-col :span="2" v-if="QesData.Amount==true")>
        <label style="font-size: 12px" >0票</label>
      </el-col>
      <el-col :span="10" v-if="QesData.Rate==true")>
        <el-progress :percentage="0"  ></el-progress>
      </el-col>

    </el-row>

  </el-checkbox-group >


    <!--    <div class="RightDiv">-->
    <!--      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement"  >修改</el-button></el-divider>-->
    <!--    </div>-->
  </div>
</template>

<script>
import bus from "../../../../assets/utils/bus";

export default {
  props:{
    FatherData: Object,
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
        describe: "这是一个描述",
        question:"",
        choices:["选项1","选项2"],
        radio: 0,

        //settings
        max:1,
        min:1,
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
  methods: {
    // 保存数据
    // 保存数据
    saveData(QesData,index){
      console.log("要保存的题号："+index)
      console.log("本题题号:"+this.ItemIndex)
      if (index===this.ItemIndex){

        this.QesData = QesData
        this.save()
      }
    },

    changeData(QesData,index){
      console.log("要同步的题号："+index)
      console.log("本题题号:"+this.ItemIndex)
      if (index===this.ItemIndex){
        console.log("进入同步")
        this.QesData = QesData
      }
    },
    del:function (i){
      if(this.QesData.choices>=2)
      {
        this.QesData.choices.splice(i,1)
        if(this.QesData.max>this.QesData.choices.length){
          this.QesData.max=this.QesData.choices.length
        }
        if(this.QesData.min>this.QesData.choices.length){
          this.QesData.min=this.QesData.choices.length
        }
      }
      else {
        this.$message.warning("选项不可以少于2")
      }
    },
    add: function() {
      this.QesData.choices.push("")
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

.el-divider-top{
  margin-top: 5px;
}
.describe{
  font-size: 12px;
  color: darkgrey
}
.Choice{
  margin-left: 0px;margin-bottom:10px;

}

</style>

