<template>

  <div  class="InnerDiv" >
    <div >

      <label v-if="QesData.Must==true" style="color: red;float:left;margin-left: -10px;" >*</label>
      <label  >{{ QesData.question }}</label>
      <label class="type">[定位题 ] </label>
    </div>
    <div >
      <label  class="describe"> {{ QesData.describe }} </label>
    </div>
    <div class="InnerDiv">
      <el-row :gutter="10" class="InnerElement" type="flex"  justify="center" >

        <el-col :span="18">
          <div  class="Choice">
            <el-input class="InnerElement" v-model="QesData.Position"
                      placeholder="点击按钮获取地理位置..." :disabled="true">
            </el-input>
          </div>
        </el-col>

        <el-col >
         <el-button @click="" ><i class="el-icon-discover"/>获取定位</el-button>
        </el-col>
      </el-row>

    </div>
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
        Number: 0,
        edit:1,
        describe: "这是一个描述",
        question:"",
        Position:"",
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
          Position:"",
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
      console.log("本体题号:"+this.ItemIndex)
      if (index===this.ItemIndex){
        console.log(index)
        console.log(this.QesData)
        this.QesData = QesData
        this.save()
      }
    },

    changeData(QesData,index){
      console.log("要同步更改的题号："+index)
      // console.log("本题题号:"+this.QesData.Number)
      if (index===this.ItemIndex){
        this.QesData = QesData
      }
    },
    save() {
        console.log("子组件开始保存")
        this.QesData.edit=0
        this.$emit('SaveQes',this.QesData)
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
.type{
  font-size: 5px;
  color: gray;
  float: right;
  margin-right: -50px;
}
</style>



<!--.Choice{-->
<!--  margin-left: 0px;margin-bottom:10px;display: block-->
<!--}-->
<!--</style>-->

