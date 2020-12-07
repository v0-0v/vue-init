<template>
  <el-table-column
    v-bind="$attrs" v-on="$listeners"
    :show-overflow-tooltip="true"
  >
    <template slot="header">
      <div style="align-items: center;display: inline-flex;vertical-align:middle" ref="header">
        <slot name="header"></slot>
      </div>
    </template>
    <template slot-scope="scope"
    >
      <div :ref="scope.$index"
           @contextmenu.prevent.stop="copy"
      >
        <slot :scope="scope"></slot>
      </div>
    </template>
  </el-table-column>
</template>
<script>

export default {
  name: 'spTableColum',
  data() {
    return {
      headerFont: '',
      conterFont: [],
      text: ''
    };
  },
  methods: {
    copyFuntion() {
      const input = document.createElement('input');// 在这里创建一个input标签
      input.setAttribute('type', 'text');
      input.value = this.text;
      input.setAttribute('value', this.text);
      document.body.appendChild(input);
      input.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      document.body.removeChild(input);
    },
    copy(e) {
      this.text = e.target.innerText;
      this.copyFuntion();
    }
  }
};
</script>
