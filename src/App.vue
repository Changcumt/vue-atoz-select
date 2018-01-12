<template>
  <div id="app">
    <vue-atoz-select :datalist="datalist" @select="selectItem" class="atoz-select" />
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return {
      datalist:[
        {text:'北京'},
        {text:'上海'},
        {text:'深圳'},
        {text:'广东'},
        {text:'济南'},
        {text:'合肥'},
        {text:'银川'},
        {text:'乌鲁木齐'},
        {text:'苏州'},
        {text:'南京'},
        {text:'徐州'},
        {text:'蚌埠'},
        {text:'聊城'},
        {text:'威海'},
        {text:'拉萨'},
        {text:'西宁'},
        {text:'乌鲁木齐'},
        {text:'南昌'},
      ]
    }
  },
  methods:{
    selectItem(item){
      console.log(item)
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
*,
*:after,
*:before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.atoz-select {
  height: 100%;
}
</style>
