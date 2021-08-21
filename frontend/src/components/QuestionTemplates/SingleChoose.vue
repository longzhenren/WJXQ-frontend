


<template>

  <div v-if="singleChoice.edit==1" style="text-align: left">
    <el-form  label-width="80px"  >

      <el-form-item label="单选题">
        <el-input v-model="singleChoice.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>
      </el-form-item>
    </el-form>

  <el-radio-group v-model="singleChoice.radio"  style="display: block">

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
    <el-divider content-position="left">
    <div style=" text-align: left">
     <el-button type="primary" @click="add" style=" display: inline;line-height: 20px" >新建选项</el-button>
     <el-button type="success" @click="save" style="display: inline;line-height: 20px" >保存</el-button>
  </div>
    </el-divider>


  </div>
  <div v-else style="text-align: left" >
      <div style="margin-left: 10px">
              <label  >单选题{{singleChoice.question}}</label>
        <el-divider></el-divider>
      </div>
    <el-radio-group v-model="singleChoice.radio"  >

      <el-radio   v-for="(choice,i) in singleChoice.choices" :label="singleChoice.choices[i]"
                  style="margin-left: 60px;margin-bottom:10px;display: block"
                  >
      </el-radio>
    </el-radio-group>

    <div style="text-align: left" >
      <el-divider content-position="left"> <el-button  icon="el-icon-edit" type="primary" @click="edit" >修改</el-button></el-divider>
  </div>
  </div>
</template>

<script>
export default {
  props:{
    FatherData: Object,
  },
  data () {
    return {
      singleChoice:{
        edit:1,
        question:"标题",
        choices:["",""],
        radio: 0
      }
    };
  },
  mounted() {
    if ( this.FatherData.edit!==null && this.FatherData.edit!=={} && this.FatherData.edit!==undefined ){
      this.singleChoice.edit = this.FatherData.edit;
      this.singleChoice.question = this.FatherData.question;
      this.singleChoice.choices = this.FatherData.choices;
      this.singleChoice.radio = this.FatherData.radio;
      return
    }
  },
  watch: {
    FatherData(newData,oldData){
        this.singleChoice = newData;

    }
  },
  methods: {
    add: function() {
      this.singleChoice.choices.push("")
      console.log(this.FatherData)
      console.log(this.singleChoice)
    },
    save: function() {
      let find = false;
      for (let i = 0; i < this.singleChoice.choices.length; i++) {
        for (let j = i + 1; j < this.singleChoice.choices.length; j++) {
          if (this.singleChoice.choices[i]=== this.singleChoice.choices[j] ) {
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


</style>

