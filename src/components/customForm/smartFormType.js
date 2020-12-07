

const defaultType = 'el-input';

const elInputNumber = 'el-input-number';

const elSwitch = 'el-switch';

// const _el = {
//   '': 'el-input',
//   textarea: 'el-input',
//   switch: 'el-switch'

// };

export default {
  name: 'smart-form-type',
  props: ['type'],
  functional: true,
  render(createElement, context) {

    // 规定组件的渲染规则
    function appropriateListComp() {
      // console.log(123);
      // console.log(context);

      // 获取父组件传来的数据
      const { type } = context.props;
      const { attrs } = context.data;
      // console.log(attrs);
      switch (type) {
        case '':
          return defaultType;
        case 'textarea':
          context.data.attrs.type = 'textarea';
          return defaultType;
        case 'switch':
          return elSwitch;
        case 'number':
          return elInputNumber;
        case 'component':
          return attrs.componentName;
        default:
          break;
      }
    }

    // 生成模板
    return createElement(
      // 模板标记为渲染规则函数返回值
      appropriateListComp(),
      context.data,
      context.children
    );
  }
};
