<template>
  <div class="fullScren-warp" :style="'top:'+top+';left:'+left+';width:'+width+';height:'+height">
    <span class="toFull" v-if="!isFullScren" @click="toFullScren"></span>
    <span class="toExitFull" :class="{hiddenIcon:fullIsHidden}" v-if="isFullScren" @click="toExitFull"></span>
  </div>
</template>

<script>
export default {
  name: 'fullScren',
  props: {
    top: {
      String,
      default: '0'
    },
    left: {
      String,
      default: '0'
    },
    width: {
      String,
      default: '20px'
    },
    height: {
      String,
      default: '20px'
    },
    isFull: {
      Boolean,
      default: false
    },
    fullIsHidden: { // 全屏后是否隐藏图标，鼠标移入后显示
      Boolean,
      default: false
    },
    domId: {
      String,
      default: ''
    }
  },
  data() {
    return {
      isFullScren: false
    };
  },
  mounted() {
    this.isFullScren = this.isFull;
  },
  methods: {
    toFullScren(e) {
      let el = this.domId ? document.getElementById(this.domId) : e.target.parentNode.parentNode.parentNode;
      if (!el.className) {
        el.className = 'largeFullScren';
      }
      else {
        let newClassName = el.className;
        newClassName += ' ';
        newClassName += 'largeFullScren';
        el.className = newClassName;
      }
      this.isFullScren = true;
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    toExitFull(e) {
      let el = this.domId ? document.getElementById(this.domId) : e.target.parentNode.parentNode.parentNode;
      if (el.className) {
        let oldClass = el.className;
        let newClass = oldClass.replace('largeFullScren', '');
        el.className = newClass;
      }
      this.isFullScren = false;
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }
  },
  watch: {
    isFull: {
      handler(val) {
        this.isFullScren = val;
      }
    }
  }
};
</script>

<style lang="scss">
.fullScren-warp{
  position: absolute;
  span{
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .toFull{
    background: url("../../assets/img/components/fullScren.png") no-repeat;
    background-size: 100% 100%;
  }
  .toExitFull{
    background: url("../../assets/img/components/exitFull.png") no-repeat;
    background-size: 100% 100%;
  }
  .hiddenIcon{
    background: none;
  }
  .hiddenIcon:hover{
    background: url("../../assets/img/components/exitFull.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
