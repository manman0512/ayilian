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
                    <li>¥${p.price.toFixed(2)}</li>
                    <li><button>-</button><span>${p.count}</span><button>+</button></li>
                    <li><span>${(p.count*p.price).toFixed(2)}</span></li>
                    <li><span>删除</span></li>
                </ul>
            </div>`
            }
            $("#cart").children(":first").after(html);
        }
    })
})