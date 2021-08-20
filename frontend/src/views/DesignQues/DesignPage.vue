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

<!--&lt;!&ndash;          选择题型&ndash;&gt;-->
<!--          <div class="choices">-->
<!--            <div class="choiceTitle"></div>-->
<!--            <div class="choiceOpts">-->

<!--            </div>-->
<!--          </div>-->

<!--&lt;!&ndash;          文本题型&ndash;&gt;-->
<!--          <div class="texts"></div>-->

<!--&lt;!&ndash;          评分题型&ndash;&gt;-->
<!--          <div class="comments"></div>-->
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-submenu index="1">

              <template slot="title">
                <span>  </span>
                <span>选择题</span>
              </template>

                <el-menu-item index="1-1" > 单选题</el-menu-item>
                <el-menu-item index="1-2" > 多选题</el-menu-item>
                <el-menu-item index="1-3" > 下拉列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2">

              <template slot="title">
                <i class="el-icon-location"></i>
                <span>填空题</span>
              </template>

              <el-menu-item index="2-1"> 单项填空</el-menu-item>
              <el-menu-item index="2-2"> 多项填空</el-menu-item>
            </el-submenu>

            <el-submenu index="3">

              <template slot="title">
                <i class="el-icon-location"></i>
                <span>评分</span>
              </template>

              <el-menu-item index="3-1"> 评价题</el-menu-item>
            </el-submenu>

          </el-menu>

        </div>


<!--        该问卷的大纲-->
        <div class="outline" v-if="ShowNum===1" >
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
              </li>
          </ul>
        </vue-scroll>

      </div>
    </div>

  </div>

</template>

<script>


export default {
  name: "DesignPage",
  data(){
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },


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
      console.log(newItems)
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
    background-color: greenyellow;
    height: 90%;
  }

  .designContent .designComponent .components .choices {
    background-color: pink;

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
    overflow-x: scroll;
    white-space: nowrap;
  }

  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    height: 100px;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
    z-index: 44;
  }

  .designContent .designPreview .QuesList .QuesItem:hover {
    cursor: move;
  }

</style>