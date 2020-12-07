// 已弃用

<template>
  <div>
    <el-cascader
      :value="statFieldFor"
      :options="options"
      @active-item-change="handleItemChange"
      @change="handelChange"
      :props="props"
      separator="."
      style="width:100%;"
      v-bind="$attrs"
    ></el-cascader>
  </div>
</template>
<script>
/**
 * 字段 表名，字段ming(*弃用 使用ticTableTree)
 * <dic-tree :statFieldFor="ruleForm.statFieldFor" @handelStatField="handelStatField" style="width:250px;" :disabled="dialogType === 'detail'" />
 */
export default {
  name: 'dicTree',
  props: ['statFieldFor'],
  data() {
    return {
      options: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'table'
      }
    };
  },
  methods: {
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
      this.options = _options;
      console.warn('dictree options is compeley');
    },
    getSysDicControllerDicColumn(tableID) {
      return this.$services.post({
        type: 'SYSAPI',
        url: 'getSysDicControllerDicColumn',
        params: { tableID }
      });
    },
    init() {
      return this.getSysDicControllerDicTable();
    },
    handleItemChange(val) {
      let oActiveItem;
      for (let i = 0; i < this.options.length; i++) {
        let item = this.options[i];
        if (item.value === val[0]) {
          oActiveItem = item;
        }
      }
      if (oActiveItem && !oActiveItem.table.length) {
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
      else {
        console.warn('options 还没有准备好');

      }
    },
    handelChange(data) {
      // console.warn(data);
      // this.statField = '表名' + data[0] + '.列名' + data[1];
      this.$emit('handelStatField', data);
    }
  },
  created() {
    this.init();
  },
  watch: {
    statFieldFor: {
      handler(val) {
        // 数组不存在
        if (!val) {
          console.warn('dictree no init');
          return;
        }
        // 存在数组
        if (val.length > 0) {
          // 如果options已经加载完
          if (this.options.length > 0) {
            console.warn('dictree  has load options');
            this.handleItemChange(val);
          }
          else {
            console.warn('dictree  has not load options');
            this.init()
              .then(() => {
                this.handleItemChange(val);
              });
          }

        }
        else {
          console.warn('no dictree init');
          this.getSysDicControllerDicTable();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
