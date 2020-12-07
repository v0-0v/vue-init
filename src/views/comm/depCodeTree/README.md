#机构组织树

#参数：depCode  depCodes
*depCode 机构代码
*depCodes Array Cascader 级联选择器 selected的数组值


#demo
<dep-code-tree :dep-code="ruleForm.gxdwdm" v-model="ruleForm.depCodes"/>