# vue-atoz-select

> a plugin for Vue.js, 根据首字母分组的Select插件


## Install

``` bash
# install
npm install vue-atoz-select
```


## Setup

``` javascript
import atoZSelect from 'vue-atoz-select'
Vue.use(atoZSelect)
```


## Use

``` html
<vue-atoz-select :datalist="datalist" @select="selectItem" />
```
``` javascript
datalist:[
  {text:'北京'},
  {text:'上海'},
  ...
]
...
selectItem(item){

}
```