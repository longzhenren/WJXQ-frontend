


<template>

  <div class="InnerDiv"  >
    <el-form  label-width="80px"  >
      <el-form-item label="评分题" v-if="QesData.edit==1" >
        <el-input v-model="QesData.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item v-if="QesData.edit==1" >
        <el-input  v-model="QesData.describe"
                  placeholder="请输入描述"
                  type="textarea" style="font-size:12px">
        </el-input>

      </el-form-item>
      <div v-else >
        <label v-if="QesData.Must==true" style="color: red" >*</label>
        <label>评分题 - {{ QesData.question }}</label>
        <div >
          <label  class="describe"> {{ QesData.describe }} </label>
        </div>
        <el-divider class="el-divider-top"></el-divider>

      </div>
    </el-form>
    <div class="Choice">
    <el-rate
        v-model="QesData.score"
        show-text
        :texts="QesData.describes"
        :max="QesData.describes.length"
    > </el-rate>
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
      QesData:{
        question:"",
        score:null,
        describe:"这是一个描述",
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
  },
  methods: {
    del:function (i){
      this.QesData.describes.splice(i,1)
      this.QesData.level.splice(i,1)
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
        alert("选项分数设置不可以为空")
      }else {
        this.QesData.edit=0
        this.$emit('saveEvaluateData',this.QesData)
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
</style>

