<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SmartChart',
  props: {
    echartOption: Object,
    pixelClick: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    resizeable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActivePage: true,
      timer: null,
      chart: null,
      theme: '',
      el: null,
      observer: null
    };
  },
  methods: {
    initResize() {
      // console.log('id', this.$attrs.id);
      // console.log(this.el);
      // console.log('initResize', this.el.parentNode);
      // eslint-disable-next-line no-undef
      this.observer = new ResizeSensor(this.el.parentNode, this.resize);
    },
    init() {
      const { id } = this.$attrs;
      if (!id) {
        console.error('id is not find');
        return;
      }

      console.warn('id', id);
      // console.log('theme', this.theme);
      // console.log(this.currentSkin.name);
      // 主题初始化
      this.theme = this.currentSkin.name === '透明' ? 'halloween' : '';

      this.el = document.getElementById(id);

      // eslint-disable-next-line no-undef
      this.chart = echarts.init(this.el, this.theme);
      this.chart.resize();
      this.chart.showLoading({ maskColor: this.currentSkin.name === '透明' ? 'rgba(27, 77, 113, 0.3)' : 'rgba(2555,255,255)' });

      /**
       * 自适应
       */
      if (this.resizeable) {
        // console.log(this.el.parentNode);
        this.initResize();
      }
      /**
       * 点击
       */
      if (this.clickable) {
        // console.log('clickable');
        // console.log('why not eooo');
        this.chart.on('click', this.eclickEvent);
      }
      /**
       * pixel click
       */
      if (this.pixelClick) {
        // console.log('pixel');
        this.chart.getZr().on('click', this.pixelClickEvent);
      }
    },
    /**
     * 点击
     */
    eclickEvent(param) {
      // console.log('click');
      this.$emit('echartclick', param);
    },
    /**
     * 像素点击
     */
    pixelClickEvent(params) {
      const pointInPixel = [params.offsetX, params.offsetY];
      if (this.chart.containPixel('grid', pointInPixel)) {
        let [xIndex] = this.chart.convertFromPixel(
          { seriesIndex: 0 },
          pointInPixel
        );
        this.$emit('echartpixelclick', xIndex);
      }
    },
    /**
     * resize deboundce 300ms
     */
    resize() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        console.warn('reszie agian');
        // console.log('resize id ' + this.$attrs.id);
        this.chart.resize();
      }, 100);
    },
    clear() {
      this.chart.clear();
    },
    setOption(data = {}) {
      const option = Object.assign({}, data);
      this.chart.setOption(option);
    },
    /**
     * 全屏、退出全屏
     */
    fullConfig() {
      if (this.echartOption.toolbox) {
        if (this.echartOption.toolbox.feature) {
          this.echartOption.toolbox.feature.myFullScren = {
            show: true,
            title: '全屏',
            icon:
              'path://M237.248 832H416v64H173.248l-0.64 0.64-0.64-0.64H128v-43.904l-0.64-0.64 0.64-0.704V608h64v178.752L398.848 579.84l45.248 45.248L237.248 832z m549.504-640H608V128h242.752l0.64-0.64 0.64 0.64H896v43.904l0.64 0.64-0.64 0.704V416h-64V237.248L625.152 444.16l-45.248-45.248L786.752 192z',
            onclick(e) {
              let { option } = e;
              // console.log('全屏');
              // console.log(option);
              // console.log(option.toolbox);

              option.toolbox[0].feature.myFullScren.show = false;
              option.toolbox[0].feature.myExitFullScren.show = true;

              let { ecModel } = this.model;
              let el = ecModel._optionManager._api.getDom();
              el = el.parentNode;

              if (!el) {
                console.error(`id:${option.targetBoxId} 的parentNode 未找到！`);
              }
              // console.log('comTargetStore', option.comTargetStore);
              if (!option.comTargetStore) {
                option.comTargetStore = {
                  width: el.offsetWidth,
                  height: el.offsetHeight
                };
              }

              el.style.width = '100%';
              el.style.height = '100%';

              if (!el.className) {
                el.className = 'fullScren';
              }
              else {
                let newClassName = el.className;
                newClassName += ' ';
                newClassName += 'fullScren';
                el.className = newClassName;
              }
            }
          };
          this.echartOption.toolbox.feature.myExitFullScren = {
            show: false,
            title: '退出全屏',
            icon:
              'path://M904.992 72.992L608 371.008V96h-64v384h384v-64h-275.008l298.016-296.992zM96 544v64h275.008L72.96 904.992 119.04 951.04 416 652.992V928h64V544z',
            onclick(e) {
              let { option } = e;
              option.toolbox[0].feature.myFullScren.show = true;
              option.toolbox[0].feature.myExitFullScren.show = false;

              let { ecModel } = this.model;
              let el = ecModel._optionManager._api.getDom();
              el = el.parentNode;

              // let el = document.getElementById(option.targetBoxId).parentNode;
              el.style.width = option.comTargetStore.width + 'px';
              el.style.height = option.comTargetStore.height + 'px';
              if (el.className) {
                let oldClass = el.className;
                let newClass = oldClass.replace('fullScren', '');
                el.className = newClass;
              }

            }
          };
        }
      }
    },
    /**
     * 换肤
     */
    setTheme(obj) {
      let theme = obj.name === '透明' ? 'halloween' : '';
      if (this.theme === theme) {
        console.warn('theme is quails');
        return;
      }
      if (!this.el) {
        console.error('el not find');
        return;
      }
      this.destroy();
      this.init();
      if (this.echartOption.graphic && obj.name === '透明') {
        this.echartOption.graphic[0].style.fill = '#fff';
      }
      this.chart.setOption(this.echartOption);
      // setTimeout(() => {
      this.chart.hideLoading();
      // }, 300);
    },
    /**
     * 销毁
     */
    destroy() {
      this.el = null;
      // console.log('destory');
      if (this.observer) {
        // console.log(this.observer);
        this.observer.detach();
      }

      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.clickable) {
        this.chart.off('click', this.clickEvent);
      }
      if (this.pixelClick) {
        this.chart.getZr().off('click', this.pixelClickEvent);
      }
      this.chart.clear();
      this.chart.dispose();
    }
  },

  mounted() {
    this.init();
  },
  activated() {
    // console.log('activated');
    this.initResize();
    this.isActivePage = true;
    // console.log(this.currentSkin);
    this.setTheme(this.currentSkin);
  },
  deactivated() {
    // console.log('deactivated');
    if (this.observer) {
      // console.log(this.observer);
      this.observer.detach();
    }
    this.isActivePage = false;
  },
  computed: {
    ...mapGetters({
      currentSkin: 'skin/currentSkin'
    })
  },
  watch: {
    /**
     * 换肤
     */
    // currentSkin: {
    //   handler(obj) {
    //     console.warn('换肤watch');
    //     // console.log(this.$route);
    //     // console.log(this.isActivePage);
    //     if (!obj) {
    //       console.error('skin is not have');
    //       return;
    //     }
    //     if (!this.isActivePage) {
    //       this.currentSkin = obj;
    //       // this.theme = obj.name === '透明' ? 'halloween' : '';
    //       console.warn('该页面不是活动的！', this.theme);
    //       return;
    //     }
    //     this.setTheme(obj);
    //   },
    //   immediate: true
    // },
    currentSkin(obj) {
      console.warn('换肤watch');
      // console.log(this.$route);
      // console.log(this.isActivePage);
      if (!obj) {
        console.error('skin is not have');
        return;
      }
      if (!this.isActivePage) {
        // this.currentSkin = obj;
        console.warn('该页面不是活动的！', this.theme);
        return;
      }
      this.setTheme(obj);
    },
    /**
     * echarts reset
     */
    'echartOption.loading': function(bVal) {
      console.warn('echartOption.loading', bVal);
      if (bVal) {
        // 全屏功能设置
        this.fullConfig();
        if (this.echartOption.graphic && this.currentSkin.name === '透明') {
          this.echartOption.graphic[0].style.fill = '#fff';
        }
        this.chart.resize();
        this.chart.clear();
        // console.log('option', this.echartOption);
        this.chart.setOption(this.echartOption);
        this.chart.hideLoading();
      }
      else {
        this.chart.showLoading({
          maskColor: this.currentSkin.name === '透明' ? 'rgba(27, 77, 113, 0.3)' : 'rgba(2555,255,255)'
        });
      }
    }
  },
  beforDestroy() {
    // console.log('beforDestroy');
    this.destroy();
  }
};
</script>

<style lang="scss">
.ui-fullBox.fullScren {
  position: fixed !important;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999999;
}
// .ui-fullBox.fullScren{
//   background: #2f6186;
// }
.ui-fullBox.fullScren {
  background: #fff;
}
.ui-fullBox {
  width: 100%;
  height: 100%;
}
</style>
