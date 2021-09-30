<template>
  <div class="">
    <el-form ref="form" :inline="true" :model="ruleForm" :rules="rules" class="demo-form-inline">
      <el-form-item label="资源名称：" prop="name">
        <el-input v-model="ruleForm.name" style="max-width:180px;" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'search',
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {}
    };
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
        //   this.$emit('getResourceList', this.ruleForm);// emit
        }
        else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
