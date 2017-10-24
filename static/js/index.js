$(function(){

    var page = {
        init:function(){
            // debugger;
                 // Init WOW
                // wow = new WOW(
                //     {
                //       boxClass:     'wow',      // default
                //       animateClass: 'animated', // default
                //       offset:       10,          // default
                //       mobile:       true,       // default
                //       live:         true        // default
                //     }
                //   )

                // wow.init();

                page.heardertop()

                // 选择框调用  
                   //  [].slice.call(document.querySelectorAll('.cs-select')).forEach(function(el) {
                   //      new SelectFx(el);
                   // });
               
        },
        menuscroll:function(){
            $(".menu").mCustomScrollbar({
                theme:"dark-3",
                setHeight:240,
                autoDraggerLength:false,
                scrollButtons:{
                    enable:false,
                    scrollType:"continuous",
                    scrollSpeed:800,
                    scrollAmount:40
                }
            });
        },
        heardertop:function(){
                var timeout = null;
                $(window).scroll(function () {
                    $(".header-top").fadeIn()
                    if(timeout != null){
                       window.clearTimeout(timeout);
                       
                    }
                    var $scroll_top = $(this).scrollTop();
                    if ($scroll_top > 600) {
                        $(".header-top").addClass("header_bg").removeClass("header_bg2");
                        timeout = window.setTimeout(function(){
                            $(".header-top").fadeOut()
                        },1000);
                    }else{
                        $(".header-top").removeClass("header_bg").addClass("header_bg2");
                    }
                    //500ms后，假定认为停止滚动
                    
                });
        }
    }

    page.init()
})
  

