


<template>

  <div >
    <el-form  class="InnerDiv">
        <label class="InnerElement">问题</label>
        <el-input class="InnerElement" v-model="singleChoice.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>


        <label class="InnerElement">描述</label>
        <el-input v-model="singleChoice.describe"
                  placeholder="请输入描述" class="InnerElement"
                  type="textarea" style="font-size:12px">
        </el-input>

    </el-form>
    <div class="InnerElementLeft" >



    <el-form  :inline="true"  v-for="(choice,i) in singleChoice.choices"  >
      <el-row :gutter="10" class="InnerElement" type="flex"  justify="center" >
        <el-col :span="2" class="centerElement" >
          <label  >{{i+1}}.</label>
        </el-col>
        <el-col :span="18">
          <el-input   v-model="singleChoice.choices[i]"
                      placeholder="请输入选项"
                      type="textarea">
          </el-input>
        </el-col >
        <el-col :span="2" class="centerElement">
          <el-button  icon="el-icon-delete"   type="text" @click="singleChoice.choices.splice(i,1)" ></el-button>
        </el-col>
      </el-row>



    </el-form>

    </div>
    <div class="InnerDiv">



     <el-button  @click="add" class="RightElement"  >新建选项</el-button>
     <el-button  @click="save" class="RightElement" >保存</el-button>
      <el-divider content-position="center">题目设置</el-divider>
      <el-checkbox v-model="singleChoice.Must" class="RightElement" >必答题</el-checkbox>

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
      this.singleChoice.describe = this.FatherData.describe;
      this.singleChoice.radio = this.FatherData.radio;
      this.singleChoice.Must = this.FatherData.Must;
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
          describe: "",
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
.Rightdown{
  alignment: bottom;
}
.centerElement{
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}
</style>

