<template>
  <div>
    <el-cascader v-bind="$attrs" v-on="$listeners" :options="treeData" :value="value" :show-all-levels="false" @change="handleItemChange" change-on-select clearable filterable>
    </el-cascader>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

const lodash = require('lodash');

export default {
  name: 'depCodeTree',
  props: {
    depCode: {
      type: String
    },
    orgCode: {
      type: String
    },
    orgName: {
      type: String
    },
    value: {
      type: Array,
      default: () => []
    },
    /**
     * 模式：
     */
    mood: {
      type: String,
      default: 'base'
    },
    isShowDeepName: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timer: null,
      defaultBool: false,
      treeData: [],
      oTreeData: [],
      treeObject: {}
      // data: {
      //   depCode: '330100000000',
      //   depName: '',
      //   depNameAbb: '',
      //   level: ''
      // },
      // userInfor: {
      //   depCode: ''
      // }
    };
  },
  computed: {
    ...mapGetters({
      userInfor: 'user/userInfor'
    })
  },
  methods: {
    // ...mapActions({
    //   setCommData: 'depCode/setCommData'
    // }),
    transforList(Obj) {
      let list = [];
      Object.keys(Obj).forEach(key => {
        let l = JSON.parse(JSON.stringify(Obj[key]));
        if (Obj[key].children && JSON.stringify(Obj[key].children) !== {}) {
          l.children = this.transforList(Obj[key].children);
        }
        else if (Obj[key].children === null) {
          delete l.children;
        }
        list.push(l);
      });
      return list;
    },
    async getListAllChildDepTree(id, depCodes) {
      let params = { id: id ? id : this.userInfor.depCode };
      // let params = {};
      // if (id) {
      //   params = { id };
      // }
      const { bean } = await this.$services.post({
        type: 'DEPT',
        url: 'getListAllChildDepAjax',
        params
      });
      this.oTreeData = this.transforTree(bean.list, depCodes);
      // console.log('treeObject------------', this.treeObject);
      this.treeData = this.transforList(this.treeObject);
      // console.log(this.treeData);
    },
    async handleItemChange(val) {
      const index = val.length - 1;
      const _depcode = val[index];
      await this.getListAllChildDepTree(_depcode, val);
      // console.log('**', val);
      let myEmitData = [];
      this.getCodes(this.treeObject, JSON.parse(JSON.stringify(val)), myEmitData);
      // console.log('myEmitData', myEmitData);

      // emit debounce去抖动
      lodash.debounce(() => {
        this.$emit('myEmit', myEmitData);
      }, 100)();
    },
    /**
     *
     */
    getCodes(tree, array, res) {
      if (array.length === 0) {
        return;
      }
      const id = array.shift();
      const item = tree[id];
      let obj = {
        id,
        orginternalcode: item ? item.orginternalcode : ''
      };
      res.push(obj);
      tree = item ? item.children : [];
      // console.log('res', res);
      this.getCodes(tree, array, res);

    },
    init() {
      // if (this.oTreeData.length > 0) {
      //   return new Promise(resolve => {
      //     resolve(true);
      //   });
      // }
      if (this.depCode) {
        let gxdwdm = [];
        this.$utils.getDepCodeArryWithUser(
          this.userInfor.depCode,
          this.depCode,
          gxdwdm,
          this.isShowDeepName
        );
        this.$emit('input', gxdwdm);
        this.treeObject = {};
        this.loopItemChange(gxdwdm);
      }
      else {
        return this.getListAllChildDepTree();
      }
    },
    /**
     * 数据转成treeData
     */
    transforTree(treeData, depCodes = []) {
      if (!treeData || treeData.length === 0) {
        if (
          depCodes.length
          && lodash.get(this.treeObject, depCodes.join(',children,').split(','))
        ) {
          lodash.get(
            this.treeObject,
            depCodes.join(',children,').split(',')
          ).children = null;
        }
        return [];
      }
      const childs = [];
      let treeObj = {};
      this.defaultBool = false;
      treeData.forEach(tree => {
        if (
          depCodes.length
          && lodash.get(this.treeObject, depCodes.join(',children,').split(','))
        ) {
          lodash.get(
            this.treeObject,
            depCodes.join(',children,').split(',')
          ).children[tree.id] = {
            // value: JSON.stringify({
            //   id: tree.id,
            //   orginternalcode: tree['orginternalcode']
            // }),
            value: tree.id,
            orginternalcode: tree['orginternalcode'],
            label: tree.orgname,
            depName: tree.orgname,
            id: tree.id,
            children: {}
          };
        }
        else {
          // this.treeObject[tree.depCode] = {
          //   value: tree.depCode,
          //   label: tree.name,
          //   depName: tree.name,
          //   depCode: tree.depCode,
          //   children: {}
          // };
          treeObj[tree.id] = {
            // value:  JSON.stringify({
            //     id: tree.id,
            //     orginternalcode: tree['orginternalcode']
            //   }),
            value: tree.id,
            orginternalcode: tree['orginternalcode'],
            label: tree.orgname,
            depName: tree.orgname,
            id: tree.id,
            children: {}
          };
          // console.log('wwwwwwwwwwww');
          if (this.isShowDeepName) {
            // console.log("****depcode",this.userInfor);
            // 显示根节点
            if (this.depCode) {
              this.treeObject[this.depCode] = {
                value: this.depCode,
                orginternalcode: this.orgCode,
                label: this.orgName,
                depName: this.orgName,
                id: this.depCode,
                children: treeObj
              };
            }
            else {
              this.treeObject[this.userInfor.depCode] = {
                value: this.userInfor.depCode,
                orginternalcode: this.userInfor['orgCode'],
                label: this.userInfor.departName,
                depName: this.userInfor.departName,
                id: this.userInfor.depCode,
                children: treeObj
              };
            }
            // 设置默认
            // console.warn('设置默认');
            if (!this.defaultBool) {
              this.defaultBool = !this.defaultBool;
              if (this.depCode) {
                this.$emit('input', [this.depCode]);
              }
              else {
                this.$emit('input', [this.userInfor.depCode]);
              }
              // this.handleItemChange([this.userInfor.depCode]);
              // this.$emit('input', [JSON.stringify({
              //   id: this.userInfor.depCode,
              //   orginternalcode: this.userInfor['orgCode']
              // })]);
            }
            // this.handleItemChange([this.userInfor.depCode]);
            // this.$emit('input', [this.userInfor.depCode]);
          }
          else {
            this.treeObject = treeObj;
          }
        }
        childs.push({
          // value: {
          //   id: tree.id,
          //   orginternalcode: tree['orginternalcode']
          // },
          value: tree.id,
          orginternalcode: tree['orginternalcode'],
          label: tree.orgname,
          depName: tree.orgname,
          id: tree.id,
          children: {}
        });
      });
      this.$forceUpdate();
      return childs;
    },
    /**
     * 遍历循环每个节点机构
     */
    async loopItemChange(arry, index = 1) {
      console.log('遍历循环每个节点机构', arry);
      if (index <= arry.length) {
        this.handleItemChange(arry.slice(0, index)).then(() => {
          index += 1;
          this.loopItemChange(arry, index);
        });
      }


      else {

        console.warn('loop end');
      }
    }
  },
  watch: {
    depCode: {
      handler(str) {
        console.log('**************', str);
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.init();
          // this.init().then(() => {
          //   // if (str) {
          //   //   // console.log(str);
          //   // let gxdwdm = [];
          //   //   this.$utils.getDepCodeArryWithUser(
          //   //     this.userInfor.depCode,
          //   //     str,
          //   //     gxdwdm,
          //   //     this.isShowDeepName
          //   //   );
          //   // this.$emit('input', gxdwdm);
          //   //   this.loopItemChange(gxdwdm);
          //   // }
          // });
        }, 300);
      },
      immediate: true
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="scss">
.el-cascader.is-disabled {
  .el-cascader__label {
    cursor: not-allowed;
  }
}
</style>
