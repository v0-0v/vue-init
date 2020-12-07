#dateFormat 时间格式化过滤器 
* 分隔符自定义


#使用过滤器模式的时候 

* 接受1个个参数：datePipe = (value = new Date(), format = 'YYYY-MM-DD HH:mm:ss')
    * format 类型string 默认为YYYY-MM-DD HH:mm:ss
    * demo {{value | date}} {{value | date('YYYY')}}
   
#使用其JavaScript函数模式的时候， 使用inject:['$datePipe']方式引入
* 接受2个个参数：datePipe = (value = new Date(), format = 'YYYY-MM-DD HH:mm:ss')
    * value 类型 number | string | Date
    * format: 类型string
    * demo this.$datePipe(value) this.$datePipe(value,'YYYY')

#format参数 
    YYYY 年份四位，如2019
    YY   年份两位，如19
    MM   月份两位  补零
    M    月份      不补零
    DD   日期两位  补零
    D    日期      不补零
    HH   24小时    补零
    H    24小时    不补零 
    hh   12小时    补零
    h    12小时    不补零
    mm   分钟      补零
    m    分钟      不补零
    ss   秒        补零
    s    秒        不补零
    SSS  毫秒      补零（3位）
    SS   毫秒      补零（2位）
    S    毫秒      不补零
    A    AM,PM     大写
    a    am,pm     小写


