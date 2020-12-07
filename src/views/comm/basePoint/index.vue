<template>
  <div>
    <el-select :value="zbBrightpointRefid" placeholder="请选择" @change="handelChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * 爆点指标select，取自 爆点指标list列表
 */
export default {
  name: 'baseAssess',
  props: ['zbBrightpointRefid', 'options2'],
  data() {
    return {
      options: []
    };
  },
  methods: {
    async getZbBrightpointControllerBrightPointList() {
      const { bean } = await this.$services.post({
        type: 'ASSESS_POINTCONFIG',
        url: 'getZbBrightpointControllerBrightPointList',
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
      if (this.options2) {
        this.options = this.options2;
      }
      else {
        this.getZbBrightpointControllerBrightPointList();
      }

    },
    handelChange(val) {
      // console.log(data);
      console.warn('emit handelZbBrightpointRefid');
      let data = {};
      for (let i = 0; i < this.options.length; i++) {
        let item = this.options[i];
        if (item.value === val) {
          data = item;
        }
      }
      this.$emit('handelZbBrightpointRefid', data);
    }
  },

  watch: {
    zbBrightpointRefid: {
      handler() {
        // options是否已经加载完
        if (this.options.length === 0) {
          this.init();
        }

      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
