<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <a href="javascript:;" class="left" v-show="showPage" @click="leftPage" :disabled="leftDisabled"><i class="el-icon-arrow-left"></i></a>
    <slot />
    <a href="javascript:;" class="right" v-show="showPage" @click="rightPage" :disabled="rightDisabled"><i class="el-icon-arrow-right"></i></a>
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0,
      showPage: false,
      leftDisabled: false,
      rightDisabled: false
    };
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      this.$scrollWrapper.scrollLeft += eventDelta / 4;
    },
    leftPage() {
      // console.log(this.$el.offsetWidth);
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      $scrollWrapper.scrollLeft -= this.$el.offsetWidth;
      if ($scrollWrapper.scrollLeft <= 0) {
        $scrollWrapper.scrollLeft = 0;
      }
    },
    rightPage() {
      // console.log(this.$el.offsetWidth);
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      $scrollWrapper.scrollLeft += this.$el.offsetWidth;
      if ($scrollWrapper.scrollLeft > this.$el.offsetWidth) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft;
      }
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;
      let prevTag = null;
      let nextTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        [firstTag] = tagList;
        lastTag = tagList[tagList.length - 1];
      }

      // find preTag and nextTag
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i] === currentTag) {
          if (i === 0) {
            nextTag = tagList[i].length > 1 && tagList[i + 1];
          }
          else if (i === tagList.length - 1) {
            prevTag = tagList[i].length > 1 && tagList[i - 1];
          }
          else {
            prevTag = tagList[i - 1];
            nextTag = tagList[i + 1];
          }
          break;
        }
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      }
      else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      }
      else {
        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft
          > $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        }
        else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
      // console.log('$scrollWrapper.scrollLeft', $scrollWrapper.scrollLeft);
      this.showPage = $scrollWrapper.scrollLeft > 0;

    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  &:hover{
    .left,.right{
      display: block;
    }
  }
  .left,
  .right {
    display: none;
    position: absolute;
    top: 7px;
    z-index: 9995;
    width:20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 50%;
    &:hover{
      background: #ddd;
    }
  }

  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .ui-scrollBox {
    background: red;
    margin: 0 10px;
    // width: 100%;
    overflow: hidden;
  }

  /*/deep/ {*/
  /*.el-scrollbar__bar {*/
  /*bottom: 0px;*/
  /*}*/

  /*.el-scrollbar__wrap {*/
  /*height: 49px;*/
  /*}*/
  /*}*/
}
</style>
