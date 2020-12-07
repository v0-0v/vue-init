<template>
  <div class="customFormBox">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" :inline="true" :label-width="width">
      <el-form-item v-for="item of list" :key="item.prop" :label="item.label" :prop="item.prop">
        <!-- number -->
        <template v-if="item.type=='number'">
          <el-input-number v-model="ruleForm[item.prop]" v-bind="item.attrsObj || {}" :disabled="isDisabled"></el-input-number>
        </template>
        <!-- switch -->
        <template v-else-if="item.type=='switch'">
          <el-switch v-model="ruleForm[item.prop]" v-bind="item.attrsObj || {}" :disabled="isDisabled">
          </el-switch>
        </template>
        <!-- textarea -->
        <template v-else-if="item.type=='textarea'">
          <el-input type="textarea" v-model="ruleForm[item.prop]" v-bind="item.attrsObj || {}" :disabled="isDisabled"></el-input>
        </template>
        <!-- component -->
        <template v-else-if="item.type=='component'">
          <component :is="item.componentName" v-model="ruleForm[item.prop]" v-bind="item.attrsObj || {}" :disabled="isDisabled"></component>
        </template>

        <!-- input text -->
        <template v-else>
          <el-input v-model="ruleForm[item.prop]" v-bind="item.attrsObj || {}" :disabled="isDisabled"></el-input>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseCalculations from '@/views/comm/baseCalculations';
import BaseMath from '@/views/comm/baseMath';
// import SmartFormType from './smartFormType.js';

const components = { BaseCalculations, BaseMath };

export default {
  name: 'CustomForm',
  components,
  props: {
    width: { type: String, default: '100px' },
    dialogType: String,
    ruleForm: Object,
    rules: Object,
    list: Array
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    isDisabled() {
      return this.dialogType === 'detail';
    }
  }
};
</script>

<style lang="scss">
.customFormBox {
  .demo-ruleForm {
    text-align: center;
    margin: 0 auto;
    .el-form-item {
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .el-input,
    .el-select,
    .el-input-number,
    .el-cascader {
      width: 250px;
      // height: 32px;
      // input {
      //   height: 32px;
      // }
    }
    .el-textarea {
      width: 250px;
    }
  }
}
</style>
