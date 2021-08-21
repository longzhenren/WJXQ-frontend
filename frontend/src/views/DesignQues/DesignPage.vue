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
              <span v-if="isShowQuesNum">{{ item.idx + 1 }}</span>
              {{ item.name }}
            </li>
          </ul>
        </div>

      </div>


      <div class="designPreview">

          <div class="QuesBase">
            <div class="QuesTitle">{{ QuesTitle }}</div>
            <div class="AutoNumSwitch">
              <el-switch
                  style="display: block"
                  v-model="isShowQuesNum"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="题号显示"
                  inactive-text="题号隐藏">
              </el-switch>
            </div>
          </div>

        <vue-scroll ref="vs"
            :ops="ops" >
          <ul class="QuesList" v-if="QuesList.length!==0">

              <li class="QuesItem" v-for="(item,index) in QuesList" :key="item.idx" :draggable="item.isDraggable"
                  @dragstart="handleDragStart($event,item)"
                  @dragover.prevent="handleDragOver($event)"
                  @dragenter="handleDragEnter($event,item)"
                  @dragend="handleDragEnd($event,item)">
                <span v-if="isShowQuesNum">{{ item.idx + 1 }}</span>
                {{ item.name }}

                <div class="componentsItem" @mouseover="OverDrag(index,item)" @mouseleave="LeaveDrag(index,item)">
                  <SingleChoose v-if="item.type==='singleChoice'"
                                @saveSingleData="SingleChoiceSave($event,item)"
                                :father-data="item.subData"></SingleChoose>
                </div>


                <div class="options">
                  <ul>
<!--                    <li>编辑</li>-->
                    <li @click="deleteQues(index)">删除</li>
                    <li @click="moveUp(index)">上移</li>
                    <li @click="moveDown(index)">下移</li>
                    <li @click="ShowItem(item)">最前</li>
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

      // 以下为需要传给后端进行保存的数据
      // 是否开启自动显示题号
      isShowQuesNum: false,

      // 问卷标题
      QuesTitle: 'title',

      // 问卷问题列表
      QuesList: [
        {
          name: 'aaa',
          idx: 0,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 1,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 2,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 3,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 4,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 5,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 6,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 7,
          isDraggable: true,
          subData: {},
          type: ''
        },
        {
          name: 'bbb',
          idx: 8,
          isDraggable: true,
          subData: {},
          type: ''
        },

      ],

      // 当前正在拖动的元素
      dragging: null,

    }
  },
  methods: {
    ShowItem(item){
      console.log(item)
    },

    // 单选题数据保存
    SingleChoiceSave(val,item){
      // console.log(item);
      // console.log(item)
      console.log(val)
      item.subData = val;
      item.name=val.
      console.log(item)
    },

    // 增加题目
    addNewQues(type,QuesNum){
      // 增加选择题
      if (type===0){
        switch (QuesNum) {
          // 增加单选
          case 0:
            let Opt = {
              name: '单选题标题',
              idx: this.QuesList.length,
              isDraggable: true,
              subData: {},
              type: 'singleChoice'
            }
            this.addNewQuesToQuesList(Opt);


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



    // 增加新题目到列表中
    addNewQuesToQuesList(SubjectObj){
      let length = this.QuesList.length;
      this.QuesList.splice(length,0,SubjectObj);
      let QuesItems = document.querySelector(".QuesList").children;
      // console.log(QuesItems);
      let node = QuesItems[0].cloneNode();

    },

    // 删除题目列表中的题目
    deleteQues(index){
      let quesList = this.QuesList;
      if (quesList.length===0){
        this.$message({
          showClose: true,
          message: '列表为空，不可操作',
          type: 'error'
        });
        return;
      }
      quesList.splice(index,1);
      for (let i = 0; i < quesList.length; i++) {
        quesList[i].idx=i;
      }
    },


    // 上移
    moveUp(index){
      // let QuesList = document.querySelector(".QuesList").children;
      // console.log(QuesList)
      let quesList = this.QuesList;
      // console.log(QuesList[index])
      if (index===0){
        this.$message({
          showClose: true,
          message: '已在最前，不可上移',
          type: 'error'
        });
        return;
      }

      let src = quesList[index];
      let dest = quesList[index-1];
      // let quesList = Array.from(QuesList);
      // console.log(quesList)
      // // console.log(dest);
      quesList.splice(index,1,dest);
      quesList.splice(index-1,1,src);
      // for (let i = 0; i < QuesList.length; i++) {
      //   QuesList[i]=quesList[i];
      // }
      for (let i = 0; i < quesList.length; i++) {
        quesList[i].idx=i;
      }
    },

    // 下移
    moveDown(index){
      let quesList = this.QuesList;
      if (index===quesList.length-1){
        this.$message({
          showClose: true,
          message: '已在最后，不可下移',
          type: 'error'
        });
        return;
      }
      let src = quesList[index];
      let dest = quesList[index+1];
      // console.log(dest);
      quesList.splice(index,1,dest);
      quesList.splice(index+1,1,src);
      for (let i = 0; i < quesList.length; i++) {
        quesList[i].idx=i;
      }
    },

    // 快速导航
    IndexNav(index){
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


    // 判断鼠标是否经过子组件
    OverDrag(index,item){
      item.isDraggable=false;
    },


    // 判断鼠标离开组件
    LeaveDrag(index,item){
      item.isDraggable=true;
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

      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      newItems.splice(dst, 0, ...newItems.splice(src, 1))

      for (let i = 0; i < newItems.length; i++) {
        newItems[i].idx=i;
      }

      this.QuesList = newItems
    },


    // js实现样式更改
    ShowOptions(){
      // console.log('111')
      let QuesList = document.querySelector(".QuesList").children;
      // console.log(QuesList)
      for (let i = 0; i < QuesList.length; i++) {
        let QuesItem = QuesList[i];
        QuesItem.addEventListener("mouseover",function () {
          let options = QuesItem.querySelector(".options");
          options.style.display = 'flex'
          // console.log('aaa');
          options.style.justifyContent = 'space-around'
        })
        QuesItem.addEventListener('mouseout',function () {
          // console.log('aaa');
          let options = QuesItem.querySelector(".options");
          options.style.display = 'none'
        })
      }
    }
  },
  mounted() {
    // this.ShowOptions();
  },
  watch: {
    QuesList(newList,oldList){
      this.QuesList=newList;
      console.log(this.QuesList)
      this.ShowOptions();
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
    position: relative;
    box-sizing: border-box;
  }

  .designContent .designPreview  .QuesBase .QuesTitle {
    font-size: 22px;
    color: #A4A4A4;
    font-weight: 600;
  }

  .designContent .designPreview  .QuesBase .AutoNumSwitch {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }


  .designContent .designPreview .QuesList {
    width: 100%;
    padding-bottom: 138px;
  }

  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    min-height: 130px;
    padding-top: 20px;
    padding-bottom: 16%;
    /*margin: 20px 0;*/
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    position: relative;

    z-index: 44;
  }

  .designContent .designPreview .QuesList .QuesItem .options {
    /*background-color: #58ACFA;*/
    width: 100%;
    height: 15%;
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
    /*z-index: 200;*/
  }

  .designContent .designPreview .QuesList .QuesItem .options ul li:hover {
    cursor: pointer;
    border: 1px solid #2E9AFE;
  }

  .designContent .designPreview .QuesList .QuesItem:hover {
    cursor: move;
  }

</style>