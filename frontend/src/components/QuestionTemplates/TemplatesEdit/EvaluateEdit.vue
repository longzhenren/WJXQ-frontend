


<template>

  <div class="InnerDiv"  >
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


<div >
      <el-form  style="margin-left: 20px" label-width="80px" :inline="true" class="demo-form-inline" v-for="(choice,i) in QesData.describes"  >

          <el-row :gutter="10" class="InnerElement" type="flex"  justify="left" >
            <el-col :span="2" class="centerElement" >
              <label>{{i+1}}.</label>
            </el-col>
            <el-col :span="10">
              <el-input   v-model="QesData.describes[i]"
                          placeholder="描述">
              </el-input>
            </el-col >
            <el-col :span="1">
              <label class="centerElement">-
              </label>
            </el-col>
            <el-col :span="4">
                <el-input type="number" v-model.number="QesData.level[i]" autocomplete="off"> <label>分
                </label>
                </el-input>
            </el-col>
            <el-col :span="2">
              <label class="centerElement">分
              </label>
            </el-col>
            <el-col :span="2" class="centerElement">
              <el-button  icon="el-icon-delete"   type="text" @click="del(i)" ></el-button>
            </el-col>
          </el-row>





      </el-form>
</div>
    <el-button  @click="add"  >新建选项</el-button>
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
        question:"",
        score:null,
        describe:"",
        describes:["不行","很棒"],
        level:["1","2"],
        radio:[],
        Must:true,
      }
    };
  },

  mounted() {
    console.log(this.FatherData)
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
    del:function (i){
      if(this.QesData.choices.length>2)
      {
        this.QesData.describes.splice(i,1)
        this.QesData.level.splice(i,1)
      }
      else {
        this.$message.warning("分数分级不可以少于2")
      }


    },
    add: function() {
      this.QesData.describes.push("")
      this.QesData.level.push((this.QesData.level.length+1).toString())
      this.QesData.score=null
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
        this.$message.warning("选项分数设置不可以为空")
      }else {
        this.QesData.edit=0
        bus.$emit('saveEvaluateData',this.QesData,this.needSendIdx)
        // this.$emit('saveEvaluateData',this.QesData)
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

