<template>
  <el-dropdown :hide-on-click="false" trigger="click" placement="bottom-start">
    <!-- <el-input :value="value" v-bind="$attrs" v-on="$listeners" clearable></el-input> -->
    <div class="result" v-bind="$attrs">
      <el-tag class="resultTagBox clearfix" size="mini" type="warning" v-for="(tag,index) in selectArray" :key="tag.value" closable :disable-transitions="false" @close="handleClose(index,tag)">
        <span class="resultTagBoxSpan" :title="tag.label">{{tag.label}}</span>
      </el-tag>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="width:90%;"></el-input>
      <div class="treeBox">
        <el-tree class="filter-tree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree" :check-strictly="true" show-checkbox @check="checkChange" :highlight-current="true" node-key="value" :default-expanded-keys="defaultExpand">
        </el-tree>
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
      // // 获取缓存数据
      const storeData = await this.getTree();
      this.defaultExpand.push(user.depCode);
      // this.$refs.tree.setCheckedKeys([user.depCode]);

      if (storeData) {
        this.treeData = storeData;
        return this.treeData;
      }
      const { bean, status } = await this.$services.post({
        type: 'DEPT',
        url: 'getListAllChildDepTree',
        params: { depCode: user.depCode }
        // params: { depCode: '330500000000' }
      });
      if (!status) {
        return;
      }
      this.treeData = [
        {
          value: bean.depCode,
          label: bean.depNameAbb,
          depName: bean.depName,
          children: this.transforTree(bean.childRepDepConfigs)
        }
      ];

      // 缓存
      this.setCommData(this.treeData);
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
            value: tree.depCode,
            label: tree.depNameAbb,
            depName: tree.depName,
            level,
            children: this.transforTree(tree.childRepDepConfigs, level + 1)
          });
        }
        else {
          childs.push({
            value: tree.depCode,
            label: tree.depNameAbb,
            depName: tree.depName,
            level
          });
        }
      });
      return childs;
    },
    /**
     * checkbox click
     */
    checkChange(item) {

      // console.log(item);

      // 判断是否有重复字段key,如果有，更新数据，没有就添加
      let bool = false;
      for (let i = 0; i < this.selectArray.length; i++) {
        let _item = this.selectArray[i];
        if (_item.value === item.value) {
          bool = true;
          break;
        }
      }
      let newChecked = [];
      // 该节点是否已经勾选
      if (bool) {
        // console.log('------------去除勾选-----------------');
        this.setUnchecked(item);
        // console.log(this.selectArray);
        newChecked = this.selectArray.map(itemNew => itemNew.value);
        // console.log(newChecked);
        this.$refs.tree.setCheckedKeys([...newChecked]);
      }
      else {
        // console.log('------------加勾选-----------------');
        this.setChecked(item);
        // console.log(this.selectArray);
        newChecked = this.selectArray.map(itemNew => itemNew.value);
        this.$refs.tree.setCheckedKeys([...newChecked]);
      }
    },
    // tags
    handleClose(index) {
      // 清空
      this.$refs.tree.setCheckedKeys([]);
      this.selectArray.splice(index, 1);
      const checked = this.selectArray.map(item => item.value);
      this.$refs.tree.setCheckedKeys(checked);
      this.setValue();
    },
    setValue() {
      const arry = JSON.parse(JSON.stringify(this.selectArray));
      this.$emit('input', arry);
    },
    /**
     * 选中处理handel
     */
    setChecked(item) {
      let array = [];
      // 勾选自身
      array.push({
        value: item.value,
        label: item.label,
        depName: item.depName
      });

      // 勾选其自身的直属子级
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          let _item = item.children[i];
          array.push({
            value: _item.value,
            label: _item.label,
            depName: _item.depName
          });
        }
      }
      // 合并
      this.selectArray = [...this.selectArray, ...array];
      this.setValue();
    },
    /**
     * 去除选中处理handel
     */
    setUnchecked(item) {
      // 去除勾选的数组
      let array = [];
      // 去除勾选自身
      array.push(item.value);

      // 去除勾选其自身的直属子级
      if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
          let _item = item.children[i];
          array.push(_item.value);
        }
      }
      // console.log('array', array);
      // 剔除
      this.selectArray = this.selectArray.filter(itemData => !array.includes(itemData.value));
      // console.log(this.selectArray);
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
.result {
  .el-tag {
    .el-icon-close {
      vertical-align: top;
      margin-top: 3px;
    }
  }
  .resultTagBox {
    float: left;
    margin: 3px;
    .resultTagBoxSpan {
      display: inline-block;
      white-space: nowrap;
      max-width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

<style lang="scss" scoped>
.treeBox {
  max-height: 300px;
  overflow-y: auto;
}

.result {
  padding: 3px 10px;
  min-height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
  max-height: 80px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
