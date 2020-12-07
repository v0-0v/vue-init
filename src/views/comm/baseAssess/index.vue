<template>
  <div>
    <el-select v-model="selfValue" v-bind="$attrs" v-on="$listeners">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
* 评估指标select，取自 评估指标list列表
*/
export default {
  name: 'baseAssess',
  props: ['value'],
  data() {
    return {
      options: [],
      selfValue: this.value
    };
  },
  methods: {
    async getBaseAssessControllerAssessMainList() {
      const {
        bean
      } = await this.$services.post({
        type: 'ASSESS_ASSESSMAIN',
        url: 'getBaseAssessControllerAssessMainList',
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
      return this.getBaseAssessControllerAssessMainList();
    },
    handelChange(data) {
      // console.log(data);
      this.$emit('handelZbAssessMainRefid', data);
    }
  },
  created() {
    this.init();
  },
  watch: {
    zbAssessMainRefid(val) {
      this.$emit('input', val);
    }
  }
};

</script>
<style lang="scss" scoped>
</style>
