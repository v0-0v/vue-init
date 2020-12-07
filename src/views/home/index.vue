<template>
  <div class="home">
    <grid-layout :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" :responsive="true">
      <grid-item v-for="(item,index) in layout" :key="index" style="border:1px solid #ddd;" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @resized="resizedEvent" @moved="movedEvent">
        <!-- {{item.component}} -->
        <span class="del" style="position:absolute;top:0;left:10px;font-size:16px;color:#c9eef4;z-index:9999;cursor:pointer" @click="delComponent(index)">x</span>
        <!-- <component :is="item.component" :index="index" :typeCode="index>0?eventTypes[index-1]:''" :id="'home' + String(index)"></component> -->
        <createOption :id="'home' + String(index)" :typeCode="item.typeCode" :echartType="item.echartType" :title="item.title"></createOption>
      </grid-item>
    </grid-layout>

    <!-- 侧边隐藏按钮链接 -->
    <div class="home-btnBox">
      <div class="left">更多链接</div>
      <div class="right">
        <div class="btnItem" @click="getComponent">添加图表</div>
        <div class="btnItem" @click="getComponentSave">保存页面</div>
        <div class="btnItem" @click="linkTo('预警分析')">预警分析</div>
        <div class="btnItem" @click="linkTo('网格PK积分榜')">网格PK积分榜</div>
        <div class="btnItem" @click="linkTo('考核报表')">考核报表</div>
      </div>
    </div>

    <!-- 弹窗 -->
    <my-dialog :show="isDialog" @submit="submitDialog" @close="closeDialog"></my-dialog>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import MyDialog from './dialog/index';
import createOption from './createEchart/createOption.vue';

export default {
  name: 'home',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    MyDialog,
    createOption
  },
  data() {
    return {
      // layout: [
      //   { x: 0, y: 0, w: 4, h: 10, i: '0', typeCode: '', echartType: '', title: '' },
      //   { x: 4, y: 0, w: 4, h: 10, i: '1', typeCode: 'A01-1', echartType: 'pie', title: '婚姻家庭邻里' },
      //   { x: 8, y: 0, w: 4, h: 10, i: '2', typeCode: 'A01-2', echartType: 'line', title: '民众纠纷' },
      //   { x: 0, y: 10, w: 4, h: 10, i: '4', typeCode: 'A03', echartType: 'bar', title: '劳资纠纷' },
      //   { x: 4, y: 10, w: 4, h: 10, i: '5', typeCode: 'A04', echartType: 'bar', title: '经济纠纷' },
      //   { x: 8, y: 10, w: 4, h: 10, i: '6', typeCode: 'A05', echartType: 'bar', title: '环境污染,生态破坏' }
      // ],
      layout: [],
      isDialog: false,
      selectArray: [],
      modify: 0
    };
  },
  mounted() {
    // this.indxeView();
  },
  deactivated() {
    if (this.modify !== 0) {
      this.$message({
        type: 'info',
        message: '首页还未保存!'
      });
    }
  },
  methods: {
    // 默认可添加图表的列表
    async indxeView() {
      const { status, bean } = await this.$services.post({
        type: 'GRIDPKSET',
        url: 'indxeView'
      });
      if (status) {
        console.log('0000000', JSON.parse(bean));
        // bean.splice(2, 1);
        this.layout = JSON.parse(bean);
      }
    },
    // 点击添加组件
    getComponent() {
      this.isDialog = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.isDialog = false;
    },
    // 点击删除
    delComponent(index) {
      this.modify++;
      // console.log('要删除的数据', index);
      this.layout.splice(index, 1);
      this.rankLayout();
      // console.log(this.layout);
      let params = {
        confValue: JSON.stringify(this.layout)
      };
      this.saveIndxeView(params);
    },
    // 给首页组件重新排位置
    rankLayout() {
      if (this.layout.length > 0) {
        this.layout.forEach((item, index) => {
          let len = index + 1;
          // eslint-disable-next-line radix
          let row = parseInt(len / 3);
          let col = '';
          if (len % 3 === 1) {
            col = 0;
          }
          else if (len % 3 === 2) {
            col = 1;
          }
          else {
            col = 2;
          }
          item['x'] = 4 * col;
          item['y'] = 10 * row;
          item['i'] = String(index + 1);
        });
        console.log('重新排序----', this.layout);
      }
    },
    // 关闭弹窗并提交
    submitDialog(select) {
      this.modify++;
      this.selectArray = JSON.parse(JSON.stringify(select));
      this.isDialog = false;
      let obj = {
        x: 4, y: 0, w: 4, h: 10, i: '1', typeCode: 'A01-1', echartType: 'pie', title: '婚姻家庭邻里'
      };
      let len = this.layout.length + 1;
      // eslint-disable-next-line radix
      let row = parseInt(len / 3);
      let col = '';
      if (len % 3 === 1) {
        col = 0;
      }
      else if (len % 3 === 2) {
        col = 1;
      }
      else {
        col = 2;
      }
      // console.log("唐丽-----------------len",len);
      // console.log("唐丽-----------------row",row);
      // console.log("唐丽-----------------col",col);
      obj['x'] = 4 * col;
      obj['y'] = 10 * row;
      obj['i'] = String(this.layout.length + 1);
      // obj['i'] = String(Math.random());
      // console.log('接受----', this.selectArray);
      obj['typeCode'] = this.selectArray[0]['typeCode'];
      obj['echartType'] = this.selectArray[0]['echartType'];
      obj['title'] = this.selectArray[0]['creatDateRemark'];
      this.layout.push(obj);
    },
    // 保存首页
    getComponentSave() {
      console.log('33333', this.layout);
      let params = {
        confValue: JSON.stringify(this.layout)
      };
      this.saveIndxeView(params);
    },
    // 图表的修改保存操作
    async saveIndxeView(params) {
      const { status } = await this.$services.post({
        type: 'GRIDPKSET',
        url: 'saveIndxeView',
        params
      });
      if (status) {
        this.modify = 0;
        this.indxeView();
        this.$message({
          type: 'success',
          message: '图表修改/保存成功!'
        });
      }
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    movedEvent(i, newX, newY) {
      console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY);
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    linkTo(str) {
      if (str === '预警分析') {
        this.$router.push('/countAssess/warnAnalyse/keyEvent');
      }
      else if (str === '网格PK积分榜') {
        this.$router.push('/assessment/gridPk');
      }
      else if (str === '考核报表') {
        this.$router.push('/report/report01');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .del {
    display: none;
  }
  .vue-grid-item:hover {
    .del {
      display: block;
    }
  }
  .home-btnBox {
    position: fixed;
    right: -70px;
    top: 150px;
    transition: all 0.5s linear;
    // background-color: #dddddd;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    display: flex;
    .left {
      width: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 10px;
      // height: 20px;
      // background-color: red;
    }
    .right {
      .btnItem {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 12px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        color: #c9eef4;
      }
      .btnItem:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .btnItem:last-child {
        margin-bottom: 0;
      }
    }
  }
  .home-btnBox:hover {
    right: 0px;
  }
  .home-row {
    display: flex;
    > div {
      flex: 1;
      border: 1px solid rgba(23, 23, 58, 0.6);
      height: 330px;
      box-sizing: border-box;
      margin-bottom: 10px;
      background-color: rgba(23, 23, 58, 0.1);
    }
  }
}
</style>
