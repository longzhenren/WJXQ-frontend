


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
          <el-button  icon="el-icon-delete"   type="text" @click="del" ></el-button>
        </el-col>
      </el-row>



    </el-form>

    </div>
    <div class="InnerDiv">



     <el-button  @click="add"  >新建选项</el-button>
     <el-button  @click="save" >保存</el-button>
      <el-divider content-position="center">题目设置</el-divider>
      <el-form>
        <el-form-item class="left">
          <el-checkbox v-model="QesData.Must">必答题</el-checkbox>
          <el-checkbox v-model="QesData.Rate">显示比例</el-checkbox>
          <el-checkbox v-model="QesData.Amount">显示数量</el-checkbox>
        </el-form-item>

      </el-form>
  </div>



  </div>

</template>

<script>
export default {
  props:{
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
        edit:1,
        Must:true,
        Rate:true,
        Amount:true
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
    del:function (i){
      if(this.QesData.choices>=2)
      {
        this.QesData.choices.splice(i,1)
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
      for (let i = 0; i < this.QesData.choices.length; i++) {
        for (let j = i + 1; j < this.QesData.choices.length; j++) {
          if (this.QesData.choices[i]== this.QesData.choices[j] ) {
            find = true; break;
          }
        }
        if (find) break;
      }
      if(find){
        this.$message.warning("不可以存在重复项")
      }else {
        this.QesData.edit=0
        this.$emit('saveSingleData',this.QesData)
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

