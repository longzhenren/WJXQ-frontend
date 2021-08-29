


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



      <el-button  @click="add"   >新建选项</el-button>
      <el-button  @click="save" >保存</el-button>
      <el-divider content-position="center">题目设置</el-divider>

      <div class="left">



        <div class="SetElement">
          <label>分数设置: </label>
          <el-input type="number" :clearable="false"  @change="scoreChange" v-model="QesData.score"
                    style="max-width: 150px" :min="0">
            <template slot="append">分</template>>
          </el-input>
        </div>
        <div class="SetElement">
          <label>漏选得分: </label>
          <el-input type="number" :clearable="false"  v-model="QesData.HalfRightScore"
                    style="max-width: 150px" :min="0" :max="QesData.score">
            <template slot="append">分</template>>
          </el-input>
        </div>
        <div class="SetElement">
          <label style="display: inline">正确选项: 第</label>
          <label   v-for="(answer,i) in QesData.answer" v-if="answer===true"> [ {{i+1}} ]  </label>项

        </div >
        <div class="SetElement">
          <el-checkbox v-model="QesData.Must">必答题</el-checkbox>     </div>
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
        describe:"",
        question:"",
        choices:["",""],
        radio:[],



        //settings
        answer:[true,false],
        score:1,
        edit:1,
        Must:true,
        HalfRightScore:0.5,
      }
    };
  },
  created() {
    bus.$on('SaveEdited',this.saveData)
  },
  beforeDestroy(){
    bus.$off('SaveEdited',this.saveData)
  },

  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.edit!==null && this.FatherData.edit!=={} && this.FatherData.edit!==undefined ) {
      this.QesData.edit = this.FatherData.edit;
      this.QesData.question = this.FatherData.question;
      this.QesData.choices = this.FatherData.choices;
      this.QesData.radio = this.FatherData.radio;
      this.QesData.describe = this.FatherData.describe;
      this.QesData.max = this.FatherData.max;
      this.QesData.min = this.FatherData.min;
      this.QesData.Must = this.FatherData.Must;
    }
    // this.multiChoice.edit = this.FatherData.edit;
    // this.multiChoice.question = this.FatherData.question;
    // this.multiChoice.choices = this.FatherData.choices;
    // this.multiChoice.radio = this.FatherData.radio;
  },
  watch: {

    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.QesData = newData;
        return
      }
      else  {
        this.QesData = {

          question:"",
          describe:"",
          choices:["",""],
          radio:[],
          //settings
          score:1,
          edit:1,
          Must:true,
          HalfRightScore:0.5,
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
    scoreChange(){
      if(this.QesData.HalfRightScore>this.QesData.score)
      {
        this.QesData.HalfRightScore=this.QesData.score
      }
    },
    setAnswer:function (j){
      let k=0;
      let trueamount=0;
      for (let i = 0; i < this.QesData.answer.length; i++) {
        if(this.QesData.answer[i]===true){
          trueamount++;
          k=i;
        }
      }
      if(this.QesData.Must==true&&trueamount==1&&j==k){
        this.$message.warning("必选题请至少设置一个正确选项")
      }else {
        this.$set(this.QesData.answer,j,!this.QesData.answer[j]);
      }
    },
    saveData(index){
      console.log("传入修改器 当前需要修改"+this.needSendIdx)
      console.log("传入修改器 上一修改"+index)
      if (index===this.needSendIdx){
        console.log(index)
        this.save()
      }
    },

    del:function (i){
      if(this.QesData.choices.length>2)
      {
        this.QesData.choices.splice(i,1)
        let trueamount=0;
        for (let k = 0; k< this.QesData.answer.length; k++) {
          if(this.QesData.answer[k]===true){
            trueamount++;
          }
        }
        console.log("zhengqueshu"+trueamount)
        if( this.QesData.answer[i]==true&&trueamount==1){
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
.left{
  text-align: left;
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
  margin-bottom: 15px;
  margin-left: 10px;
  alignment: left;
  text-align: left;
}
.left{
  text-align: left;

}
</style>

