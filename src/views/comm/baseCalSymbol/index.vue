<template>
  <div>
    <el-select :value="value" v-bind="$attrs" v-on="$listeners" placeholder="请选择"  style="width:100%;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * 算法符号 >,>=,<,+
 *  demo
 * <base-cal-symbol v-model="your value" style="width:250px;" />
 */
export default {
  name: 'baseCalSymbol',
  props: ['value'],
  data() {
    return {
      options: []
    };
  },
  methods: {
    // {dic_type='BaseCalSymbol'}
    async getSysDicControllerDicCalculations() {
      const { bean } = await this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicCalculations',
        params: {
          dicType: 'BaseCalSymbol'
        }
      });
      let _options = [];
      for (let i = 0; i < bean.length; i++) {
        let item = bean[i];
        _options.push({
          label: item.dicName,
          value: item.dicValue
        });
      }
      this.options = _options;
      // console.log(bean);
    }
  },
  created() {
    this.getSysDicControllerDicCalculations();
  }
};
</script>
<style lang="scss" scoped>
</style>
