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
    });
    /**验证邮箱* */
    $("#email").on("blur",function(){
        var $val=$(this);
        if(!$val.val()){
            $val.next().html("邮箱不能为空").addClass("fail").removeClass("success");
        }else{
            var bool=vail($val.val(),/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
           if(!bool){
                $val.next().html("邮箱格式不正确").addClass("fail").removeClass("success");
           }else{
            // console.log($val.val());
               check($val.val(),"check_email",$val);
           }
        }
    });
    /***验证密码*** */
    $("#password1").on("blur",function(){
        var $val=$(this);
        if(!$val.val()){
            $val.next().html("密码不能为空").addClass("fail").removeClass("success");
        }else{
            var bool=vail($val.val(),/^\w{6,16}$/);
           if(!bool){
                $val.next().html("密码格式不正确").addClass("fail").removeClass("success");
           }else{
                $val.next().html("").addClass("success").removeClass("fail");
           }
        }
    })
    $("#password2").on("blur",function(){
        var $val=$(this);
        if(!$val.val()){
            $val.next().html("密码不能为空").addClass("fail").removeClass("success");
        }else{
            var bool=$val.val()===$val.parent().prev().children("input").val();
            if(!bool){
                $val.next().html("两次输入的密码不一致").addClass("fail").removeClass("success");
            }else{
                $val.next().html("").addClass("success").removeClass("fail");
            } 
        }
    })
    /*允许提交****/
    if($("span").hasClass("success")){
        console.log(123);
        $("button").on("click",function(){
            
            var email=$("#email").val();
            var upwd=$("#password1").val();
            $.ajax({
                url:"http://127.0.0.1:3000/user/reg",
                type:"post",
                data:{email,upwd},
                success:function(res){
                    if(res.code==1){
                        alert("注册成功");
                    }else{
                        alert("注册失败");
                    }
                }
            })
        })
        
    }
    /*****封装用户账号是否已经存在的方法*********/ 
    function check(account,router,tar){
        $.ajax({
        url:"http://127.0.0.1:3000/user/"+router,
        data:{account:account},
        type:"get",
        success:function(res){
            if(res.code==1){
                tar.next().html("").addClass("success").removeClass("fail");
            }else{
                alert(res.msg);
            }
        }
    });
}
    /****封装验证格式的方法****/ 
    function vail(txt,reg){
        if(reg.test(txt)){
            return true;
        }else{
            return false;
        }
    }
})