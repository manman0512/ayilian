$(function(){
    // $.ajax({
        
    // })
    // 设置固定导航栏
    var isToTop=false;
    $(window).scroll(function(){
        var scrollTop=$(this).scrollTop();
        if(scrollTop>150&&!isToTop){
            $("#header  .container").addClass("move");
            $("#header  .container .search input").css("background","#fff");
            isToTop=true;
        }
        if(scrollTop<150&&isToTop){
            $("#header .container").removeClass("move")
            isToTop=false;
        }
    })
    //设置导航中英文切换
    $(".nav>ul>li").on("mouseenter",function(){
        var $tar=$(this);
        $tar.children(":first").children(":first").hide().next().show();
    });
    $(".nav>ul>li").on("mouseleave",function(){
        var $tar=$(this);
        $tar.children(":last").children(":last").hide().prev().show();
    });
})