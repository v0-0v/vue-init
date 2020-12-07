<template>
  <div class="saveEchart-warp" :style="'top:'+top+'px;right:'+right+'px'">
    <svg class="myIconStyle" aria-hidden="true" @click="showDialog">
      <use :xlink:href="'#icon-img7'"></use>
    </svg>

    <my-dialog :show="bShowDialog" @close="closeDialog" @toSave="toSave" />
  </div>
</template>

<script>
import MyDialog from './dialog';

export default {
  name: 'saveEchart',
  components: {
    MyDialog
  },
  props: {
    top: {
      String,
      default: '2'
    },
    right: {
      String,
      default: '0'
    },
    width: {
      String,
      default: '15px'
    },
    height: {
      String,
      default: '15px'
    }
  },
  data() {
    return {
      bShowDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.bShowDialog = false;
    },
    showDialog() {
      this.bShowDialog = true;
    },
    toSave(statDate) {
      this.$emit('toSave', statDate);
    }
  }
};
</script>

<style lang="scss" scoped>
.saveEchart-warp{
  position: absolute;
  width: auto;
  height: auto;
  cursor: pointer;
  span{
    font-size: 15px;
    display: block;
  }
}
.myIconStyle {
  width: 25px;
  height: 25px;
  fill: currentColor;
  overflow: hidden;
  color: #909399;
  margin-right: 5px;
}
</style>
