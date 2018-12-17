/****封装提示方法******/
function toast(msg,bool){
    if(bool==false){
        $("#pop").removeClass("hide").addClass("show").children("p").html(msg).parent().next().show();
        //禁止滚轮滚动
        window.onmousewheel=document.onmousewheel=function(){
            return false;
        }
    
    }else{
        $("#pop").removeClass("show").addClass("hide").next().hide();
        window.onmousewheel=document.onmousewheel=function(){
            return true;
        }
    }
    
    /****取消提示框********************/
    $("#pop").on("click","a",function(){
        toast("",true)
    })
}