<template>
  <div>
    <el-cascader
      :options="options"
      :value="value"
      @active-item-change="handleItemChange"
      :props="props"
      separator="."
      style="width:100%;"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-cascader>
  </div>
</template>
<script>
/**
 * 字段 表名，字段ming
 * demo <dic-table-tree v-model="your array"/>
 */
export default {
  name: 'dicTree',
  props: {
    value: Array,
    defaultItem: {
      type: Object
    }
  },
  data() {
    return {
      timer: null,
      options: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'table'
      }
    };
  },
  methods: {
    /**
     * 字典通用表
     */
    getSysDicControllerDicCalculations(dicType) {
      return this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicCalculations',
        params: dicType
      });
    },
    /**
     * 获取表table
     */
    async getSysDicControllerDicTable() {
      const { bean } = await this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicTable'
      });
      console.warn(bean);
      let _options = [];
      for (let i = 0; i < bean.length; i++) {
        let item = bean[i];
        _options.push({
          label: item.tableName,
          id: item.id,
          value: item.tableId,
          table: []
        });
      }

      if (Object.keys(this.defaultItem).length > 0) {
        _options.push({
          label: this.defaultItem.tableName,
          id: this.defaultItem.id,
          value: this.defaultItem.tableId,
          table: []
        });
      }
      this.options = _options;
      console.warn('dictree options is compeley');
    },
    /**
     * 获取表中的字段
     */
    getSysDicControllerDicColumn(tableID) {
      return this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicColumn',
        params: { tableID }
      });
    },
    /**
     * 二级菜单
     */
    handleItemChange(val) {
      let oActiveItem;
      for (let i = 0; i < this.options.length; i++) {
        let item = this.options[i];
        if (item.value === val[0]) {
          oActiveItem = item;
        }
      }
      if (oActiveItem && !oActiveItem.table.length) {
        // 是否是系统内置的
        if (oActiveItem.value === '[sysInner]') {
          this.getSysDicControllerDicCalculations({ dicType: oActiveItem.id }).then(res => {
            let _options = [];
            for (let i = 0; i < res.bean.length; i++) {
              let item = res.bean[i];
              _options.push({
                label: item.dicName,
                value: item.dicValue
              });
            }
            oActiveItem.table = _options;
          }).catch(err => {
            console.warn(err);
          });
        }
        else {
          this.getSysDicControllerDicColumn(oActiveItem.id).then(res => {
            let _options = [];
            for (let i = 0; i < res.bean.length; i++) {
              let item = res.bean[i];
              _options.push({
                label: item.fieldName,
                value: item.fieldId
              });
            }
            oActiveItem.table = _options;
          }).catch(err => {
            console.warn(err);
          });
        }

      }
      else {
        console.warn('oActiveItem oActiveItem.table loaded!');
      }
    },
    init() {

      return this.getSysDicControllerDicTable();
    },
    dd(val) {
      // 数组值null不存在
      if (!val) {
        console.warn('dictree no init');
        return;
      }
      // 存在数组
      if (val.length > 0) {
        // 如果options已经加载完
        if (this.options.length > 0) {
          console.warn('has load options');
          this.handleItemChange(val);
        }
        else {
          console.warn('dictree  has not load options');
          this.init()
            .then(() => {
              // console.log('vvv');
              // console.log(val);
              this.handleItemChange(val);
            });
        }

      }
      else {
        console.warn('空数组');
        this.init();
      }
    }
  },

  watch: {
    value: {
      handler(val) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        // 去抖动
        this.timer = setTimeout(() => {
          // 清除定时器
          clearTimeout(this.timer);
          // 数组值null不存在
          if (!val) {
            console.warn('dictree no init');
            return;
          }
          // 存在数组
          if (val.length > 0) {
          // 如果options已经加载完
            if (this.options.length > 0) {
              console.warn('has load options');
              this.handleItemChange(val);
            }
            else {
              console.warn('dictree  has not load options');
              this.init()
                .then(() => {
                // console.log('vvv');
                // console.log(val);
                  this.handleItemChange(val);
                });
            }

          }
          else {
            console.warn('空数组');
            this.init();
          }
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
<style lang="scss" scoped>
</style>
