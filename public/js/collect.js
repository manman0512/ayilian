$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/products/getCollect",
        data:{uid:1},
        dataType:"json",
        type:"get",
        success:function(result){
             console.log(result);
            var html="";
            
            for(var key in result){
                var {title,img,pid}=result[key];
                html+=`<div class="collect-item">
                <img src="${img}" alt="" data-id=${pid}>
                <p>${title}</p>
                <a href="javascript:;"class="delete">删除</a>
                <a href="javascript:;" class="addCart">加入购物车</a>
            </div>`
            }
            $("#my-collect").html(html);
            $(".collect-item").on("click",function(e){
       
                var $tar=$(e.target);
                console.log($tar);
                if($tar.is("a.delete")){
                    console.log(123);
                    $tar.parent().remove();
                }else if($tar.is("a.addCart")){
                    window.alert(`添加成功`);
                }else if($tar.is("img")){
                    location.href="product_details.html?lid=1"
                }
            })
        }
    })
    
})