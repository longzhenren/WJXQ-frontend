


<template>

  <div >
    <el-form  class="InnerDiv">
        <label class="InnerElement">问题</label>
        <el-input class="InnerElement" v-model="QesData.question"
                  placeholder="请输入问题"
                  type="textarea">
        </el-input>


        <label class="InnerElement">描述


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



                <el-button  @click="add"  >新建选项</el-button>
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
                  default() {
                    return {};
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
                    id:"",
                    number:"",
                    describe: "这是一个描述",
                    question:"",
                    choices:["选项1","选项2"],
                    radio: 0,

                    //settings
                    edit:1,
                    Must:true,
                    Times:[10,10]
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
              created() {
                bus.$on('SaveEdited',this.saveData)
              },
              beforeDestroy(){
                bus.$off('SaveEdited',this.saveData)
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
                del:function (i){
                  if(this.QesData.choices.length>2)
                  {
                    this.QesData.choices.splice(i,1)
                    this.QesData.Times.splice(i,1)
                  }
                  else {
                    this.$message.warning("选项不可以少于2")
                  }
                },
                add: function() {
                  this.QesData.choices.push("")
                  this.QesData.Times.push(10)
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
                    bus.$emit('SaveData',this.QesData,this.needSendIdx)
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
              margin-bottom: 20px;
            }
          </style>


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
          <el-checkbox v-model="QesData.Amount">显示数量</el-checkbox>
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
      default() {
        return {};
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
        id:"",
        number:"",
        describe: "这是一个描述",
        question:"",
        choices:["选项1","选项2"],
        radio: 0,

        //settings
        edit:1,
        Must:true,
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
  created() {
    bus.$on('SaveEdited',this.saveData)
  },
  beforeDestroy(){
    bus.$off('SaveEdited',this.saveData)
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
    del:function (i){
      if(this.QesData.choices.length>2)
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
        bus.$emit('SaveData',this.QesData,this.needSendIdx)
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

