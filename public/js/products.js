$(function(){
    if(location.search.indexOf("kwords")!=-1){
        var kwords=location.search.split("=")[1];
    }
    var pno=0;    
        $.ajax({
            url:"http://127.0.0.1:3000/products",
            data:{kwords,pno},
            dataType:"json",
            type:"get",
            success: function(output) {
                if(output.code==404){
                    $("head").append(`<link rel="stylesheet" href="css/404.css">`);
                    var html="";
                    html+=`<div id="product-404">
                    <img src="img/404/404.png" alt="">
                    <h2>${output.msg}</h2>
                </div> `;
                    $("#products").html(html);
                }else{
                    var {products}=output;
                    var html="";
                    for(var p of products){
                        var {pid,img,price,title,sold_count}=p;
                        html+=`<div class="desc">
                        <a href="product_details.html?pid=${pid}">
                            <img src="${img}" alt="">
                        </a>    
                        <div class="details">
                            <p>¥${price}</p>
                            <p>销量：${sold_count}</p>
                        </div></div>`;
                        $("#products").html(html);
                    }
                }
            }
        })   
  })
    
