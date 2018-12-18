$(function(){
    var uid=sessionStorage.getItem("uid");
    $.ajax({
        url:"http://127.0.0.1:3000/products/getCarts",
        dataType:"json",
        data:{uid},
        type:"get",
        success:function(result){
             console.log(result);
            if(result.code==1){
            var html=""
            /************购物车条目的加载****************/
            for(p of result.data){
                html+=`<div class="cart-item">
                <ul class="clear">
                    <li>
                        <input type="checkbox">
                        <a href="product_details.html?pid=${p.pid}" data-id=${p.pid}>
                        <img src="${p.img}" alt=""></a>
                        <a href="product_details.html?pid=${p.pid}" title="${p.title}">${p.title}</a>
                    </li>
                    <li>${p.color}|${p.size}</li>
                    <li>¥${p.price.toFixed(2)}</li>
                    <li><button>-</button><span>${p.count}</span><button>+</button></li>
                    <li>¥<span>${(p.count*p.price).toFixed(2)}</span>元</li>
                    <li><span>删除</span></li>
                </ul>
            </div>`
            }
            $("#cart").children(":first").after(html);
             /*******************确认删除提示框************/
            $("#cart .cart-item ul").on("click","li:last>span",function(e){
                console.log(`要删除？`)
                var $tar=$(this);
                console.log($tar);
                var html=$(this).parent().parent().children(":first").children(":last").html();
                // console.log(html);
                $("#confirm").show().children("span").html(`您确认要删除 ${html} 吗？`).parent().next().show().prev().on("click","a",function(e){
                e.preventDefault();
                var $a=$(e.target);
                // console.log($a);
                if($a.html()=="确定"){
                    // if($tar.parent().parent().find("input[type=checkbox]").prop("checked")){
                    //     var yuan=parseFloat($("#yuan").html())-parseFloat($tar.parent().prev().children("span").html());
                    //     console.log(yuan);
                    //     $("#yuan").html(yuan.toFixed(2));
                    // }
                    // console.log(`确定`);
                    var pSum=parseFloat($tar.parent().prev().children("span").html());
                    var count=parseInt($tar.parent().prev().prev().children("span").html());
                    if($tar.parent().parent().children(":first").children("input").prop("checked")){
                        //  console.log(price);
                        var yuan=parseFloat($("#yuan").html())-pSum;
                        $("#yuan").html(yuan.toFixed(2));
                        var count1=parseInt($("#count").html())-count;
                        $("#count").html(count1)
                     }
                    $tar.parent().parent().parent().remove();
                    // location.reload();
                    var uid=sessionStorage.getItem("uid");
                    var pid=$tar.parent().siblings().first().children("[data-id]").data("id");
                    var size=$tar.parent().parent().children(":eq(1)").html().split("|")[1];
                    console.log(size);
                    console.log(pid);
                    $.ajax({
                        url:"http://127.0.0.1:3000/products/deleteCart",
                        data:{uid,pid,size},
                        type:"get",
                        success:function(result){
                            // console.log(result);
                        }
                    })
                }
                $a.parent().hide().next().hide();
                
            });


                
            })
            /**************商品复选框按钮的控制************/
            $(".cart-item input[type=checkbox]").on("click",function(e){
                // console.log($(this));
                var $chk=$(this);
                
                //底部全选的变化
                var uncheck=$(".cart-item input[type=checkbox]:not(:checked)");
                // console.log(typeof(uncheck));
                console.log(uncheck.length==0);
                if(uncheck.length!=0){
                    var $tar=$(".cart-count input[type=checkbox]").prop("checked",false);
                    $tar.next().html(`<span>&nbsp;全选</span>`);
                }else{
                    var $tar=$(".cart-count input[type=checkbox]").prop("checked",true).next().html(`<span>&nbsp;取消全选</span>`);
                    $tar.next().html(`<span>&nbsp;取消全选</span>`);
                }
                //简写
                // $(".cart-count input[type=checkbox]").prop("checked",uncheck.length==0);
                //购物车底下的商品总数和总价要变化
                var count=parseInt($chk.parent().parent().children("li:eq(3)").children("span").html());
                // console.log(count);
                var price=parseFloat($chk.parent().parent().children("li:eq(4)").children("span").html());
                // $("#count").html(count);
                if($chk.prop("checked")){
                    //  console.log(price);
                    var yuan=parseFloat($("#yuan").html())+price;
                    $("#yuan").html(yuan.toFixed(2));
                    var count1=parseInt($("#count").html())+count;
                    $("#count").html(count1)
                }else{
                    // console.log(price);
                    var yuan=parseFloat($("#yuan").html())-price;
                    $("#yuan").html(yuan.toFixed(2));
                    var count1=parseInt($("#count").html())-count;
                    $("#count").html(count1)
                }
                

            })
            /*************全选按钮控制*************** ****/
            $(".cart-count input[type=checkbox]").on("click",function(e){
                var $tar=$(e.target);
                // console.log($tar);
                // if($tar.prop("checked")){
                //     $(".cart-item input[type=checkbox]").prop("checked",true);
                // }else{
                //     $(".cart-item input[type=checkbox]").prop("checked",false);
                // }
                //简化
                
                $(".cart-item input[type=checkbox]").prop("checked",$tar.prop("checked"));

                
                var sumPrice=0;
                var sumCount=0;
                var p=$(".cart-item>ul>li:nth-child(5)>span");
                var c=$(".cart-item>ul>li:nth-child(4)>span");
                if($tar.prop("checked")){
                    for(var i=0;i<p.length;i++){
                        sumPrice+=parseFloat($(p[i]).html());
                        sumCount+=parseInt($(c[i]).html());
                    }
                    $tar.next().html(`<span>&nbsp;取消全选</span>`);
                }else{
                    $tar.next().html(`<span>&nbsp;全选</span>`);
                }
                $("#count").html(sumCount);
                $("#yuan").html(sumPrice.toFixed(2));
                
            });
            /*************控制按钮增减数量**************** */
            $("#cart .cart-item ul>li:nth-child(4)").on("click","button",function(e){
                var $tar=$(e.target);
                console.log($tar);
                var pSum=parseFloat($(".cart-item>ul>li:nth-child(3)").html().slice(1));
                if($tar.html()=="-"&&$tar.next().html()>1){
                    var count=$tar.next().html();
                    $tar.next().html(--count);
                    pSum=parseFloat($tar.parent().prev().html().slice(1))*count;
                    $tar.parent().next().children("span").html(pSum.toFixed(2))
                    // $(".cart-item input[type=checkbox]").click();
                    if($tar.parent().parent().children(":first").children("input").prop("checked")){
                        //  console.log(price);
                        var yuan=parseFloat($("#yuan").html())-pSum/count;
                        $("#yuan").html(yuan.toFixed(2));
                        var count1=parseInt($("#count").html())-1;
                        $("#count").html(count1)
                     }
                }else if($tar.html()=="+"){
                    var count=$tar.prev().html();
                    $tar.prev().html(++count);
                    pSum=parseFloat($tar.parent().prev().html().slice(1))*count;
                    $tar.parent().next().children("span").html(pSum.toFixed(2));
                    if($tar.parent().parent().children(":first").children("input").prop("checked")){
                        //  console.log(price);
                        var yuan=parseFloat($("#yuan").html())+pSum/count;
                        $("#yuan").html(yuan.toFixed(2));
                        var count1=parseInt($("#count").html())+1;
                        $("#count").html(count1)
                     }
                }
                
                
            })

            /*******************底部删除按钮*********************/
            $(".cart-count .delete>a:nth-child(1)").on("click",function(e){
                e.preventDefault();
              
              var pid=[];
             var a=$(".cart-item input:not(:not(:checked))").next();//;
                // console.log($(".cart-item input:not(:not(:checked))"));
               //console.log(a);
              for(var i=0;i<a.length;i++){
                pid.push($(a[i]).data("id"))
            }
            $.ajax({
                url:"http://127.0.0.1:3000/products/deleteCarts",
                data:{uid,pid},
                type:"get",
                success:function(result){
                    // console.log(result);
                }
            })
            console.log(pid);
                $(".cart-item input:not(:not(:checked))").parent().parent().remove();
                location.reload();
            })
























            }else{
                $("#cart").children(":first").after(`<div class="no">${result.msg}</div>`);
            }

        }
    })
})