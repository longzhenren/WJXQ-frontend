


<template>

  <div >
    <el-form  class="InnerDiv">
      <label class="InnerElement">问题</label>
      <el-input class="InnerElement" v-model="QesData.question"
                placeholder="请输入问题"
                type="textarea">
      </el-input>


      <label class="InnerElement">描述</label>
      <el-input v-model="QesData.describe"
                placeholder="请输入描述" class="InnerElement"
                type="textarea" style="font-size:12px">
      </el-input>

    </el-form>
    <div class="InnerElementLeft" >



      <el-form  :inline="true"  v-for="(choice,i) in QesData.choices"  >
        <el-row :gutter="10" class="InnerElement" type="flex"  justify="center" >
          <el-col :span="2" class="centerElement" >
            <label  >{{i+1}}.</label>
          </el-col>
          <el-col :span="18">
            <el-input   v-model="QesData.choices[i]"
                        placeholder="请输入选项"
                        type="textarea">
            </el-input>
          </el-col >
          <el-col :span="2" class="centerElement">
            <el-button  icon="el-icon-delete"   type="text" @click="del(i)" ></el-button>
          </el-col>
          <el-col :span="2" class="centerElement">
            <el-tooltip v-if="QesData.answer[i]===true" class="item" content="正确选项" placement="right">
              <el-button   icon="el-icon-success"  style="font-size: 15px;color: green" type="text" @click="setAnswer(i)" ></el-button>
            </el-tooltip>
            <el-tooltip  v-else class="item"  content="错误选项" placement="right">
              <el-button  icon="el-icon-error"  type="text" style="font-size: 15px;color:darkgrey" @click="setAnswer(i)" ></el-button>
            </el-tooltip>
          </el-col>

        </el-row>



      </el-form>

    </div>
    <div class="InnerDiv">



      <el-button  @click="add"  >新建选项</el-button>
      <el-button  @click="save" >保存</el-button>
      <el-divider content-position="center">题目设置</el-divider>
      <div class="left">



        <div class="SetElement">
          <label>分数设置: </label>
          <el-input type="number" :clearable="false"   v-model="QesData.score"
                    style="max-width: 150px" :min="0">
            <template slot="append">分</template>>
          </el-input>
        </div>

        <div class="SetElement">
          <label style="display: inline">正确选项: 第</label>
          <label   v-for="(answer,i) in QesData.answer" v-if="answer===true">[ {{i+1}} ]  </label>项

        </div >
        <div class="SetElement">
          <el-checkbox v-model="QesData.Must">必答题</el-checkbox>
        </div >

      </div>
    </div>



  </div>

</template>

<script>
import bus from "../../../../assets/utils/bus";

export default {
  props:{
    FatherData: {
      type: Object,
      default() {
        return {};
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
        describe: "这是一个描述",
        question:"",
        choices:["选项1","选项2"],
        radio: 0,

        //settings

        answer:[true,false],
        score:1,
        edit:1,
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
      this.QesData.answer = this.FatherData.answer;
      this.QesData.score = this.FatherData.score;
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
          choices:["",""],

          answer:[true,false],
          radio: 0,
          score:1,
          edit:1,
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
  created() {
    bus.$on('SaveEdited',this.saveData)
  },
  beforeDestroy(){
    bus.$off('SaveEdited',this.saveData)
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
    setAnswer:function (j){
      for (let i = 0; i < this.QesData.answer.length; i++) {
        if(this.QesData.answer[i]===true){
          this.$set(this.QesData.answer,i,false);
          break;
        }
      }
      this.$set(this.QesData.answer,j,true);
    },
    del:function (i){
      if(this.QesData.choices.length>2)
      {
        this.QesData.choices.splice(i,1)
        if( this.QesData.answer[i]==true){
          if(i>=1){
            this.$set(this.QesData.answer,i-1,true)
          }
          else {
            this.$set(this.QesData.answer,i+1,true)
          }
        }
        this.QesData.answer.splice(i,1)
      }
      else {
        this.$message.warning("选项不可以少于2")
      }
    },
    add: function() {
      this.QesData.choices.push("")
    },
    save: function() {
      let find = false;
      let j=0;
      for (let i = 0; i < this.QesData.choices.length; i++) {
        for ( j = i + 1; j < this.QesData.choices.length; j++) {
          if (this.QesData.choices[i]== this.QesData.choices[j] ) {
            find=true;
            console.log(i,j)
            this.$set(this.QesData.choices,j,this.QesData.choices[j]+"-重复项"+j.toString())
          }
        }
      }
      if(find){
        this.$message.warning("不可以存在重复项,已为您添加标识，请您修改")
      }
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
.SetElement{
  margin-top: 10px;
  margin-bottom: 25px;
  alignment: left;
  text-align: left;
}
.left{
  text-align: left;

}
</style>

