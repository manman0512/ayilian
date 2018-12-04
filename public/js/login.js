$(function(){
    function login(){
        let uname=$("#uname").val();
        let upwd=$("#upwd").val();
        if(uname!=""&&upwd!=""){
            $.ajax({
                url:"http://127.0.0.1:3000/user/login",
                data:{uname,upwd},
                type:"post",
                success:function(res){
                    if(res.code==-1){
                        $("#pop").show().children("b").html(res.msg);
                        $("#uname").prop("disabled",true).parent().next().children("input").prop("disabled",true);
                    }else{
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
        $("#uname").prop("disabled",false).parent().next().children("input").prop("disabled",false);
    })
})