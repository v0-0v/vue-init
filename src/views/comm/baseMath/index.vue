<template>
  <div>
    <el-select :value="value" v-bind="$attrs" v-on="$listeners" style="width:100%;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * 基础算法，取自 算法配置list列表
 * demo
 * <base-math v-model="ruleForm.zbCalculationRefid" style="width:250px;" />
 */
export default {
  name: 'baseMath',
  props: ['value'],
  data() {
    return {
      options: []
    };
  },
  methods: {
    async getZbCalculationControllerCalculationList() {
      const { bean } = await this.$services.post({
        type: 'ASSESS_ALGORITHMCONFIG',
        url: 'getZbCalculationControllerCalculationList',
        params: {
          pageSize: 100,
          currentPage: 1
        }
      });

      let _options = [];
      for (let i = 0; i < bean.list.length; i++) {
        let item = bean.list[i];
        _options.push({
          label: item.name,
          value: item.id
        });
      }
      this.options = _options;
    },
    init() {
      return this.getZbCalculationControllerCalculationList();
    }
  },
  created() {
    this.getZbCalculationControllerCalculationList();
  }
};
</script>
<style lang="scss" scoped>
</style>
