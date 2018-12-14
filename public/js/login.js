$(function(){
    function login(){
        var account=$("#account").val();
        var  upwd=$("#upwd").val();
        if(account!=""&&upwd!=""){
            $.ajax({
                url:"http://127.0.0.1:3000/user/login",
                data:{account,upwd},
                type:"post",
                success:function(res){
                    if(res.code==-1){
                        $("#pop").show().children("b").html(res.msg);
                        // $("#account").prop("disabled",true).parent().next().children("input").prop("disabled",true);
                        $("#mask").show();
                    }else{
                        let uid=res.uid;
                        sessionStorage.setItem("email",account);
                        sessionStorage.setItem("uid",uid);
                        location.href="index.html"
                        // localStorage.setItem("loginId",data[0].uid);
						// localStorage.setItem("loginName",uname);
						// history.go(-1);
                    }
                }
            })
        }
    }
    $("#btn").on("click",function(){
        login();
    })
    $("#pop>span").on("click",function(){
        $span=$(this);
        $span.parent().hide();
        // $("#account").prop("disabled",false).parent().next().children("input").prop("disabled",false);
        $("#mask").hide();
    })
})