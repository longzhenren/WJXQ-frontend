


<template>

  <div class="InnerDiv" v-if="multiChoice.edit==1" >
    <el-form  label-width="80px"  >
      <el-form-item label="多选题">
        <el-input v-model="multiChoice.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="multiChoice.describe"
                  placeholder="请输入描述"
                  type="textarea" style="font-size:12px">
        </el-input>

      </el-form-item>
    </el-form>
    <div class="LeftDiv">
    <el-radio-group v-model="multiChoice.radio" style="display: block">
      <el-form  style="margin-left: 20px" label-width="80px" :inline="true" class="demo-form-inline" v-for="(choice,i) in multiChoice.choices"  >
      <el-form-item  ><label>{{i+1}}.</label></el-form-item>
      <el-form-item  >
        <el-input   v-model="multiChoice.choices[i]"
                    placeholder="请输入选项"
                    type="textarea"
                    >
        </el-input>
      </el-form-item>
      <el-form-item >
      <el-button type="danger" icon="el-icon-delete" @click=del(i) circle></el-button>
      </el-form-item>

    </el-form>
    </el-radio-group>
    </div>
    <div class="RightDiv">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item class="RightElement" >
          <el-checkbox v-model="multiChoice.Must">必答题</el-checkbox>
        </el-form-item>
        <el-form-item label="最少选择" class="RightElement" >
          <el-select v-model="multiChoice.min" @change="changeMin">
            <el-option v-for="(choice,i) in multiChoice.choices" :label="i+1" :value="i+1"  v-if="i+1<=multiChoice.max" ></el-option>
            <el-option v-for="(choice,i) in multiChoice.choices" :label="i+1" :value="i+1"  v-if="i+1>multiChoice.max" :disabled="true" ></el-option>
          </el-select>
        </el-form-item >
        <el-form-item label="最多选择" class="RightElement"  >
          <el-select v-model="multiChoice.max" @change="changeMax" >
            <el-option v-for="(choice,i) in multiChoice.choices" :label="i+1" :value="i+1"  v-if="i+1>=multiChoice.min" ></el-option>
            <el-option v-for="(choice,i) in multiChoice.choices" :label="i+1" :value="i+1"  v-if="i+1<multiChoice.min" :disabled="true" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add" class="RightElement" >新建选项</el-button>
          <el-button type="success" @click="save" class="RightElement"  >保存</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"></el-divider>
    </div>
  </div>

  <div v-else class="InnerDiv" >
    <div >
      <label v-if="multiChoice.Must==true" style="color: red" >*</label>
      <label>多选题 - {{multiChoice.question }}</label>
    </div>
    <div >
      <label  style="font-size: 12px;color: darkgrey"> {{multiChoice.describe}} </label>
    </div>
    <el-divider content-position="left" class="el-divider-top"></el-divider>
    <el-checkbox-group  v-model="multiChoice.radio" class="InnerDiv"  >
      <el-checkbox  v-for="(choice,i) in multiChoice.choices" :label="multiChoice.choices[i]" :key="choice"
                style="margin-left: 60px;margin-bottom:10px;display: block"
                  >
      </el-checkbox>
    </el-checkbox-group >
    <div class="RightDiv">
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
      multiChoice:{
        edit:1,
        describe:"",
        question:"",
        choices:["",""],
        radio:[],
        max:1,
        min:1,
        Must:true,
      }
    };
  },

  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.edit!==null && this.FatherData.edit!=={} && this.FatherData.edit!==undefined ) {
      this.multiChoice.edit = this.FatherData.edit;
      this.multiChoice.question = this.FatherData.question;
      this.multiChoice.choices = this.FatherData.choices;
      this.multiChoice.radio = this.FatherData.radio;
      this.multiChoice.describe = this.FatherData.describe;
      this.multiChoice.max = this.FatherData.max;
      this.multiChoice.min = this.FatherData.min;
      this.multiChoice.Must = this.FatherData.Must;
    }
    // this.multiChoice.edit = this.FatherData.edit;
    // this.multiChoice.question = this.FatherData.question;
    // this.multiChoice.choices = this.FatherData.choices;
    // this.multiChoice.radio = this.FatherData.radio;
  },
  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.multiChoice = newData;
        return
      }
      else  {
        this.multiChoice = {
          edit:1,
          question:"",
          describe:"",
          choices:["",""],
          radio:[],
          max:1,
          min:1,
          Must:true,
        }
      }
    },
  },
  methods: {
    changeMax: function(){
      if(this.multiChoice.min>this.multiChoice.max){
        this.multiChoice.min=this.multiChoice.max;
      }
    },
    changeMin: function(){
      if(this.multiChoice.min>this.multiChoice.max){
        this.multiChoice.max=this.multiChoice.min;
      }
    },
    del:function (i){
      this.multiChoice.choices.splice(i,1)
      if(this.multiChoice.max>this.multiChoice.choices.length){
        this.multiChoice.max=this.multiChoice.choices.length
      }
      if(this.multiChoice.min>this.multiChoice.choices.length){
        this.multiChoice.min=this.multiChoice.choices.length
      }
    },
    add: function() {
      this.multiChoice.choices.push("")
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.multiChoice.choices.length; i++) {
        for (let j = i + 1; j < this.multiChoice.choices.length; j++) {
          if (this.multiChoice.choices[i]== this.multiChoice.choices[j] ) {
            find = true; break;
          }
        }
        if (find) break;
      }
      if(find){
        alert("不可以存在重复项")

      }else {
        this.multiChoice.edit=0
        this.$emit('saveMultiData',this.multiChoice)
      }
    },
    edit: function() {
      this.multiChoice.edit=1
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
.RightDiv{
  text-align: right;
  margin-left:70px;
}
.RightElement{
  display: inline;
  margin-left: 20px
}
.LeftDiv{
  text-align: left;
  margin-left:70px;
  margin-bottom:20px ;
}
.el-divider-top{
  margin-top: 5px;
}
</style>

