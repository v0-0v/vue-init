# storage提供三种储存方式

storage提供三种储存方式：cookie，localStorage，sessionStorage  
使用方式引入index.js文件事例：
```javascript
import { storageMode } from '../storage';

const storage = storageMode({ storageType: 'sessionStorage', date: 0 });
```
* 接受两个参数：
    * storageType： 类型string储存方式默认为localStorage
    * date: 类型number储存时间，需要储存时长，时长为毫秒，默认为604800000毫秒即7天时间
    
******

* storage继承三种方式
    * storage.$set({key, parameter, date, reflush, url})
        * key: string所需保存对象的key
        * parameter: string or object 所需保存的内容
        * date: number 保存时间，默认为创建事例时所创建的date，当有该参数时会已最新指作为设定时间
        * reflush: Boolean默认为false，内部判断是否已有存在缓存，如果为false时返回之前所储存的内容，为true时，就算有之前所储存也会进行重新储存更新内部值
    * storage.$get({key})
        * key: string所取值的键
    * storage.$remove({key})
        * key: string所需删除value的键

----

# 用户信息的获取

1. 用户所有信息存入vuex--State--userInfor;
   * 调取Getters里的userInfor方法即可获取用户信息。

2. 用户token单独存入localstorage;
   * 调取this.$utils.setToken()全局方法即可获取。
