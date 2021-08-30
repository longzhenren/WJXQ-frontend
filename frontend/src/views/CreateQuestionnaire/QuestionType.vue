<template>
  <div class="QueType">
    <nav class="TypeNav">
      <div class="back" @click="BackToManageHome">
        返回首页
      </div>
    </nav>

    <div class="TypeList" >
      <ul ref="typelist">
        <li v-for="(item,index) in QuesTypes">
          <div class="TypeIcon" v-if="index===0">
            <img src="../../assets/SVG/search.svg" alt="创建问卷">
          </div>

          <div class="TypeIcon" v-if="index===1">
            <img src="../../assets/SVG/search.svg" alt="创建问卷">
          </div>

          <div class="TypeIcon" v-if="index===2">
            <img src="../../assets/SVG/search.svg" alt="创建问卷">
          </div>

          <div class="TypeIcon" v-if="index===3">
            <img src="../../assets/SVG/search.svg" alt="创建问卷">
          </div>

          <div class="TypeIcon" v-if="index===4">
            <img src="../../assets/SVG/search.svg" alt="创建问卷">
          </div>

          <div class="type">
            <div class="title">{{ item.title }}</div>
            <div class="intro">{{ item.intro }}</div>
            <div class="confirm" @click="CreateNewQues(index+1)">创建</div>
          </div>
        </li>

      </ul>
    </div>


    <el-dialog title="创建调查问卷" :visible.sync="dialogFormVisible">
      <el-form :model="QuesForm">
        <el-form-item label="问卷标题">
          <el-input v-model="QuesForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="问卷描述">
          <el-input v-model="QuesForm.Text" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Confirm">立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {request} from "../../network/request";
import bus from "../../assets/utils/bus";

export default {
  name: "QuestionType",
  components: {

  },
  data(){
    return {


      // 控制鼠标是否移动到问卷项上
      isCreate: false,

      // 是否显示问卷标题输入框
      dialogFormVisible: false,


      sendId: 0,

      QuesForm: {
        id: 0,
        title: '',
        Text: '',
        Type: 1,
      },

      QuesTypes: [
        {
          title: '调查',
          intro: '丰富题型，强大逻辑' +
              '问卷密码，红包抽奖',
        },
        {
          title: '投票',
          intro: '实时排行，显示结果',

        },
        {
          title: '报名',
          intro: '支持限额，保证并发',

        },
        {
          title: '考试问卷',
          intro: '丰富题型，限时作答',

        },
        {
          title: '疫情打卡问卷',
          intro: '实时监测，严防死守',
        },
        // {
        //   title: '评估',
        //   intro: '丰富题型，强大逻辑问卷密码，红包抽奖',
        // },
      ],
    }
  },
  beforeDestroy() {
    bus.$emit('createNewQues',this.QuesForm)
  },
  mounted() {
    // let typelist = document.querySelector(".TypeList");
    let typelist = this.$refs.typelist;
    // console.log(typelist)
    let ul = typelist.children;
    // console.log(ul)
    for (let i = 0; i < ul.length; i++) {
      let ulElement = ul[i];
      ulElement.addEventListener('mouseover',function () {
        let intro = ulElement.querySelector(".intro");
        let create = ulElement.querySelector(".confirm");
        intro.style.display = 'none';
        create.style.display = 'block';
      })

      ulElement.addEventListener('mouseout',function () {
        let intro = ulElement.querySelector(".intro");
        let create = ulElement.querySelector(".confirm");
        intro.style.display = 'block';
        create.style.display = 'none';
      })
    }
  },
  methods: {


    // 返回首页
    BackToManageHome(){
      this.$router.push({
        path: '/Management',
        query: {
          username: this.$store.state.personalInfo.username
        }
      })
    },

    CreateNewQues(index){

      this.dialogFormVisible=true
      this.QuesForm.Type = index
      // console.log(this.dialogFormVisible)
    },


    // 转到设计页面
    sendRequest(){
      this.$router.push({
        path: '/design',
        query: {
          username: this.$store.state.personalInfo.username,
          id: this.QuesForm.id
        }
      });
    },

    Confirm(){
      if (this.QuesForm.title==='' ){
        this.$message({
          showClose: true,
          message: '请输入问卷标题',
          type: 'error'
        });
        return
      }
      else if (this.QuesForm.Text === ''){
        this.$message({
          showClose: true,
          message: '请输入问卷描述',
          type: 'error'
        });
        return
      }

      let pra = {
        Title: this.QuesForm.title,
        Text: this.QuesForm.Text,
        ShowNumber:false,
        Open:false,
        username: this.$store.state.personalInfo.username,
        Type: this.QuesForm.Type
      }
      request({
        url: '/question/createQuestionnaire',
        method: 'post',
        data: pra
      }).then(res=>{
        console.log(this.$store.state.personalInfo)
        console.log(res)
        // if (res.data.message === 'Success'){
        //
        // }
        this.QuesForm.id=res.data.id
        // console.log(this.QuesForm.id)

      }).catch(err=>{
        // console.log(err)
      })
      setTimeout(this.sendRequest,1000)

    }
  }
}
</script>

<style scoped>

.QueType {
  width: 100vw;
  height: 100vh;
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  .TypeNav {
    background-color: white;
    width: 100%;
    height: 20%;
  }

.TypeNav .back {
  /*background-color: black;*/
  width: 8%;
  height: 40%;
  margin-top: 3%;
  margin-left: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A4A4A4;
  letter-spacing: 2px;
  transition: .4s;
}

.TypeNav .back:hover {
  box-shadow: 0 0 10px rgba(0,0,0,.4);
  background-color: #F2F2F2;
  color: #6E6E6E;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
}

  .TypeList {
    width: 100%;
    height: 75vh;
    /*background-color: pink;*/
    display: flex;
    justify-content: center;
    align-items: start;
  }

.TypeList ul {
  display: grid;
  grid-template-rows: repeat(2,1fr);
  /*grid-template-rows: 3fr 2fr;*/
  grid-template-columns: repeat(3,1fr);
  column-gap: 10px;
  row-gap: 10px;
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*align-items: center;*/
  width: 70%;
  height: 95%;
}

.TypeList ul li {
  /*background-color: blue;*/
  background-color: white;
  position: relative;
  box-shadow: 0 0 10px rgba(164,164,164,.7);
  /*border: 1px solid #BDBDBD;*/
  display: grid;
  grid-template-rows: 55fr 45fr;
  /*row-gap: 30px;*/
}

.TypeList ul li .TypeIcon {
  /*background-color: greenyellow;*/
  display: flex;
  width: 30%;
  height: 35%;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

.TypeList ul li .TypeIcon img {
  width: 100%;
  height: 100%;
}

.TypeList ul li .type {
  /*background-color: red;*/
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.TypeList ul li .type .title {
  font-size: 20px;
  color: #1C1C1C;
}

.TypeList ul li .type .intro {
  font-size: 16px;
  color: #6E6E6E;
  display: block;
  white-space: normal;
  width: 45%;
  height: 50%;
  transition: .4s;
  /*background-color: skyblue;*/
}
.TypeList ul li .type .confirm {
  display: none;
  background-color: skyblue;
  font-size: 22px;
  color: white;
  text-align: center;
  line-height: 60px;
  width: 90%;
  height: 60px;
  transition: .4s;
}

.TypeList ul li .type .confirm:hover {
  cursor: pointer;
}


</style>