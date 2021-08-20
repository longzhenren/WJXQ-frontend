<template>
  <div class="designPage">
    <nav class="designNav">
      <div class="QuesPreview"> 预览</div>

      <div class="release"> 编辑完成</div>
    </nav>

    <div class="designContent">
      <div class="designComponent">
        <div class="ShowCntl">
          <div :class="{active: ShowNum===0}" @click="changeDesignTools(0)">题型选择</div>
          <div :class="{active: ShowNum===1}" @click="changeDesignTools(1)">问卷大纲</div>
        </div>

<!--        题型组件库-->
        <div class="components" v-if="ShowNum===0">

          <div class="choices" v-for="(item,index) in QuesTypeList">
            <div class="title"> {{ item.type }}</div>
            <ul>
              <li v-for="(i,idx) in item.details" @click="addNewQues(index,idx)">{{i}}</li>
            </ul>
          </div>

        </div>


<!--        该问卷的大纲-->
        <div class="outline" v-else >
          <ul ref="outline_nav">
            <li v-for="(item,index) in QuesList" class="outlineItem" @click="IndexNav(index)">
                {{ item.name }}
            </li>
          </ul>
        </div>

      </div>


      <div class="designPreview">

          <div class="QuesBase">
            <div class="QuesTitle">{{ QuesTitle }}</div>
          </div>

        <vue-scroll ref="vs"
            :ops="ops" >
          <ul class="QuesList">

              <li class="QuesItem" v-for="(item,index) in QuesList" :key="item.idx" :draggable="true"
                  @dragstart="handleDragStart($event,item)"
                  @dragover.prevent="handleDragOver($event)"
                  @dragenter="handleDragEnter($event,item)"
                  @dragend="handleDragEnd($event,item)">
                {{ item.name }}
                <SingleChoose v-if="item.name==='SingleChoose'"></SingleChoose>
                <div class="options">
                  <ul>
                    <li>编辑</li>
                    <li>删除</li>
                    <li>上移</li>
                    <li>下移</li>
                    <li>最前</li>
                    <li>最后</li>
                  </ul>
                </div>
              </li>

          </ul>
        </vue-scroll>

      </div>
    </div>

  </div>

</template>

<script>
import SingleChoose from "../../components/QuestionTemplates/SingleChoose";

export default {
  name: "DesignPage",
  components:{
    SingleChoose
  },
  data(){
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },

      // 问题类型列表
      QuesTypeList: [
        // 选择
        {
          type: '选择',
          details: [
              '单选',
              '多选',
              '下拉列表',
              '日期'
          ]
        },
        {
          type: '填空',
          details: [
            '单项',
            '多项'
          ]
        },
        {
          type: '评分',
          details: [
            '评价',
          ]
        },

      ],


      ShowNum: 0,

      // 问卷标题
      QuesTitle: 'title',

      // 问卷问题列表
      QuesList: [
        {
          name: 'aaa',
          idx: 0,
        },
        {
          name: 'bbb',
          idx: 1,
        },
        {
          name: 'bbb',
          idx: 2,
        },
        {
          name: 'bbb',
          idx: 3,
        },
        {
          name: 'bbb',
          idx: 4,
        },
        {
          name: 'bbb',
          idx: 5,
        },
        {
          name: 'bbb',
          idx: 6,
        },
        {
          name: 'bbb',
          idx: 7,
        },
        {
          name: 'bbb',
          idx: 8,
        },

      ],

      // 当前正在拖动的元素
      dragging: null,

    }
  },
  methods: {

    // 增加题目
    addNewQues(type,QuesNum){
      // 增加选择题
      if (type===0){
        switch (QuesNum) {
          // 增加单选
          case 0:
            let Opt = {
              name: 'SingleChoose',
              idx: this.QuesList.length
            }
            this.QuesList.push(Opt);
            break;

            // 增加多选
          case 1:
            console.log('增加多选')
            break;

            // 增加下拉菜单
          case 2:
            console.log('增加下拉菜单')
            break;
        }
      }
      // 增加填空题
      else if (type===1){
        switch (QuesNum) {
            // 增加单项
          case 0:

            break;

            // 增加多项
          case 1:
            break;
        }
      }
    },



    // 快速导航
    IndexNav(index){
      // let dest =
      let QuesItems = document.querySelector(".QuesList").children;
      let height = 0;
      for (let i = 0; i < index; i++) {
        height+=QuesItems[i].clientHeight;
      }
      this.$refs.vs.scrollTo({
        y: height
      },
          500,
          "easeInQuad"
      )

    },


    // 切换工具栏
    changeDesignTools(idx){
      this.ShowNum=idx
      console.log(this.ShowNum)
    },
    handleDragStart(e,item){
      this.dragging = item;
    },
    handleDragEnd(e,item){
      this.dragging = null
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e,item){
      e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
      if(item === this.dragging){
        return
      }
      const newItems = [...this.QuesList]
      // console.log(newItems)
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      newItems.splice(dst, 0, ...newItems.splice(src, 1))

      for (let i = 0; i < newItems.length; i++) {
        newItems[i].idx=i;
      }

      this.QuesList = newItems
    }

  },
  mounted() {
    let QuesList = document.querySelector(".QuesList").children;
    console.log(QuesList)
    for (let i = 0; i < QuesList.length; i++) {
      let QuesItem = QuesList[i];
      QuesItem.addEventListener("mouseover",function () {
        let options = QuesItem.querySelector(".options");
        options.style.display = 'flex'
        options.style.justifyContent = 'space-around'
      })
      QuesItem.addEventListener('mouseout',function () {
        let options = QuesItem.querySelector(".options");
        options.style.display = 'none'
      })
    }
  }
}
</script>

<style scoped>
  .designPage {
    width: 100vw;
    height: 100vh;
    background-color: #E6E6E6;
  }
  .designNav {
    background-color: #380B61;
    height: 6vh;
    position: relative;
  }

  .designNav .QuesPreview {
    height: 100%;
    background-color: white;
    color: #58ACFA;
    width: 7%;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10%;
    top: 0;
    transition: .4s all ease-in-out;
  }

  .designNav .QuesPreview:hover {
    background-color: #58ACFA;
    color: white;
    cursor: pointer;
  }

  .designNav .release {
    height: 100%;
    width: 10%;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
    position: absolute;
    top: 0;
    right: 5%;
    transition: .4s all ease-in-out;
  }

  .designNav .release:hover {
    background-color: white;
    color: #58ACFA;
    cursor: pointer;
  }

  .designContent {
    width: 80vw;

    box-sizing: border-box;
    height: 94vh;
    /*background-color: white;*/
    padding-top: 10px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 7fr;
    column-gap: 15px;
  }

  .designContent .designComponent {
    background-color: white;
    box-sizing: border-box;
    height: 92vh;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    /*box-sizing: border-box;*/
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .designContent .designComponent .ShowCntl {
    /*background-color: pink;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7%;
    font-weight: 600;
  }

  .designContent .designComponent .ShowCntl div {
    width: 50%;
    height: 70%;
    box-sizing: border-box;
    transition: .4s;
  }

  .designContent .designComponent .ShowCntl div:hover {
    cursor: pointer;
  }

  .designContent .designComponent .ShowCntl .active {
    border-bottom: 2px solid #A4A4A4;
    color: #CC2EFA;
    box-sizing: border-box;
    transition: .4s;
  }

  .designContent .designComponent .components {
    /*background-color: greenyellow;*/
    height: 90%;
  }

  .designContent .designComponent .components .choices {
    /*background-color: pink;*/
    /*height: 20%;*/
  }

  .designContent .designComponent .components .choices .title {
    width: 100%;
    /*background-color: blue;*/
    height: 50px;
    text-align: left;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .designContent .designComponent .components .choices ul {
    display: flex;
    justify-content: space-around;
    /*height: 70%;*/
    flex-direction: column;
    /*align-content: space-around;*/
  }
  .designContent .designComponent .components .choices ul li {
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    text-align: left;
    margin-left: 20px;

  }

  .designContent .designComponent .components .choices ul li:hover {
    color: #58ACFA;
    cursor: pointer;
  }


  .designContent .designComponent .outline {
    /*background-color: skyblue;*/
    height: 90%;
  }

  .designContent .designComponent .outline .outlineItem {
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    line-height: 30px;
    text-align: start;
  }

  .designContent .designPreview {
    background-color: blue;
    box-sizing: border-box;
    height: 92vh;
    /*position: relative;*/
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
  }


  .designContent .designPreview  .QuesBase {
    width: 100%;
    height: 20%;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    padding-top: 20px ;
    box-sizing: border-box;
  }

  .designContent .designPreview  .QuesBase .QuesTitle {
    font-size: 22px;
    color: #A4A4A4;
    font-weight: 600;
  }


  .designContent .designPreview .QuesList {
    /*overflow: hidden;*/
    /*overflow-x: scroll;*/
    /*white-space: nowrap;*/
    /*position: absolute;*/
    width: 100%;
    /*bottom: 0;*/
    padding-bottom: 138px;
  }

  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    height: 150px;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    position: relative;

    /*z-index: 44;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options {
    /*background-color: #58ACFA;*/
    width: 100%;
    height: 30%;
    position: absolute;
    bottom: 0;
    display: none;
    /*display: flex;*/
    /*justify-content: space-around;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options ul {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 350px;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li {
    height: 25px;
    width: 10%;
    display: inline-block;
    /*margin: 0;*/
    /*padding: 0;*/
    line-height: 25px;
    /*background-color: pink;*/
    font-size: 14px;
    color: #A4A4A4;
    border: 1px solid #A4A4A4;
    z-index: 200;
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li:hover {
    cursor: pointer;
    border: 1px solid #2E9AFE;
  }

  .designContent .designPreview .QuesList .QuesItem:hover {
    cursor: move;
  }

</style>