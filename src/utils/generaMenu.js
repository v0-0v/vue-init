/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */
/* eslint-env es6 */

export default (routers, data) => generaMenu(routers, data);

function generaMenu(routers, data, parentComponent) {
  // console.log('routers---------------------------------------', routers);
  // console.log('data------------------------------------------', data);
  // console.log('parentComponent-------------------------------', parentComponent);


  data.forEach(item => {
    let menu = Object.assign({}, item);
    if (menu.component) {
      if (!menu.meta) {
        menu.meta = {
          title: menu.title ? menu.title : menu.name,
          id: menu.code
        };
      }
      else {
        try {
          menu.meta = JSON.parse(menu.meta);
          menu.meta = Object.assign(menu.meta, {
            title: menu.title ? menu.title : menu.name,
            id: menu.code
          });
        }
        catch (error) {
          // console.warn(menu);
          console.warn(menu.name + ' error:' + menu.meta);
          console.error(error);
        }
      }
      menu.name = menu.componentName;


      /**
       * 是否配置component正确
       */
      try {
        menu.component = require(`@/views/${menu.component}.vue`).default;
      }
      catch (error) {
        console.log(menu);
        console.error(error);
        menu.component = require('@/views/errorPage/401.vue').default;
      }
      menu.path = menu.routerPath;
      // console.log(menu);
      routers.push(menu);
    }
    if (item.children) {
      menu.children = [];
      if (!menu.component) {
        generaMenu(routers, item.children);
        return;
      }
      generaMenu(menu.children, item.children, `${parentComponent ? parentComponent : ''}/${menu.name}`);
    }
  });
  return routers;
}
