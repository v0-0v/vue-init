<template>
  <el-dropdown :hide-on-click="false" trigger="click" placement="bottom-start" ref="dropdownTree">
    <!-- <el-input :value="value" v-bind="$attrs" v-on="$listeners" clearable></el-input> -->
    <!-- <div class="mutiDepCodeTreeResult" v-bind="$attrs">
      <el-tag class="resultTagBox clearfix" size="mini" type="warning" v-for="(tag,index) in selectArray" :key="tag.value" closable :disable-transitions="false" @close="handleClose(index,tag)">
        <span class="resultTagBoxSpan" :title="tag.label">{{tag.label}}</span>
      </el-tag>
    </div> -->
    <div class="mutiDepCodeTreeResult2" v-bind="$attrs">
      <div v-if="selectArray.length===1">
        <el-tag size="mini" type="warning" closable :disable-transitions="false" @close="handleClose(0,selectArray[0])">
          <span class="resultTagBoxSpan" :title="selectArray[0].label">{{selectArray[0].label}}</span>
        </el-tag>
      </div>
      <div v-if="selectArray.length>1">
        <el-tag size="mini" type="warning" closable :disable-transitions="false" @close="handleClose(0,selectArray[0])">
          <span class="resultTagBoxSpan" :title="selectArray[0].label">{{selectArray[0].label}}</span>
        </el-tag>
        <el-tag size="mini" type="warning">+{{selectArray.length-1}}</el-tag>
      </div>
    </div>
    <el-dropdown-menu slot="dropdown">
      <div class="mutiDepCodeAlert" v-if="mood === 'strict'">
        <el-alert title="只能勾选同级的机构，否则先清空机构树再操作" type="info" show-icon></el-alert>
      </div>
      <!-- <div class="mutiDepCodeTreeBoxFilter">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      </div> -->
      <div class="mutiDepCodeTreeBox">
        <el-tree class="filter-tree" :props="defaultProps" :load="loadTreeNode" :lazy="true" :filter-node-method="filterNode" ref="tree" :check-strictly="true" show-checkbox @check="checkChange" :highlight-current="true" node-key="value" :default-expanded-keys="defaultExpand"></el-tree>
      </div>
      <div class="mutiDepCodeTreeBoxResult">
        <el-row type="flex">
          <el-col :span="12">
            <span class="name">共勾选了：
              <el-tag type="success" size="small">{{ selectArray.length }}</el-tag>个机构
            </span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button size="small" icon="el-hg-icon-save" @click="hideTree">确定</el-button>
            <el-button size="small" icon="el-hg-icon-delete" @click="reset">清空</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'mutiDepCodeTree',
  props: {
    value: Array,
    /**
     * mood 模式 strict 同级关系
     */
    mood: {
      type: String,
      default: 'strict'
    },
    isShowRoot: {
      type: Boolean,
      default: true
    }
  },
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
    /**
     * 懒加载tree
     */
    loadTreeNode(node, resolve) {
      // console.log('loadTreeNode');
      // console.log(node);

      if (!node) {
        return;
      }
      /**
       * 默认初始化
       */
      if (node.level === 0) {
        // console.log(';;');
        const user = this.userInfor;
        this.getListAllChildDepAjax(user.depCode).then(data => {
          // 是否是严格模式（同级）
          if (this.mood !== 'strict') {
            this.selectArray = [{
              value: user.depCode,
              label: user.departName,
              depName: user.departName
            }];
            this.setValue();
            const checked = [user.depCode];
            this.$refs.tree.setCheckedKeys(checked);
          }
          else {
            this.selectArray = [...data];
            this.setValue();
            const checked = data.map(item => item.value);
            this.$refs.tree.setCheckedKeys(checked);
          }

          let sdata = [];
          if (this.isShowRoot) {
            sdata = [{
              value: user.depCode,
              label: user.departName,
              depName: user.departName,
              children: data
            }];
            this.defaultExpand = [user.depCode];
          }
          else {
            sdata = data;
          }
          return resolve(sdata);
        });
      }
      else {
        this.getListAllChildDepAjax(node.data.value).then(dataLeaf => {
          // 不能清空
          setTimeout(() => {
            const checked = this.selectArray.map(item => item.value);
            this.$refs.tree.setCheckedKeys(checked);
          }, 300);

          return resolve(dataLeaf);
        });
      }
    },
    /**
     * 分级获取数据
     */
    async getListAllChildDepAjax(depCode) {
      const { bean } = await this.$services.post({
        type: 'DEPT',
        url: 'getListAllChildDepAjax',
        params: { depCode }
      });

      const arry = [];
      for (let i = 0; i < bean.length; i++) {
        let item = bean[i];
        arry.push({
          disabled: false,
          value: item.depCode,
          label: item.name,
          depName: item.depNameAbb,
          level: this.getDepLevel(item.depCode)
        });
      }

      return arry;
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
      // console.log(this.$refs.tree);
      const { level } = item;
      // 长度为0
      if (this.selectArray.length === 0) {
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
      }
      else {
        /**
         * 不存在：勾选逻辑(是否同级 or 不限制)
         */
        if (this.mood !== 'strict') {
          this.selectArray.push({
            value: item.value,
            label: item.label,
            depName: item.depName
          });
          this.setValue();
          return;
        }
        const levelFirst = this.getDepLevel(this.selectArray[0].value);
        if (levelFirst !== level) {
          const checked = this.selectArray.map(item2 => item2.value);
          this.$refs.tree.setCheckedKeys(checked);
          this.$message({
            message: '请选择同级的机构，不同级别的机构不能勾选',
            type: 'warning'
          });
          return;
        }
        this.selectArray.push({
          value: item.value,
          label: item.label,
          depName: item.depName
        });
        this.setValue();
      }
    },

    handleClose(index) {
      // 删除一项
      this.$refs.tree.setCheckedKeys([]);
      this.selectArray.splice(index, 1);
      const checked = this.selectArray.map(item => item.value);
      this.$refs.tree.setCheckedKeys(checked);
      this.setValue();
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
      this.selectArray = [];
      this.setValue();
    },
    /**
     * filter
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    hideTree() {
      this.$refs.dropdownTree.hide();
    }
  },
  created() {
    this.loadTreeNode();
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
  },
  computed: {
    ...mapGetters({
      userInfor: 'user/userInfor'
    })
  }
};
</script>
<style lang="scss">
.el-dropdown-menu.el-popper {
  padding: 0;
  padding-top: 4px;
}
.mutiDepCodeTree {
  padding: 0;
}
.mutiDepCodeTreeResult2 {
  height: 32px;
  min-width: 217px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
  .el-tag {
    margin-left: 4px;
    .el-icon-close {
      vertical-align: top;
      margin-top: 3px;
    }
  }

  .resultTagBoxSpan {
    vertical-align: top;
    display: inline-block;
    white-space: nowrap;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.mutiDepCodeTreeBoxFilter {
  padding: 0px 10px;
}
.mutiDepCodeAlert {
  .el-alert__closebtn {
    top: 15px;
    right: 5px;
  }
}
.mutiDepCodeTreeResult {
  margin: 0px;
  height: 40px;
  min-width: 217px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
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
      max-width: 180px;
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
  min-width: 300px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 4px;

  .text-right {
    text-align: right;
  }
}
</style>
