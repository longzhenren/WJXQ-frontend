


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
        </el-row>



      </el-form>

    </div>
    <div class="InnerDiv">



      <el-button  @click="add"   >新建选项</el-button>
      <el-button  @click="save" >保存</el-button>
      <el-divider content-position="center">题目设置</el-divider>

      <el-form>



        <el-form class="left" :inline="true"  v-for="(choice,i) in QesData.choices"  >
          <div class="demo-input-suffix">
            {{i+1}}. 名额：
            <el-input   v-model="QesData.Times[i]"
                        placeholder="请输入名额"
                        type="number"
                        style="max-width: 40%"
                        :min="0"
            >
            </el-input>
          </div>


        </el-form>
        <el-form-item class="left">
          <el-checkbox v-model="QesData.Must">必答题</el-checkbox>
        </el-form-item >
        <el-form-item label="数量限制" v-if="QesData.Must==true">
          <el-row :gutter="10" class="InnerElement" type="flex"  justify="left" >
            <el-col :span="8">
              <el-select v-model="QesData.min" @change="changeMin" placeholder="最少选择">
                <el-option v-for="(choice,i) in QesData.choices" :label="i+1" :value="i+1" v-if="i+1<=QesData.max" ></el-option>
                <el-option v-for="(choice,i) in QesData.choices" :label="i+1" :value="i+1" v-if="i+1>QesData.max" :disabled="true" ></el-option>
              </el-select>
            </el-col >
            <el-col :span="2" class="centerElement">
              <label>-</label>
            </el-col>
            <el-col :span="8" >
              <el-select v-model="QesData.max" @change="changeMax"  placeholder="最多选择">
                <el-option v-for="(choice,i) in QesData.choices" :label="i+1" :value="i+1" v-if="i+1>=QesData.min" ></el-option>
                <el-option v-for="(choice,i) in QesData.choices" :label="i+1" :value="i+1" v-if="i+1<QesData.min" :disabled="true" ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>



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



        max:1,
        min:1,
        Must:true,
        edit:1,
        Times:[10,10]
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
      this.QesData.Times = this.FatherData.Times;
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
          describe:"",
          question:"",
          choices:["",""],
          radio:[],



          max:1,
          min:1,
          Must:true,
          edit:1,
          Times:[10,10]
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
    saveData(index){
      console.log("传入修改器 当前需要修改"+this.needSendIdx)
      console.log("传入修改器 上一修改"+index)
      if (index===this.needSendIdx){
        console.log(index)
        this.save()
      }
    },
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
      if(this.QesData.choices.length>2)
      {
        this.QesData.choices.splice(i,1)
        if(this.QesData.max>this.QesData.choices.length){
          this.QesData.max=this.QesData.choices.length
        }
        if(this.QesData.min>this.QesData.choices.length){
          this.QesData.min=this.QesData.choices.length
        }
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
.left{
  text-align: left;
  margin-bottom: 20px;
}
</style>

