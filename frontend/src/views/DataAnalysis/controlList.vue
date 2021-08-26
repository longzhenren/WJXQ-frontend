<template>
  <div class="controlList">
    <ul>
      <li @click="changeQuesShowTable(false,0)" :class="{chartActive: currentShow===0}">
        <i class="el-icon-caret-top"></i>
        收起
      </li>

      <li @click="changeQuesShowTable(true,1)" :class="{chartActive: currentShow===1}" >
        <i class="el-icon-s-help"></i>
        饼状图
      </li>

      <li @click="changeQuesShowTable(true,2)" :class="{chartActive: currentShow===2}">
        <i class="el-icon-help"></i>
        圆环图
      </li>

      <li @click="changeQuesShowTable(true,3)" :class="{chartActive: currentShow===3}">
        <i class="el-icon-s-data"></i>
        柱状图
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "controlList",
  props:{

  },
  data(){
    return {
      // 当前激活的按钮
      currentShow: 0,
    }
  },
  methods: {
    // 修改问题列表需要展示的图表
    changeQuesShowTable(bool,num){
      this.$emit('changeShowState',bool);
      // this.NeedShowQuestions[idx].isShowChart = bool;
      // this.NeedShowTableQues = idx
      this.currentShow = num
    },
  }
}
</script>

<style scoped>
 .controlList {
  /*background-color: #F2F2F2;*/
  width: 40%;
  height: 50px;

}

 .controlList ul .chartActive {
  background-color: #58ACFA;
  color: #F2F2F2;
}

 .controlList ul {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
 }

 .controlList ul li {
   display: flex;
   flex-direction: row;
   /*flex: 20%;*/
   justify-content: space-around;
   align-items: center;
   width: 80px;
   height: 30px;
   border: 1px solid #58ACFA;
   background-color: white;
   border-radius: 5px;
   cursor: pointer;
   /*margin-left: 10px;*/
 }

 .controlList ul li:hover {
   background-color: #58ACFA;
   color: #F2F2F2;
 }
</style>