#echart options 
目前已有bar.js,pie.js

#prop
*echartOption Object {loading:boolean,...{echarts options object}}

*pixelClick
*clickable
*resizeable

#event
*echartclick
*echartpixelclick

#watch


#demo
v-if的情况下需要:key 属性防止vue复用该组件导致异常
<div class="ui-fullBox">

<smart-chart id="depCodeBarContainer" :echart-option="depBar" :pixel-click="true" :resizeable="true" @echartpixelclick="depCodeChartClick" key="depCodeBarContainer"/>
</div>

your component
import BarOption from '@/components/smartChart/bar';//注意复用时需要深拷贝 Utils.deepCopy
data:{
   dateBar: {
      loading: false,//true时，echart 会setOption 该option
      ...BarOption
    }
}

