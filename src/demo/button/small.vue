<template>
  <div>
    <h3>业务图标button</h3>
    <el-row class="line" :gutter="20">
      <el-col :span="3">
        <p>新增</p>
        <el-button type="primary" size="mini" icon="el-hg-icon-add" ></el-button>
        <p class="code">
          &lt;el-button type="primary" size="mini" icon="el-hg-icon-add" &gt;&lt;/el-button&gt;
        </p>
      </el-col>
      <el-col :span="3">
        <p>修改</p>
        <el-button type="primary" size="mini" icon="el-hg-icon-edit" ></el-button>
        <p class="code">
          &lt;el-button type="primary" size="mini" icon="el-hg-icon-edit" &gt;&lt;/el-button&gt;
        </p>
      </el-col>
      <el-col :span="3">
        <p>删除</p>
        <el-button type="primary" size="mini" icon="el-hg-icon-delete" ></el-button>
        <p class="code">
          &lt;el-button type="primary" size="mini" icon="el-hg-icon-delete" &gt;&lt;/el-button&gt;
        </p>
      </el-col>
      <el-col :span="3">
        <p>刷新</p>
        <el-button type="primary" size="mini" icon="el-hg-icon-refreash"></el-button>
        <p class="code">
          &lt;el-button type="primary" size="mini" icon="el-hg-icon-refreash" &gt;&lt;/el-button&gt;
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'smallButton'
};
</script>

<style scoped>

</style>
