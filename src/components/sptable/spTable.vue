<template>
  <el-table v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.5)" class="sp-edit" v-bind="$attrs" v-on="$listeners" ref='spTable' border row-key='uid' :data="parentTableData" @cell-click="toEdit" @row-click="clickFn" @row-dblclick="dblclickFn" @header-dragend="changeHeaderWidth" >
    <slot>
    </slot>
  </el-table>
</template>
<script>
import Sortable from 'sortablejs';
import $ from 'jquery';

const _ = require('lodash');

export default {
  name: 'spTable',
  props: {
    parentCol: {
      type: Array,
      request: true
    },
    // 是否支持拖拽
    dragDrop: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    // 列表数据
    parentTableData: {
      type: Array,
      request: true
    },
    // 是否出现选择框
    isCheckbox: {
      type: Boolean,
      default: false
    },
    // width: Array
    // 是否使用展开行
    isExpand: {
      type: Boolean,
      default: false
    },
    // 自定义合计逻辑
    getSummaries: Function,
    // 第几个节点
    keyDom: {
      type: Number,
      default: 0
    },
    // table列表最后一条数据高亮
    tableRowClassName: Function
  },
  data() {
    return {
      nweWidth: 0,
      width: [55, 100, 150, 200, 250, 300, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      loading: false,
      col: [],
      dropCol: [], // 拖动后的数据
      tableData: [],
      maxHeight: 200,
      contextMenuTarget: null,
      contextMenuVisible: false,
      exhibitionFont: [], // 该列数据是否可以被查看
      expandRowKeys: [],
      refresh: true,
      bindKeyEvent: false,
      keyEvent: event => {
        /** **
         * 节点中添加.cellFocus类名
         * * */

        const current = $('.cellFocus');
        const currentClass = current.attr('class');
        switch (event.keyCode) {
          case 37: // 左键
            if (currentClass.indexOf('el-table') !== -1) {
              if (current.prev().length === 0) return;
              current.prev().addClass('cellFocus cellActive');
              current.removeClass('cellFocus cellActive');
              current.prev().find('input').focus();
            }
            else {
              if (current.parent().prev().length === 0) return;
              current.parent().prev().addClass('cellFocus cellActive');
              current.removeClass('cellFocus cellActive');
              current.parent().prev().find('input').focus();
            }
            break;
          case 38: // 上键
            if (currentClass.indexOf('el-table') !== -1) {
              if (current.parent().prev().length === 0) return;
              current.removeClass('cellFocus cellActive');
              current.parent().prev().find('td').eq(current.index())
                .addClass('cellFocus cellActive');
              current.parent().prev().find('td').eq(current.index())
                .find('input')
                .focus();
            }
            else {
              if (current.parent().parent().prev().length === 0) return;
              current.removeClass('cellActive cellActive');
              current.parent().parent().prev().find('td')
                .eq(current.parent().index())
                .addClass('cellFocus cellActive');
              current.parent().parent().prev().find('td')
                .eq(current.parent().index())
                .find('input')
                .focus();
            }
            break;
          case 39: // 右键
            if (currentClass.indexOf('el-table') !== -1) {
              if (current.next().length === 0) return;
              current.next().addClass('cellFocus cellActive');
              current.removeClass('cellFocus cellActive');
              current.next().find('input').focus();
            }
            else {
              if (current.parent().next().length === 0) return;
              current.parent().next().addClass('cellFocus cellActive');
              current.removeClass('cellFocus cellActive');
              current.parent().next().find('input').focus();
            }
            break;
          case 40: // 下键
            if (currentClass.indexOf('el-table') !== -1) {
              current.removeClass('cellFocus cellActive');
              if (current.parent().next().length > 0) {
                current.parent().next().find('td')
                  .eq(current.index())
                  .addClass('cellFocus cellActive');
                current.parent().next().find('td')
                  .eq(current.index())
                  .find('input')
                  .focus();
              }
              else {
                this.$emit('addNewData', () => {
                  current.parent().next().find('td').eq(current.index())
                    .addClass('cellFocus cellActive');
                  current.parent().next().find('td').eq(current.index())
                    .find('input')
                    .focus();
                });
              }
            }
            else {
              current.removeClass('cellFocus cellActive');
              current.parent().parent().next().find('td')
                .eq(current.parent().index())
                .addClass('cellFocus cellActive');
              current.parent().parent().next().find('td')
                .eq(current.parent().index())
                .find('input')
                .focus();
            }
            break;
          case 13:
            // current.addClass('cellActive');
            current.find('input').focus();
            break;
        }
      }
    };
  },
  created() {
    this.initTable();
  },
  mounted() {
    this.unbindKeys();
    // console.log('ketuo?', this.dragDrop);
    if (this.dragDrop) {
      this.columnDrop(this.keyDom);
      this.getTableWidth();
      // this.$nextTick(() => {
      // if (this.$refs.spTable.$el) {
      // this.contextMenuTarget = this.$refs.spTable.$el;
      // }
      // });
    }
  },
  methods: {
    clear() {
      this.$refs.spTable.clearSelection();
    },
    initTable() {
      this.tableData = _.cloneDeep(this.parentTableData);
      this.col = _.cloneDeep(this.parentCol);
      // 注释掉
      // this.col.forEach((el, elKey) => {
      //   console.log("*****",el);
      //   console.log("*****",elKey);
      //   if (el.isHide) {
      //     this.exhibitionFont[elKey] = true;
      //   }
      //   else {
      //     this.exhibitionFont[elKey] = undefined;
      //   }
      // });
      this.dropCol = _.cloneDeep(this.col);
    },
    // },
    /**
     * 行点击事件
     */
    clickFn(row, column, event) {
      // console.log('tangli----', event);
      if (event.target.className === 'el-input__inner') {
        return;
      }
      this.$refs.spTable.clearSelection();
      this.$refs.spTable.toggleRowSelection(row);
    },
    dblclickFn(row) {
      this.$refs.spTable.clearSelection();
      this.$refs.spTable.toggleRowSelection(row);
      this.$emit('getDetail');
    },
    // 行拖拽
    rowDrop() {
      // const tbody = document.querySelector('.el-table__body-wrapper tbody');
      // Sortable.create(tbody, {
      //   animation: 180,
      //   onChoose: () => {
      //     this.expandRowKeys = [];
      //   },
      //   onEnd: ({ newIndex, oldIndex }) => {
      //     const currRow = this.tableData.splice(oldIndex, 1)[0];
      //     this.tableData.splice(newIndex, 0, currRow);
      //     this.$emit('update:parentTableData', this.tableData);
      //     this.$nextTick(() => {
      //       this.$forceUpdate();
      //     });
      //   },
      // });
    },
    // 列拖拽
    columnDrop(key) {
      /** *
       * 增加dom判断
       *  */
      if (!document.querySelectorAll('.el-table__header-wrapper tr')[key]) {
        return;
      }
      const wrapperTr = document.querySelectorAll('.el-table__header-wrapper tr')[key];
      console.log(document.querySelectorAll('.el-table__header-wrapper tr'));
      // debugger;
      /* eslint-disable no-new */
      /* eslint-disable new-cap */
      new Sortable.create(wrapperTr, {
        filter: '.el-table-column--selection, .el-table__expand-column, .index',
        animation: 180,
        onMove: (evt, originalEvent) => {
          if (originalEvent.target.querySelector('el-table-column--selection')
            || originalEvent.target.className.indexOf('el-table-column--selection') !== -1
            || originalEvent.target.className.indexOf('el-checkbox__input') !== -1
            || originalEvent.target.parentNode.className.indexOf('el-table-column--selection') !== -1
            || originalEvent.target.parentNode.parentNode.className.indexOf('el-table-column--selection') !== -1
            || originalEvent.target.parentNode.className.indexOf('el-checkbox__input') !== -1) {
            return false;
          }
          if (originalEvent.target.querySelector('index')
            || originalEvent.target.className.indexOf('index') !== -1
            || originalEvent.target.className.indexOf('index') !== -1
            || originalEvent.target.parentNode.className.indexOf('index') !== -1
            || originalEvent.target.parentNode.parentNode.className.indexOf('index') !== -1
            || originalEvent.target.parentNode.className.indexOf('index') !== -1) {
            return false;
          }
        },
        onEnd: ({ newIndex, oldIndex }) => {
          console.log({ newIndex, oldIndex });
          newIndex--;
          oldIndex--;
          const adjust = document.querySelector('.el-table-column--selection');
          if (adjust) {
            newIndex--;
            oldIndex--;
          }
          if (newIndex === oldIndex) {
            setTimeout(() => {
              this.col[oldIndex].width = this.nweWidth;
            }, 300);
            return;
          }
          this.loading = true;
          const oldData = this.col[oldIndex];
          this.col.splice(oldIndex, 1);
          this.col.splice(newIndex, 0, oldData);
          this.$emit('update:parentCol', []);
          this.$nextTick(() => {
            this.$emit('update:parentCol', this.col);
            setTimeout(() => {
              this.loading = false;
            }, 500);
          });
        }
      });
    },
    /* eslint-disable no-unused-vars */
    changeHeaderWidth(newWidth, oldWidth, column, event) {
      this.nweWidth = newWidth;
    },
    // 判断是否可以移动列
    isMoveColumn(event) {
      // 判断table的selection是否还是在第一个位置如果不再则撤销改次移动
      let expandIndex = true;
      let selectionIndex = true;
      if (this.isExpand) {
        expandIndex = event.from.children[Number(this.isExpand) - 1].className.indexOf('el-table__expand-column');
      }
      if (this.isCheckbox) {
        selectionIndex = event.from.children[Number(this.isExpand) + Number(this.isCheckbox) - 1].className.indexOf('el-table-column--selection');
      }
      return selectionIndex !== -1 && expandIndex !== -1;
    },
    // 获取table表每个表头的宽度
    getTableWidth() {
      if (!document.querySelector('.el-table__header-wrapper tr')) {
        return;
      }
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
      let widthCol = [];
      for (let i = 0; i < wrapperTr.children.length; i++) {
        widthCol.push(wrapperTr.children[i].offsetWidth);
      }
      this.$emit('getTableWidth', widthCol);
    },
    // 导入事件触发
    importEven() {
      window.console.log('导入事件触发');
      this.contextMenuVisible = false;
      this.$emit('importEven');
    },
    // 导出事件触发
    exportEven() {
      window.console.log('导出事件触发');
      this.contextMenuVisible = false;
      this.$emit('exportEven');
    },
    // 该行数据不显示
    isHideEven(itme, index, key) {
      window.console.log(itme, index, key, 'itme, index, key');
      this.exhibitionFont.splice(index, 1, false);
      this.$emit('isHideEven', { itme, index, key });
    },
    // 该行数据显示
    noHideEven(itme, index, key) {
      this.exhibitionFont.splice(index, 1, true);
      this.$emit('noHideEven', { itme, index, key });
    },
    // 拖拽后修正文字查看问题
    columnDropFontEven(oldIndexKey, newIndexKey) {
      let oldData = this.exhibitionFont[oldIndexKey];
      this.exhibitionFont.splice(oldIndexKey, 1);
      this.exhibitionFont.splice(newIndexKey, 0, oldData);
    },
    toEdit(row, column, cell, event) {
      if (!this.isEdit) return;
      this.unbindKeys();
      this.bindKey();
      const currentDom = $(event.target);
      const className = currentDom.attr('class');
      // debugger
      if ((currentDom[0] && currentDom[0].tagName === 'INPUT')
        || (className && className.indexOf('checkbox') !== -1)
      ) return;
      $('.sp-edit tr td').removeClass('cellFocus cellActive');
      $('.sp-edit tr td div').removeClass('cellFocus cellActive');
      if (className && className.indexOf('el-table') !== -1) {
        currentDom.addClass('cellActive cellFocus');
        currentDom.find('input').focus();
        return false;
      }
      if (className && className.indexOf('cell') !== -1) {
        currentDom.parent().classList.addClass('cellFocus cellActive');
        return false;
      }
      currentDom.parent().parent().addClass('cellFocus cellActive');
      currentDom.prev().find('input').focus();
    },
    unbindKeys() {
      $(document).unbind('keydown');
    },
    bindKey() {
      $(document).keydown(this.keyEvent);
    },
    initSelect(selectList) {
      this.$nextTick(() => {
        if (selectList) {
          selectList.forEach(row => {
            this.$refs.spTable.toggleRowSelection(row);
          });
        }
        else {
          this.$refs.spTable.clearSelection();
        }
      });
    }
  }
};
</script>
<style lang="scss">
.sp-edit {
  .auto-input {
    display: none;
  }

  .el-table__body {
    tr {
      &:last-child {
        .cellFocus {
          // border-bottom: 2px solid blue !important;
        }
      }
    }
  }

  .span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cellFocus {
    // border-bottom: 1px solid #409eff !important;
  }

  .cellActive {
    .auto-input {
      display: block;
    }

    .auto-input + .span {
      display: none;
    }
  }
}
</style>
