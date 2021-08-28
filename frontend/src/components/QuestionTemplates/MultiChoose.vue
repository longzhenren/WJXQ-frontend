


<template>

  <div class="InnerDiv">
    <div >
      <label v-if="QesData.Must==true" style="color: red" >*</label>
      <label>多选题 - {{ QesData.question }}</label>
    </div>
    <div >
      <label  class="describe"> {{ QesData.describe }} </label>
    </div>
    <el-divider content-position="left" class="el-divider-top"></el-divider>
    <el-checkbox-group v-model="QesData.radio" class="InnerDiv"  >
      <el-checkbox v-for="(choice,i) in QesData.choices" :label="QesData.choices[i]" :key="choice"
                   class="Choice"
                  >
      </el-checkbox>
    </el-checkbox-group >

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
        describe:"这是一个描述",
        question:"",
        choices:["选项1","选项2"],
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
      if(this.QesData.min>this.QesData.max){
        this.QesData.min=this.QesData.max;
      }
    },
    changeMin: function(){
      if(this.QesData.min>this.QesData.max){
        this.QesData.max=this.QesData.min;
      }
    },
    del:function (i){
      this.QesData.choices.splice(i,1)
      if(this.QesData.max>this.QesData.choices.length){
        this.QesData.max=this.QesData.choices.length
      }
      if(this.QesData.min>this.QesData.choices.length){
        this.QesData.min=this.QesData.choices.length
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
        alert("不可以存在重复项")

      }else {
        this.QesData.edit=0
        this.$emit('saveMultiData',this.QesData)
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

