$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/products/getCollect",
        data:{uid:1},
        dataType:"json",
        type:"get",
        success:function(result){
            console.log(result);
            var html=""; 
            for(var key in result.data){
                var {title,img,pid}=result.data[key];
                html+=`<div class="collect-item">
                <img src="${img}" alt="" data-id=${pid}>
                <p>${title}</p>
                <a href="javascript:;"class="delete">删除</a>
                <a href="javascript:;" class="addCart">加入购物车</a>
            </div>`
            }
            $("#my-collect").html(html);
            $(".collect-item").on("click",function(e){
                var pid=$(this).children("img").data("id")
                var uid=sessionStorage.getItem("uid");
                console.log(this);
                var $tar=$(e.target);
                console.log($tar);
                if($tar.is("a.delete")){
                    console.log(123);
                    $tar.parent().remove();
                    $.ajax({
                        url:"http://127.0.0.1:3000/products/deleteCollect",
                        data:{uid,pid},
                        type:"get",
                        success:function(result){
                            console.log(result);
                        }
                    })
                }else if($tar.is("a.addCart")){
                    location.href=`product_details.html?lid=${pid}`
                }else if($tar.is("img")){
                    location.href=`product_details.html?lid=${pid}`
                }
            })
        }
        
    })
})