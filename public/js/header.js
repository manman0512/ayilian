$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    //获取header的html片段
     $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#header");
            var $btn=$(".search img").on("click",function(){
				var $tar=$(this);
				var kwords=$tar.parent().prev().val();
				if(kwords.trim()!==""){
					location.href=`products.html?kwords=${kwords}`;
				}else{
                    location.href=`products.html`;
                }
            }).parent().prev().keyup(function(e){
				if(e.keyCode==13){
                $(this).next().children().click();
				}
			})
			//取地址栏中的参数
			if(location.search.indexOf("kwords")!=-1){
				$(".search input").val(decodeURIComponent(location.search.split("=")[1]));
			 }
            //设置导航中英文切换
            $(".nav>ul>li").on("mouseenter",function(){
                var $tar=$(this);
                $tar.children(":first").children(":first").hide().next().show();
            });
            $(".nav>ul>li").on("mouseleave",function(){
                var $tar=$(this);
                $tar.children(":first").children("span").hide().prev().show();
            });
            //设置导航中的下拉菜单
            $("[data-toggle=dropdown]").on("mouseenter",function(){
                var $tar=$(this);
                $tar.children("ul").show();
            });
            $("[data-toggle=dropdown]").on("mouseleave",function(){
                var $tar=$(this);
                $tar.children("ul").hide();
            });
                
            
        }
     })
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
       
})