<template>
  <div class="modal-bg" v-if="show">//我曹，最开始用成了v-show，不是动态了，人搞傻b了,以后不再用v-show了
    <div class="bg" @click="bgClicked"></div>
    <div class="modal-container">
      <div class="modal-main">
        <AnswerQuestionnaire :qesId="QesInfoModel.EncodeID"></AnswerQuestionnaire>
      </div>
      <div class="modal-footer">
        <button @click="close">确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerQuestionnaire from "../../../views/AnswerQuestionnaire/AnswerQuestionnaire";
export default{
  name: 'Model',
  data() {
    return {}
  },
  props: {
    QesInfoModel:Object,
    show: {    // 控制弹窗展示
      type: Boolean,
      default: false,
      required: true,   // 必传递
    },
  },
  methods: {
    bgClicked(){
      this.$emit("hideModal");
    },
    // 通过事件绑定及$emit来执行父组件的方法，改变弹窗展示状态
    close() {
      this.$emit("hideModal");
    },
  },
  components:{
    AnswerQuestionnaire,
  },

}
</script>
<style>
.bg{
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  z-index:998;
}
.modal-bg{
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index:997;
}
.modal-container{
  display: block;
  position: absolute;
  width: 50%;
  top: 20%;
  overflow:auto;
  left: 25%;
  border-radius: 8px;
  background: #fff;
  z-index: 999;
}
.modal-main {
  padding: 20px 40px;
}
.modal-footer{
  height: 100px;
  display: flex;
  justify-content: center;
  align-item: center;
  border-top: 1px solid #000;
}
.modal-footer button{
  height: 30px;
  width:100px;
}
</style>
