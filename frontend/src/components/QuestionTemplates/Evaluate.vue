


<template>

  <div class="InnerDiv"  >
    <el-form  label-width="80px"  >
      <el-form-item label="评分题" v-if="evaluate.edit==1" >
        <el-input v-model="evaluate.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item v-if="evaluate.edit==1" >
        <el-input  v-model="evaluate.describe"
                  placeholder="请输入描述"
                  type="textarea" style="font-size:12px">
        </el-input>

      </el-form-item>
      <div v-else >
        <label v-if="evaluate.Must==true" style="color: red" >*</label>
        <label>评分题 - {{evaluate.question }}</label>
        <div >
          <label  style="font-size: 12px;color: darkgrey"> {{evaluate.describe}} </label>
        </div>
        <el-divider class="el-divider-top"></el-divider>

      </div>
    </el-form>
    <div class="LeftDiv">
    <el-rate
        v-model="evaluate.score"
        show-text
        :texts="evaluate.describes"
        :max="evaluate.describes.length"
    > </el-rate>
    </div>

<div class="LeftDiv" v-if="evaluate.edit==1">
      <el-form  style="margin-left: 20px" label-width="80px" :inline="true" class="demo-form-inline" v-for="(choice,i) in evaluate.describes"  >
        <el-form-item  ><label>{{i+1}}.</label></el-form-item>
        <el-form-item  >
          <el-input   v-model="evaluate.describes[i]"
                      placeholder="描述">
          </el-input>
        </el-form-item>
          <el-form-item  >
          <el-input type="number" v-model.number="evaluate.level[i]"  autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item  >
          <label>分
          </label>
        </el-form-item>
        <el-form-item >
          <el-button type="danger" icon="el-icon-delete" @click=del(i) circle></el-button>
        </el-form-item>

      </el-form>
</div>
    <div class="RightDiv" v-if="evaluate.edit==1">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item class="RightElement" >
          <el-checkbox v-model="evaluate.Must">必答题</el-checkbox>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="add" class="RightElement" >新建选项</el-button>
          <el-button type="success" @click="save" class="RightElement"  >保存</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left" class="el-divider-top"></el-divider>
    </div>
    <div class="RightDiv" v-else>
      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement" >修改</el-button></el-divider>
    </div>
  </div>



</template>

<script>
export default {
  props:{
    FatherData: Object
  },
  data () {
    return {
      evaluate:{
        edit:1,
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
    // console.log(this.FatherData)
    if ( this.FatherData.question!==null && this.FatherData.question!=={} && this.FatherData.question!==undefined ){
      this.evaluate.edit = this.FatherData.edit;
      this.evaluate.question = this.FatherData.question;
      this.evaluate.radio = this.FatherData.radio;
      this.evaluate.score = this.FatherData.score;
      this.evaluate.describe = this.FatherData.describe;
      this.evaluate.describes = this.FatherData.describe;
      this.evaluate.level = this.FatherData.level;
      this.evaluate.Must = this.FatherData.Must;
      return
    }
  },
  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.evaluate = newData;
        return
      }
      else  {
        this.evaluate = {
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
  methods: {
    del:function (i){
      this.evaluate.describes.splice(i,1)
      this.evaluate.level.splice(i,1)
    },
    add: function() {
      this.evaluate.describes.push("")
      this.evaluate.level.push((this.evaluate.level.length+1).toString())
      this.evaluate.score=null
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.evaluate.level.length; i++) {
        if(this.evaluate.level[i]==""){
          find=true;
          break;
        }
      }
      if(find){
        alert("选项分数设置不可以为空")
      }else {
        this.evaluate.edit=0
        this.$emit('saveMultiData',this.evaluate)
      }
    },
    edit: function() {
      this.evaluate.edit=1
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
  text-align: left;
  margin-left:10px;
}
.LeftDiv{
  text-align: left;
  margin-left:70px;
  margin-bottom:20px ;
}

.RightDiv{
  text-align: right;
  margin-left:70px;
}
.RightElement{
  display: inline;
  margin-left: 20px
}
.el-divider-top{
  margin-top: 5px;
}
</style>

