<template>
  <div v-bind="$attrs" ref="chart"> </div>
</template>

<script>
// import GeneratorChart from './generateChart';

export default {
  name: 'SmartChart',
  // extends: GeneratorChart,
  props: {
    reloading: {
      default: false,
      type: Boolean
    },
    chartOptions: Object
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    // renderChart() {}
  },

  mounted() {
    if (this.$attrs && this.$attrs.id) {
      // eslint-disable-next-line no-undef
      this.chart = echarts.init(document.getElementById(this.$attrs.id));
      this.$emit('created');
      // console.log(this);
      this.chart.setOption(this.chartOptions);

    }
  },
  watch: {
    /**
     * show loading or not
     */
    reloading(val) {
      // console.log(`reloading,${val}`);
      if (val === false) {
        this.chart.setOption(this.chartOptions);
        this.chart.hideLoading();
      }
      else {
        this.chart.showLoading();
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.off('click');
      this.chart.clear();
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
