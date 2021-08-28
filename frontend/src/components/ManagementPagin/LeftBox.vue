<template>
  <div class="leftBox">
    <button id="newQes" @click="chooseType"><span class="addLogo"></span>创建问卷</button>
    <div id="nav">
      <button id="allQes" class="inBtn" @click="allClicked" :class="{inChoose:$store.state.currentChoose===1}"><span class="qesLogo"></span>全部问卷</button>
      <button id="starQes" class="inBtn" @click="starClicked" :class="{inChoose:$store.state.currentChoose===2}"><span class="starLogo"></span>星标问卷</button>
      <button id="recycle" class="inBtn" @click="recClicked" :class="{inChoose:$store.state.currentChoose===3}"><span class="recLogo"></span>回收站</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftBox",
  methods:{
    allClicked() {
      this.$store.commit('allClicked')
    },
    starClicked() {
      this.$store.commit('starClicked')
    },
    recClicked(){
      this.$store.commit('recClicked')
    },
    chooseType(){
      console.log('to Type')
      this.$router.push({
        path: '/questype',
        query: {
          username: this.$store.state.personalInfo.username
        }
      })
    }
  }
}
</script>

<style scoped>
#newQes{
  display: block;
  position: absolute;
  width: 200px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding-top:3px;
  color: white;
  padding-left: 35px;
  background-color:#2eaaff;
}
#newQes:hover{
  background-color:dodgerblue ;
}
#nav{
  position: absolute;
  margin-left: -30px;
  width: 200px;
  height: 120px;
  top:80px;
  padding-top:7px;
  color: white;
}
button{
  font-size: 13px;
  display:block;
  border-bottom: #cedadf;
  border-bottom-width: 1px;
  border-radius: 0;
  border-style: solid;
  background-color: lightcyan;
  color: #444444;
  height: 40px;
  width: 200px;
}
button:hover{
  background-color: #deefef;
  transition: background-color 0.2s ease;
}
.inBtn{
  display: block;
  text-align: left;
  padding-left: 50px;
}
.inChoose{
  background-color: #deefef;
  color: #000;
  font-weight: bold;
}
.leftBox{
  position: absolute;
  top:70px;
  left: 15%;
}
span[class=addLogo]::after{
  position: absolute;
  font-size: 18px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\ea0a';
  top: -8px;
  left:49px;
}
span[class=qesLogo]::after{
  position: absolute;
  font-size: 16px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e964';
  top: -8px;
  left:53px;
}
span[class=starLogo]::after{
  position: absolute;
  font-size: 16px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e9d9';
  top: 32px;
  left:53px;
}
span[class=recLogo]::after{
  position: absolute;
  font-size: 16px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e9ad';
  top: 72px;
  left:53px;
}
</style>