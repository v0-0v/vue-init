<template>

  <el-dropdown :hide-on-click="false" trigger="click" placement="bottom-start" style="padding:0;">
    <!-- <el-input :value="value" v-bind="$attrs" v-on="$listeners" clearable></el-input> -->
    <div class="mutiDepCodeTreeResult" v-bind="$attrs">
      <el-tag class="resultTagBox clearfix" size="mini" type="warning" v-for="(tag,index) in selectArray" :key="tag.value" closable :disable-transitions="false" @close="handleClose(index,tag)">
        <span class="resultTagBoxSpan" :title="tag.label">{{tag.label}}</span>
      </el-tag>
    </div>
    <el-dropdown-menu slot="dropdown">
      <div class="mutiDepCodeTreeBoxFilter">
        <el-alert title="只能勾选同级的机构，否则先清空机构树再操作" type="info"> </el-alert>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"  clearable></el-input>
      </div>
      <div class="mutiDepCodeTreeBox">
        <el-tree class="filter-tree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree" :check-strictly="true" show-checkbox @check="checkChange" :highlight-current="true" node-key="value" :default-expanded-keys="defaultExpand"></el-tree>

      </div>
      <div class="mutiDepCodeTreeBoxResult">
        <el-row type="flex">
          <el-col :span="18"><span class="name">共勾选了：<el-tag type="success" size="small">{{ selectArray.length }}</el-tag>个机构</span></el-col>
          <el-col :span="6" class="text-right">
            <el-button size="small" icon="el-hg-icon-delete" @click="reset">清空</el-button>
          </el-col>
        </el-row>

      </div>
    </el-dropdown-menu>
  </el-dropdown>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'mutiDepCodeTree',
  props: ['value'],
  data() {
    return {
      timer: null,
      treeData: [],
      treeDataCopy: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectArray: [],
      filterText: '',
      defaultExpand: []
    };
  },
  methods: {
    ...mapGetters({
      userInfor: 'user/userInfor',
      getTree: 'depCode/getTree'
    }),
    ...mapActions({
      setCommData: 'depCode/setCommData'
    }),
    async getListAllChildDepTree() {
      const user = await this.userInfor();
      // 获取缓存数据
      // const storeData = await this.getTree();
      // console.log(this.getTree());
      // if (storeData) {
      //   this.treeData = storeData;
      //   // console.log(this.treeData);
      //   return this.treeData;
      // }
      const { bean } = await this.$services.post({
        type: 'DEPT',
        url: 'getListAllChildDepTree',
        params: { depCode: user.depCode }
      });
      this.treeData = [
        {
          disabled: false,
          value: bean.depCode,
          label: bean.depNameAbb,
          depName: bean.depName,
          level: this.getDepLevel(bean.depCode),
          children: this.transforTree(bean.childRepDepConfigs)
        }
      ];
      // copy备份
      this.treeDataCopy = JSON.parse(JSON.stringify(this.treeData));
      // console.log('treeDataCopy', this.treeDataCopy);
      // console.log('treeData', this.treeData);

      /**
       * 默认勾选状态，展开状态
       */
      this.defaultExpand.push(user.depCode);
      this.initChecked(user.depCode);

      // 缓存
      this.setCommData(this.treeDataCopy);
    },
    /**
     * 数据转成treeData
     */
    transforTree(treeData, level = 2) {
      if (!treeData || treeData.length === 0) {
        return [];
      }
      const childs = [];
      treeData.forEach(tree => {
        if (
          typeof tree.childRepDepConfigs !== 'undefined'
          && tree.childRepDepConfigs
          && tree.childRepDepConfigs.length > 0
        ) {
          childs.push({
            disabled: false,
            value: tree.depCode,
            label: tree.depNameAbb,
            depName: tree.depName,
            level: this.getDepLevel(tree.depCode),
            children: this.transforTree(tree.childRepDepConfigs, level + 1)
          });
        }
        else {
          childs.push({
            disabled: false,
            value: tree.depCode,
            label: tree.depNameAbb,
            depName: tree.depName,
            level: this.getDepLevel(tree.depCode)
          });
        }
      });
      return childs;
    },
    /**
     * 获取级别depCode12位数字
     */
    getDepLevel(depCode) {
      // 省
      if (depCode.substring(2, 12) === '0000000000') {
        return 10;
      }
      // 市
      if (depCode.substring(4, 12) === '00000000') {
        return 8;
      }
      // 县区
      if (depCode.substring(6, 12) === '000000') {
        return 6;
      }
      // 街道
      if (
        depCode.substring(8, 12) === '0000'
        || depCode.substring(9, 12) === '000'
      ) {
        return 4;
      }
      // 社区
      return 2;
    },
    /**
     * checkbox
     */
    checkChange(item) {
      // console.log('tttttt');
      // console.log('item', item);
      const { level } = item;
      /**
       * 当selectArray的length是0时,禁用其不同level的checkbox
       */
      if (this.selectArray.length === 0) {
        console.warn('length is 0 loop disbled');
        this.loopDisabled(this.treeData, level);
        /**
         * 勾选逻辑
         */
        this.selectArray.push({
          value: item.value,
          label: item.label,
          depName: item.depName
        });
        this.setValue();
        return;
      }

      /**
       * 当selectArray的length大于0
       */
      // console.log(item);
      // 判断是否有重复字段key,如果有，更新数据，没有就添加
      let bool = false;
      let index = 0;
      for (let i = 0; i < this.selectArray.length; i++) {
        let _item = this.selectArray[i];
        if (_item.value === item.value) {
          bool = true;
          index = i;
          break;
        }
      }
      /**
       * 是否已经存在在数组中，存在：去除勾选逻辑
       */
      if (bool) {
        this.selectArray.splice(index, 1);
        this.setValue();
        // 当长度为0时，从备份中恢复
        if (this.selectArray.length === 0) {
          console.warn('当长度为0时，从备份中恢复');
          this.$refs.tree.setCheckedKeys([]);
          this.treeData = JSON.parse(JSON.stringify(this.treeDataCopy));
          // console.log(this.treeData);
        }
      }
      else {
        /**
         * 不存在：勾选逻辑
         */
        this.selectArray.push({
          value: item.value,
          label: item.label,
          depName: item.depName
        });
        this.setValue();
      }
    },
    /**
     * 遍历treeData 设置disabled
     */
    loopDisabled(data, level) {
      data = data.map(item => {
        if (item.level !== level) {
          item.disabled = true;
        }
        if (item.children) {
          // 递归遍历
          this.loopMap(item.children, level);
        }
        return item;
      });
    },
    loopMap(arry, level) {
      arry = arry.map(item => {
        if (item.level !== level) {
          item.disabled = true;
        }
        if (item.children) {
          this.loopMap(item.children, level);
        }
        return item;
      });
    },
    /**
     * init check tree
     */
    initChecked(depCode) {
      const level = this.getDepLevel(depCode) - 2;

      // console.log(`level:${this.getDepLevel(depCode)},disabledLevel:${level}`);
      // 禁用非本级的
      this.loopDisabled(this.treeData, level);
      // 选中
      const data = this.treeData[0].children;
      let checkedArray = [];
      data.forEach(item => {
        if (item.level === level) {
          checkedArray.push({
            value: item.value,
            label: item.label,
            depName: item.depName
          });
        }
      });
      const checked = checkedArray.map(item => item.value);
      this.$refs.tree.setCheckedKeys(checked);
      // console.log(checkedArray);
      this.selectArray = [...checkedArray];
      this.setValue(); // emit
    },
    handleClose(index) {
      // 清空
      this.$refs.tree.setCheckedKeys([]);
      this.selectArray.splice(index, 1);
      const checked = this.selectArray.map(item => item.value);
      this.$refs.tree.setCheckedKeys(checked);
      this.setValue();
      if (checked.length === 0) {
        this.treeData = JSON.parse(JSON.stringify(this.treeDataCopy));
      }
    },
    /**
     * emit selectArray data
     */
    setValue() {
      const arry = JSON.parse(JSON.stringify(this.selectArray));
      this.$emit('input', arry);
    },
    /**
     * reset tree
     */
    reset() {
      this.$refs.tree.setCheckedKeys([]);
      this.treeData = JSON.parse(JSON.stringify(this.treeDataCopy));
      this.selectArray = [];
      this.setValue();
    },
    /**
     * filter
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  created() {
    this.getListAllChildDepTree();
  },
  watch: {
    value(arry) {
      if (this.selectArray.length === arry.length) {
        console.warn('equails');
      }
      else {
        // 清空
        this.$refs.tree.setCheckedKeys([]);
        this.treeData = JSON.parse(JSON.stringify(this.treeDataCopy));
        this.selectArray = arry;
        const newChecked = this.selectArray.map(itemNew => itemNew.value);
        this.$refs.tree.setCheckedKeys(newChecked);
      }
    },
    filterText(val) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.$refs.tree.filter(val);
      }, 300);
    }
  }
};
</script>
<style lang="scss">
.mutiDepCodeTree{
  padding: 0;
  }
.mutiDepCodeTreeResult {
  margin: 0px;
  min-height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
  max-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  .el-tag {
    .el-icon-close {
      vertical-align: top;
      margin-top: 3px;
    }
  }
  .resultTagBox {
    float: left;
    margin: 2px;
    .resultTagBoxSpan {
      display: inline-block;
      white-space: nowrap;
      max-width: 190px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.mutiDepCodeTreeBox {
  max-height: 300px;
  overflow-y: auto;
}
.mutiDepCodeTreeBoxResult {
  border-top: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 4px;
  .text-right{
    text-align: right;
  }
}

</style>
