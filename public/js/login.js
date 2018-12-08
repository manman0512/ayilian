$(function(){
    function login(){
        let account=$("#account").val();
        let upwd=$("#upwd").val();
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