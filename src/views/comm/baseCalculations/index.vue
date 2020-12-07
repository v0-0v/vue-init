<template>
  <div>
    <el-select :value="value" v-bind="$attrs" v-on="$listeners" placeholder="请选择" style="width:100%">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * 算法，取自通用字典表 dic_type='BaseCalculations'的值
 *  demo
 * <base-calculations v-model="your value" style="width:250px;" />
 */
export default {
  name: 'baseCalculations',
  props: ['value'],
  data() {
    return {
      options: []
    };
  },
  methods: {
    async getSysDicControllerDicCalculations() {
      const { bean } = await this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicCalculations',
        params: {
          dicType: 'BaseCalculations'
        }
      });

      let _options = [];
      for (let i = 0; i < bean.length; i++) {
        let item = bean[i];
        _options.push({
          label: `${item.dicName}   ${item.dicValue}`,
          value: item.dicValue
        });
      }

      this.options = _options;
    }
  },
  created() {
    this.getSysDicControllerDicCalculations();
  }
};
</script>
<style lang="scss" scoped>
</style>
