<template>
  <div id="qrcode" ref="qrcode" @click="downloadE"></div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: "QRCode",
  components: {
    QRCode
  },
  props: {
    Urlpath: String,
    CodeHeight: Number,
    CodeWidth: Number,
  },

  data(){
    return {

    }
  },
  mounted() {
    this.$nextTick (function () {
      this.qrcode();
    })
  },
  methods: {
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: this.CodeWidth,  // 设置宽度
        height: this.CodeHeight, // 设置高度
        text: this.Urlpath
      })
    },


    downloadE() {
      let canvasData = this.$refs.qrcode.getElementsByTagName('canvas')
      let a = document.createElement("a");
      let event = new MouseEvent("click"); // 创建一个单击事件
      a.href = canvasData[0].toDataURL("image/jpg");
      a.download = "drcQrcode";
      a.dispatchEvent(event); // 触发a的单击事件
    },
  }
}



</script>

<style scoped>

</style>

