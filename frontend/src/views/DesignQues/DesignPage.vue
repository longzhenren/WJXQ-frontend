<template>
  <div class="designPage">
    <nav class="designNav">
      <div class=""></div>
    </nav>

    <div class="designContent">
      <div class="designComponent">
        <div class="ShowCntl">
          <div :class="{active: ShowNum===0}" @click="changeDesignTools(0)">题型选择</div>
          <div :class="{active: ShowNum===1}" @click="changeDesignTools(1)">问卷大纲</div>
        </div>

<!--        题型组件库-->
        <div class="components" v-if="ShowNum===0">

        </div>


<!--        该问卷的大纲-->
        <div class="outline" v-if="ShowNum===1">

        </div>
      </div>


      <div class="designPreview">
        <div class="QuesBase">
          <div class="QuesTitle"></div>
        </div>

        <ul class="QuesList">
          <li class="QuesItem" v-for="(item,index) in QuesList" :key="item.idx" :draggable="true"
              @dragstart="handleDragStart($event,item)"
              @dragover.prevent="handleDragOver($event)"
              @dragenter="handleDragEnter($event,item)"
              @dragend="handleDragEnd($event,item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "DesignPage",
  data(){
    return {
      ShowNum: 0,

      // 问卷标题
      QuesTitle: '',

      // 问卷问题列表
      QuesList: [
        {
          name: 'aaa',
          idx: 0,
        },
        {
          name: 'bbb',
          idx: 1,
        }
      ],

      // 当前正在拖动的元素
      dragging: null,
    }
  },
  methods: {
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
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    box-sizing: border-box;
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

  .designContent .designComponent .outline {
    background-color: skyblue;
    height: 90%;
  }

  .designContent .designPreview {
    background-color: blue;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
  }

  .designContent .designPreview .QuesBase {
    width: 100%;
    height: 20%;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
  }


  .designContent .designPreview .QuesList .QuesItem {
    width: 100%;
    height: 100px;
    background-color: white;
    border-bottom: 1px solid #BDBDBD;
  }

  .designContent .designPreview .QuesList .QuesItem:hover {
    cursor: move;
  }

</style>