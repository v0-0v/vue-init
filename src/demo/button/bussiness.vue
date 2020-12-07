<template>
  <div>
    <h3>业务button</h3>
    <div>
      <el-row class="line" :gutter="20">
        <el-col :span="4">
          <el-button icon="el-hg-icon-add">新增</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-add"&gt;新增&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-edit">修改</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-edit"&gt;修改&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-delete">删除</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-delete"&gt;删除&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-detail">详情</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-detail"&gt;详情&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-query">查询</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-query"&gt;查询&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-stat">统计</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-stat"&gt;统计&lt;/el-button&gt;
          </p>
        </el-col>
      </el-row>
      <el-row class="line" :gutter="20">
        <el-col :span="4">
          <el-button icon="el-hg-icon-save">保存</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-save"&gt;保存&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-refreash">刷新</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-refreash"&gt;刷新&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-audit">审核</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-audit"&gt;审核&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-auditcancle">退审</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-auditcancle"&gt;退审&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-close">关闭</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-close"&gt;关闭&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-upload">上报</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-upload"&gt;上报&lt;/el-button&gt;
          </p>
        </el-col>
      </el-row>
      <el-row class="line" :gutter="20">
        <el-col :span="4">
          <el-button icon="el-hg-icon-uploadfil">导入</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-uploadfil"&gt;导入&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-downloadf">导出</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-downloadf"&gt;导出&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-start">启用</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-start"&gt;启用&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-stop">停用</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-stop"&gt;停用&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-sum">汇总</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-sum"&gt;汇总&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-sumcancle">退回</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-sumcancle"&gt;退回&lt;/el-button&gt;
          </p>
        </el-col>
      </el-row>
      <el-row class="line" :gutter="20">
        <el-col :span="4">
          <el-button icon="el-hg-icon-location">定位</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-location"&gt;定位&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-pre">前进</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-pre"&gt;前进&lt;/el-button&gt;
          </p>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-hg-icon-back">后退</el-button>
          <p class="code">
            &lt;el-button icon="el-hg-icon-back"&gt;后退&lt;/el-button&gt;
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bueessiness'
};
</script>

<style scoped>

</style>
