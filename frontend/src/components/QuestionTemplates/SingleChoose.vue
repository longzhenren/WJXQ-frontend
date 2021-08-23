


<template>

  <div v-if="singleChoice.edit==1" style="text-align: left">
    <el-form  label-width="80px"  >
      <el-form-item label="单选题" style="margin-bottom: 10px">
        <el-input v-model="singleChoice.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>

      </el-form-item>
      <el-form-item >
        <el-input v-model="singleChoice.describe"
                  placeholder="请输入描述"
                  type="textarea" style="font-size:12px">
        </el-input>

      </el-form-item>
    </el-form>
    <div class="LeftDiv">

  <el-radio-group v-model="singleChoice.radio"   class="InnerDiv" >

    <el-form  style="margin-left: 20px" label-width="80px" :inline="true" class="demo-form-inline" v-for="(choice,i) in singleChoice.choices"  >
      <el-form-item  ><label>{{i+1}}.</label></el-form-item>
      <el-form-item  >
        <el-input   v-model="singleChoice.choices[i]"
                    placeholder="请输入选项"
                    type="textarea"
                    >
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="danger" icon="el-icon-delete" @click="singleChoice.choices.splice(i,1)" circle></el-button>
      </el-form-item>

    </el-form>

  </el-radio-group>
    </div>
    <div class="RightDiv">

      <el-checkbox v-model="singleChoice.Must" class="RightElement" >必答题</el-checkbox>

     <el-button type="primary" @click="add" class="RightElement"  >新建选项</el-button>
     <el-button type="success" @click="save" class="RightElement" >保存</el-button>
      <el-divider content-position="left">
      </el-divider>
  </div>



  </div>
  <div v-else  class="InnerDiv" >
      <div >

        <label v-if="singleChoice.Must==true" style="color: red" >*</label>
              <label  >单选题 - {{singleChoice.question}}</label>

      </div>
      <div >
        <label  style="font-size: 12px;color: darkgrey"> {{singleChoice.describe}} </label>
      </div>
    <el-divider content-position="left" class="el-divider-top"></el-divider>
    <el-radio-group v-model="singleChoice.radio"  class="InnerDiv"  >
      <el-radio   v-for="(choice,i) in singleChoice.choices" :label="singleChoice.choices[i]"
                  style="margin-left: 60px;margin-bottom:10px;display: block"
                  >
      </el-radio>
    </el-radio-group>

    <div class="RightDiv">
      <el-divider content-position="right"> <el-button  icon="el-icon-edit" type="primary" @click="edit" class="RightElement"  >修改</el-button></el-divider>
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
      singleChoice:{
        id:"",
        number:"",
        edit:1,
        describe: "",
        question:"",
        choices:["",""],
        radio: 0,
        Must:true,
      }
    };
  },
  mounted() {
    // console.log(this.FatherData)
    if ( this.FatherData.question!==null && this.FatherData.question!=={} && this.FatherData.question!==undefined ){
      this.singleChoice.edit = this.FatherData.edit;
      this.singleChoice.question = this.FatherData.question;
      this.singleChoice.choices = this.FatherData.choices;
      this.singleChoice.radio = this.FatherData.radio;
      // this.singleChoice = this.FatherData
    }
  },

  watch: {
    FatherData(newData,oldData){
      if ( newData.edit!==null && newData.edit!=={} && newData.edit!==undefined ){
        this.singleChoice = newData;
      }
      else  {
        this.singleChoice = {
          id:"",
          number:"",
          edit:1,
          question:"",
          choices:["",""],
          radio: 0,
          Must:true,
        }
      }
    },
  },
  methods: {
    add: function() {
      this.singleChoice.choices.push("")
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.singleChoice.choices.length; i++) {
        for (let j = i + 1; j < this.singleChoice.choices.length; j++) {
          if (this.singleChoice.choices[i]== this.singleChoice.choices[j] ) {
            find = true; break;
          }
        }
        if (find) break;
      }
      if(find){
        alert("不可以存在重复项")
      }else {
        this.singleChoice.edit=0
        this.$emit('saveSingleData',this.singleChoice)
      }
    },
    edit: function() {
      this.singleChoice.edit=1
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

