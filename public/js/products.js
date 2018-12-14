$(function(){
    if(location.search.indexOf("kwords")!=-1){
        var kwords=location.search.split("=")[1];
    }
    var pno=0;  
    function loadpage(no){
        pno=no;
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
                    <h2>${output.msg}...<span>5s后离开本页</span></h2>
                </div> `;
                    $("#products").parent().html("").html(html);
                    var second=parseInt($("#product-404>h2>span").html());
                    
                    var timer=setInterval(function(){
                        if(second>1){second--;
                            $("#product-404>h2>span").html(`${second}s后离开本页`)
                        }else{
                            clearInterval(timer);timer=null;
                            location.href="products.html"
                        }
                    },1000)
                    
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
                var html=`<li class="${pno==0?'disabled':''}">&lt;&lt;</li>`
                
                for(i=0;i<output.pageCount;i++){
                    html+=`<li class=${pno==i?'active':''}>${i+1}</li>`
                }
                html+=`<li class="${pno==output.pageCount-1?'disabled':''}">&gt;&gt;</li>`
                $(".pagenation").html(html);
            }
        })        
    }
      
    loadpage(pno);  
    $(".pagenation").on("click","li:not(.disabled):not(.active)",function(e){
        var $tar=$(e.target);
        console.log($tar);
        if($tar.html()=="&gt;&gt;"){//>>
            loadpage(pno+1);
        }else if($tar.html()=="&lt;&lt;"){
            loadpage(pno-1);
        }else{
            var val=$tar.html();
            loadpage(val-1);
        }
    })
  })
    
