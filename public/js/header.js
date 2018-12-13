$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    //获取header的html片段
     $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#header");
            var email=sessionStorage.getItem("email");
            if(email){
                if(email){
                    var $html=$(`<span title="${email}">欢迎<b>${email}</b></span><a href="index.html" class="signout">注销</a>`);
                    // $("#about-me").children(":first").remove();
                    $html.replaceAll("#about-me>a:lt(1)");
                }
            }
            $(".signout").on("click",function(e){
                e.preventDefault();
                sessionStorage.removeItem("email");
                $("#about-me").html(`<a href="login.html">登录</a>
                <a href="register.html">注册</a>
                <a href="cart.html">我的购物车</a>
                <a href="#">我的订单</a>`);
            })
            
            // $.ajax({
            //     url:"http://127.0.0.1:3000/user/islogin",
            //     type:"get",
            //     success:function(result){
            //         console.log(result);
            //         if(result.email){
            //             var $html=$(`<span>欢迎${result.email}</span><a href="index.html">注销</a>`)
            //         $html.replaceAll("#about-me>a:lt(2)");
            //         }
                    
            //     }
            // })
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