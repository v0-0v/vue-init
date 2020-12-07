<template>
  <div v-if="show" role="tooltip" aria-hidden="false" class="el-popover el-popper hg-popover" tabindex="0"
       style="position: fixed; transform-origin: left center 0px; z-index: 2019;background: #fff;"
       :style="{top: `${top}px`,left: `${left}px`}"
       x-placement="right">
    <i @click="close" style="position: absolute; right: 5px;top: 5px;cursor: pointer;" class="el-icon-close"></i>
    <div v-for="(change, popDataIndex) in popDataList" :key="popDataIndex">
      <item :model="change" :line="line" :col-no="colNo"></item>
    </div>
    <div x-arrow="" class="popper__arrow" style="top: 5px;"></div>
  </div>
</template>

<script>
import item from './item';

export default {
  name: 'popover',
  components: {
    item
  },
  data() {
    return {
      show: false,
      line: 0,
      popDataList: [],
      colNo: 0,
      top: 0,
      left: 0
    };
  },
  methods: {
    async geNextChangeList(popupIndex, current) {
      const { bean } = await this.$services.post({
        type: 'REPORT',
        url: 'getRepMonthControllerDetailChangeList',
        params: {
          id: current.id,
          colNo: this.colNo
        }
      });
      if (bean) {
        this.$set(current, 'childTree', bean);
      }
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss">
.hg-popover {
  padding: 18px 12px;
}
</style>
