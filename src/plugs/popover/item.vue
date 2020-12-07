/** 2019/1/14
*作者:Cookie
*功能: 子组件递归循环
*/
<template>
  <div v-loading="loading">
    <div class="item">
      <p v-if="model.depCode === '330304000000'">原始值：{{model.repMonthDetailLinked[`value${line}`]}}</p>
      <p v-else><i v-if="showNext"  @click="geNextChangeList(model)" class="el-icon-plus"></i>
      {{model.depNameAbb}}: 由{{model.repMonthDetailLinked[`value${line}`]}}修改为{{model[`value${line}`]}}
      </p>
    </div>
    <div class="item" v-if="isFolder">
      <items v-for="(item, index) in model.childTree" :model="item" :line="line" :col-no="colNo" :key="index"></items>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  // 组件递归必要条件，name属性
  name: 'items',
  props: {
    model: {
      Object,
      default: {}
    },
    line: {
      Number,
      default: 0
    },
    colNo: {
      Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      open: false,
      showNext: this.model.repMonthDetailLinked.depCode !== this.model.depCode
    };
  },
  computed: {
    // 是否还有子列表需要渲染，作为v-if的判断条件
    isFolder() {
      return this.model.childTree && this.model.childTree.length;
    }
  },
  methods: {
    async geNextChangeList(current) {
      if (!this.showNext) return;
      if (current.childTree && current.childTree.length) return;
      this.loading = true;
      const { bean } = await this.$services.post({
        type: 'REPORT',
        url: 'getRepMonthControllerDetailChangeList',
        params: {
          id: current.id,
          colNo: this.colNo
        }
      });
      this.loading = false;
      if (bean) {
        if (bean[0].repMonthDetailLinked.depCode === bean[0].depCode) {
          this.showNext = false;
          return;
        }
        this.$set(current, 'childTree', bean);
      }
    }
  }
};
</script>
<style>
.item{
  display : inline-block;
}

</style>
