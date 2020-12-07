#组件使用demo
<custom-form ref="ref" :rule-form.sync="formData" :rules="rules" :list="list" :dialog-type="dialogType"></custom-form>

#form validate
let child = this.$refs['ref'].$refs['ruleForm'];
child.validate(valid => {
if (valid) {
    console.warn('submit!');
    this.save(this.formData);
}
else {
    console.warn('error submit!!');
    return false;
}
});

#props
formData: {
    name: '',
    methodName: '',
    discription: ''
},
rules: {
    name: [{ required: true, message: '请输入算法名称', trigger: 'blur' }],
    methodName: [{ required: true, message: '请输入算法', trigger: 'blur' }]
    // discription: [{ required: true, message: '请输入算法说明', trigger: 'blur' }]
},
list: [
    {
        label: '算法名称',
        prop: 'name',
        type: '',   
        attrsObj: {
        }        
    },
    {
        label: '算法',
        prop: 'methodName',
        type: 'component',
        componentName: 'base-calculations',
        attrsObj: {
        }        
    },
    {
        label: '算法说明',
        prop: 'discription',
        type: 'textarea',
        attrsObj: {
        }      
    }
]
