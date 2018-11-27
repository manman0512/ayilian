$(function(){





    $("#container .login-title h3").on("click",function(){
        $h3=$(this);
            if($h3.html()=="邮箱注册"){
                $h3.addClass("active").next().removeClass("active");
                $(".right-content .e-mail").removeClass("fade").next().addClass("fade");
            }else if($h3.html()=="手机注册"){
                $h3.addClass("active").prev().removeClass("active");
                $(".right-content .phone").removeClass("fade").prev().addClass("fade");
        }
    })


});