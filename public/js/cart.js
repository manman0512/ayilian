$(function(){
    var uid=sessionStorage.getItem("uid");
    $.ajax({
        url:"http://127.0.0.1:3000/products/getCarts",
        dataType:"json",
        data:{uid},
        type:"get",
        success:function(result){
            // console.log(result);
            var html=""
            for(p of result.data){
                html+=`<div class="cart-item">
                <ul class="clear">
                    <li>
                        <input type="checkbox">
                            <a href="product_details.html?pid=${p.pid}">
                            <img src="${p.img}" alt=""></a>
                            <a href="product_details.html?pid=${p.pid}" title="${p.title}">${p.title}</a>
                    </li>
                    <li>${p.color}|${p.size}</li>
                    <li>¥${p.price.toFixed(2)}</li>
                    <li><button>-</button><span>${p.count}</span><button>+</button></li>
                    <li><span>${(p.count*p.price).toFixed(2)}</span></li>
                    <li><span>删除</span></li>
                </ul>
            </div>`
            }
            $("#cart").children(":first").after(html);
            $("#cart .cart-item ul").on("click","li:last>span",function(e){
                 console.log(e.target);
                //  console.log(this);
                var $tar=$(this)
            var html=$(this).parent().parent().children(":first").children(":last").html();
            console.log(html);
                var canRemove=false;
                $("#confirm").show().children("span").html(`您确认要删除 ${html} 吗？`).parent().next().show().prev().on("click","a",function(e){
                    e.preventDefault();
                    var $a=$(e.target);
                    console.log($a);
                    // $a.parent().children("span").html(html);
                    if($a.html()=="确定"){
                        $tar.parent().parent().parent().remove();
                    }
                    $a.parent().hide().next().hide();
                   
                });
                
            })
        }
    })
})