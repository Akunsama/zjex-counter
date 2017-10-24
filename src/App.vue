<template>
	<div id="app">
	
        <com-header></com-header>
       	<router-view></router-view>
        <com-footer></com-footer>
	
	

	</div>
</template>

<script>
	import comHeader from '@/components/Header/Header.vue'
    import comFooter from '@/components/Footer/Footer.vue'
  
      export default {
        //组件名
        name: 'APP',
         data() {
            return {
             maxWidth:1300,
             maxHeight:300,
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {

        },
        methods:{
          firefly:function(){
                  //数据点
                  var fireFlys = [];
                  let fireFlyCount = 5;
                  var flyArr = [];
                  for(let i=0;i<fireFlyCount;i++){
                      flyArr.push(this.fetchFirefly());
                      $(".flyCont").append('<span class="fly"></span>');
                  }
                  fireFlys = flyArr;
                  flyArr.forEach(function (fly, index) {
                      var directionx = Math.random() < 0.5 ? 1 : -1;
                      var directiony = Math.random() < 0.5 ? 1 : -1;

                      setInterval(function () {//防止重复开启定时器
                          fly.posLeft = parseInt(fly.posLeft) + directionx;
                          fly.posTop = parseInt(fly.posTop) + directiony;
                          if (parseInt(fly.posLeft) < 0 || parseInt(fly.posLeft) >1300) {
                              directionx = -1 * directionx;
                          }
                          if (parseInt(fly.posTop) < 0 || parseInt(fly.posTop) > 300) {
                              directiony = -1 * directiony;
                          }
                          fireFlys = flyArr;
                          $(".fly").eq(index).css("top",fly.posTop);
                          $(".fly").eq(index).css("left",fly.posLeft);
                          $(".fly").eq(index).css("width",fly.w);
                          $(".fly").eq(index).css("height",fly.w);
                      },80);
                  });
          },
          fetchFirefly:function(){
              var fly={};
              fly.posLeft = parseInt(Math.random()*this.maxWidth);
              fly.posTop = parseInt(Math.random()*this.maxHeight);
              fly.w = parseInt(Math.random()*6+2);
              return fly;
          },
        },
        mounted(){
          this.firefly();
        },
        watch: {

        },
        //组件
        components: {
            comHeader,
            comFooter,
        }
    }
</script>

<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
