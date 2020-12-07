import popover from './index.vue';

let $vm;
export default {
  install(Vue, options) {
    console.warn(options);
    if (!$vm) {
      const LoadingPlugin = Vue.extend(popover);
      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    $vm.show = false;

    let _popover = {
      show({ $event, changeList, line, colNo }) {
        $vm.show = true;
        $vm.popDataList = changeList;
        $vm.line = line;
        $vm.colNo = colNo;
        $vm.top = $event.target.getBoundingClientRect().top;
        $vm.left = $event.target.getBoundingClientRect().left + $event.target.clientWidth;
      },
      close() {
        $vm.show = false;
        // document.body.removeChild($vm.$el);
      }
    };

    if (!Vue.$popover) {
      Vue.$popover = _popover;
    }

    Vue.prototype.$popover = Vue.$popover;

    Vue.mixin({
      created() {
        this.$popover = Vue.$popover;
      }
    });
  }
};
