<template>
  <div class="hg-dailgo-bg" v-if="dialogVisible" v-on="$listeners">
    <div class="pop"></div>
     <!-- :minHeight="600"
      :minWidth="800" -->
    <vue-draggable-resizable
      :w="selfWidth"
      :h="selfHeight"
      :x="x"
      :y="y"
      id="hgDailgo"
      class="hg-dailgo-bg-resize"
      @dragging="onDrag"
      @resizing="onResize"
      parent=".hg-dailgo-bg"
      :maximize="true"
      :drag-handle="'.drag-handle'">
      <div class="hg-dailgo" style="height: 100%">
        <div class="dailgo-header drag-handle">
          {{title}}
          <i class="el-icon-close hg-close" @click="close"></i>
        </div>
        <div class="dailgo-content">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  name: 'hg-dialog',
  props: {
    visible: {
      Boolean,
      default: false
    },
    title: {
      String,
      default: ''
    },
    resetSize: {
      Boolean,
      default: false
    },
    width: {
      Number,
      default: 0
    },
    height: {
      Number,
      default: 0
    }
  },
  components: {
    VueDraggableResizable
  },
  data() {
    return {
      selfWidth: 400,
      selfHeight: 400,
      x: 0,
      y: 0,
      dialogVisible: this.visible
    };
  },
  methods: {
    onResize(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.selfWidth = width;
      this.selfHeight = height;
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
    },
    resize() {
      const maxH = document.body.offsetHeight;
      const maxW = document.body.offsetWidth;
      if (this.resetSize) {
        this.selfWidth = maxW - 40;
        this.selfHeight = maxH - 40;
      }
      else if (this.width && this.height) {
        this.selfWidth = this.width;
        this.selfHeight = this.height;
      }
      else {
        this.selfWidth = maxW * 0.5;
        this.selfHeight = maxH * 0.5;
      }
      this.x = (maxW - this.selfWidth) / 2;
      this.y = (maxH - this.selfHeight) / 2;
    },
    close() {
      this.$emit('close');
    },
    max() {
      const maxH = document.body.offsetHeight;
      const maxW = document.body.offsetWidth;
      const hgDailgo = document.getElementById('hgDailgo');
      this.x = 0;
      hgDailgo.style.top = 0;
      this.y = 0;
      this.$nextTick(() => {
        this.selfWidth = maxW - 40;
        this.selfHeight = maxH - 40;
        this.x = (maxW - this.selfWidth) / 2;
        this.y = (maxH - this.selfHeight) / 2;
      });
    }
  },
  created() {
    this.resize();
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) this.resize();
    }
  }
};
</script>

<style lang="scss">
</style>
