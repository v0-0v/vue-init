import { Message } from 'element-ui';


import { fmoney, fnum } from '../utils/fmoney';
import $utils from '../utils';
import store from '../store';

export default {
  install(Vue, options = {}) {
    console.log(options);
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // update(el, binding, vnode) {
      //   console.log('tangli--bind-u', binding.value);
      // },
      componentUpdated(el, binding, vnode, oldVnode) {
        console.log(el, binding, vnode, oldVnode);
        //
        // console.log('tangli--el', el);
        const { old } = el.querySelector('input').dataset; //
        console.log('oldVaule', old);
        // console.log('tangli--bind', el.find('.el-input__inner'));
        // console.log('tangli--', vnode);
        // console.log ('tangli--', oldVnode);

        const { value } = binding;
        /**
         * 不是在焦点的input不进行以下验证
         */
        if (!$(el).find('input').is(':focus')) {
          return;
        }
        // if (old === value) {
        //   // el.style.color = '#ffff';
        //   el.setAttribute('class', 'no');
        //   return;
        // }

        // if (old !== value) {
        //   // el.style.color = '#f00';
        //   el.setAttribute('class', el.getAttribute('class') + ' updated');
        // }

        /**
         * input valid
         */
        // let reg = /^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/; // 0-100百分数正则


        let reg = /^(\-|\+)?\d+(\.\d+)?(%)?$/; // 百分数可以大于1
        let reg2 = /^(\-|\+)?\d+(\.\d+)?$/; // 正数负数或者小数
        // console.log('正则验证', reg2.test(value));
        if (reg.test(value) || reg2.test(value)) {
          console.log('reg right');
          // el.style.border = 'none';
          // el.style.borderRadius = '0';
          // 防止重复设置class
          if (el.getAttribute('class').match('right')) {
            return;
          }
          el.setAttribute('class', 'right');
        }
        else {
          // 防止重复设置class
          if (el.getAttribute('class').match('error')) {
            return;
          }
          console.log('reg error');
          Message({
            type: 'error',
            message: '请输入数字或者百分数！'
          });
          // el.style.border = '1px solid red';
          // el.style.borderRadius = '4px';
          el.setAttribute('class', 'error');
        }
      }
    });

    Vue.directive('clickoutside', {
      bind: (el, binding) => {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }

        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
      },
      unbind(el, binding) {
        console.log(binding);
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    });
    Vue.directive(' ', {
      inserted: (el, binding) => {
        el.innerHTML = $utils.getTime(binding.value);
      },
      update: (el, binding) => {
        el.innerHTML = $utils.getTime(binding.value);
      }
    });
    Vue.directive('ftimen', {
      inserted: (el, binding) => {
        el.innerHTML = $utils.parseTimeNumber(binding.value);
      },
      update: (el, binding) => {
        el.innerHTML = $utils.parseTimeNumber(binding.value);
      }
    });
    Vue.directive('fmoney', {
      inserted: (el, binding) => {
        el.innerHTML = `<i>￥</i>${fmoney(binding.value)}`;
      },
      update: (el, binding) => {
        el.innerHTML = `<i>￥</i>${fmoney(binding.value)}`;
      }
    });

    Vue.directive('fmonth', {
      inserted: (el, binding) => {
        el.innerHTML = $utils.getTimeToMonth(binding.value);
      },
      update: (el, binding) => {
        el.innerHTML = $utils.getTimeToMonth(binding.value);
      }
    });
    Vue.directive('fday', {
      inserted: (el, binding) => {
        el.innerHTML = $utils.getTimeToDay(binding.value);
      },
      update: (el, binding) => {
        el.innerHTML = $utils.getTimeToDay(binding.value);
      }
    });

    Vue.directive('fnum', {
      inserted: (el, binding) => {
        el.innerHTML = `${fnum(binding.value)}`;
      },
      update: (el, binding) => {
        el.innerHTML = `${fnum(binding.value)}`;
      }
    });
    Vue.directive('ftitle', {
      inserted: el => {
        const list = el.innerText.split('');
        let title = '';
        list.forEach(val => {
          title = `${title}<p>${val}</p>`;
        });
        el.innerHTML = title;
      }
    });

    Vue.directive('permission', { // 判断按钮是否有权限
      inserted: (el, binding) => {
        let btnPermissions = store.getters['user/resourceData'];
        if (btnPermissions.indexOf(binding.value) === -1) {
          el.parentNode.removeChild(el);
        }
      }
    });
    Vue.directive('dialogDrag', {
      bind: el => {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        // dialogHeaderEl.style.cursor = 'move';
        dialogHeaderEl.style.cssText += ';cursor:move;';
        dragDom.style.cssText += ';top:0px;';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (function fn() {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr];
          }
          return (dom, attr) => getComputedStyle(dom, false)[attr];
        }());
        dialogHeaderEl.onmousedown = e => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;

          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
          const dragDomheight = dragDom.offsetHeight; // 对话框高度

          const minDragDomLeft = dragDom.offsetLeft;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

          // 获取到的值带px 正则匹配替换
          let styL = sty(dragDom, 'left');
          let styT = sty(dragDom, 'top');

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
          }
          else {
            styL = +styL.replace(/\px/g, '');
            styT = +styT.replace(/\px/g, '');
          }
          document.onmousemove = elment => {
            // 通过事件委托，计算移动的距离
            let left = elment.clientX - disX;
            let top = elment.clientY - disY;

            // 边界处理
            if (-left > minDragDomLeft) {
              left = -minDragDomLeft;
            }
            else if (left > maxDragDomLeft) {
              left = maxDragDomLeft;
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop;
            }
            else if (top > maxDragDomTop) {
              top = maxDragDomTop;
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    });
  }
};
