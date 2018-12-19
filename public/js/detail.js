$(function(){
    var pid=location.search.slice(5);
    $.ajax({
        url:"http://127.0.0.1:3000/details",
        type:"get",
        data:{pid},
        dataType:"json",
        success:function(res){
             console.log(res);
            /**********商品名字和服务承诺******* */
            var {product, specs, pics,model,recomment}=res;
            var {title,price,promise,sold_count,stock}=product;
            $("#name>:first-child").html(title);
            $("#right-content>.p-price>:first-child>span").html(`￥${price.toFixed(2)}`).parent().next().html(`服务承诺：${promise}`); 
            /*******规格size*********************/    
            var html1="";
            var color="";
            for(var p of specs){
            var html2=[];
            html1+=`<a class="${pid==p.pid?'active':''}" href="product_details.html?pid=${p.pid}">${p.color}</a>`
            var size=p.size.split("|")
            for(var s of size){
                html2+=`<a href="javascript:;">${s}</a>`
            }
            }
            var $colDiv=$("#right-content").children(":nth-child(3)").append(html1);
            $colDiv.next().append(html2);
            /*****选中状态***********************/
            $(".size>a").on("click",function(){
                $(this).addClass("selected").siblings().removeClass("selected");
            });
            /*********库存量********************/
            var html=`<span>月销售量：<i>${sold_count}</i></span>
            <span>库存量：<i>${stock}</i></span>`;
            $("#right-content .num").append(html);
            /************数量增减************* **/
            $("#right-content .num").on("click","button",function(e){
                var $btn=$(e.target);
                var val=$btn.siblings("input").val();
                if($btn.html()=="-"&&val>1){
                    $btn.next().val(--val)
                }else if($btn.html()=="+"&&val<stock){
                    $btn.prev().val(++val)
                }
            })
            
            /***********图片加载*****************/
            var html="";
            for(var p of pics){
            var {sm,md,lg}=p;
            html+=`<li>
                <img src="${sm}" data-md="${md}" data-lg="${lg}">
            </li>`;
            }
            var $ul=$("#slide-img>.img-outer>ul").html(html);
            $ul.css("width",`${pics.length*60}px`);
            // console.log(pics.length*60);

            /************左右按钮****************/
            var leftBtn=$ul.parent().prev();
            var rightBtn=$ul.parent().next();
            leftBtn.addClass("disabled");
            if(pics.length<=6) {
                rightBtn.addClass("disabled");
            }
            var moved=0;
            leftBtn.on("click",function(e){
            e.preventDefault();
            var $btn=$(this);
            if(!$btn.hasClass("disabled")){
                moved--;
                $ul.css("margin-left",`-${moved*60}px`);
                rightBtn.removeClass("disabled")          
                if(moved==0){
                $btn.addClass("disabled");
                }
            }
            })
            rightBtn.on("click",function(e){
                e.preventDefault();
            var $btn=$(this);
            if(!$btn.hasClass("disabled")){
                moved++;
                $ul.css("margin-left",`-${moved*60}px`);
                leftBtn.removeClass("disabled");
                if(pics.length-6==moved)
                $btn.addClass("disabled");
            }
            })
            /*******初始化中图片********/
            var $mImg=$(".md-img>img").prop("src",[`${product.img}`]);
            // var lgDiv=document.getElementById("div-lg");
            var $lImg=$("#lg-img").css("background-image",`url(${product.img})`);
            // console.log(lImg);

            /**********小图片，中图片，大图片同步************/
            $ul.on("mouseenter","li>img",function(e){
                var $img=$(e.target);
                // console.log($img);
                //<img src=sm data-md=md data-lg=lg
                $img.parent().css({
                "border":"1px solid red",
                
                }).siblings().css("border","0")
                $mImg.prop("src",`${$img.data("md")}`);
                $lImg.css("background-image",`url(${$img.data("lg")})`);
            })

            /**********遮罩层--为了防止反复触发，用sMask保护************/
            var $sMask=$("#superMask").hover(
                function(){
                    $(this).parent().next().show();
                    $(this).prev().show();
                },
                function(){
                    $(this).parent().next().hide();
                    $(this).prev().hide();
                }
            );
            var msize=200;
            $sMask.on("mousemove",function(e){
            var left=e.offsetX-msize/2;
            var top=e.offsetY-msize/2;
            //防止mask超出lgDiv范围！
                /***防止左边出边界 */
                if(left<0){
                    left=0; 
                } 
                if(left>200){
                    left=200;
                }
                $(this).prev().css("left",`${left}px`);
                /****防止右边出边界 */
                if(top<0){
                    top=0; 
                }
                if(top>200){
                    top=200;
                }
                $(this).prev().css("top",`${top}px`);
                
                //大图片的背景位置变化
            $lImg.css("background-position",`-${2*left}px -${2*top}px`)
                
            })
        
            /*************模特*********** */
            var html="";
            for(var m of model){
            html+=`
                <img src="${m.img_url}" id="${m.id}">
            `;
            }
            $("#product-details").html(html);
            /***返回顶部 */
            $(window).on("scroll",function(){
                var scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;
                if(scrollTop>=500){
                    $("#totop").show();
                }else{
                    $("#totop").hide();
                }
            })
            $("#totop").on("click",function(){
                window.scrollTo(0,0);
            })

            // $("#addCart").on("click",function(){
            //     $.ajax({
            //         url:"http://127.0.0.1:3000/products/addCart"
            //     })
            // })
            
            /*********加入购物车***************/
            $("#addCart").on("click",function(e){
                var scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;
                if(scrollTop>0)window.scrollTo(0,0);
                e.preventDefault();
                var uid=sessionStorage.getItem("uid");
                if(!uid){
                    // window.alert("请登录");
                    toast("请登录",false);
                    return;
                }
                var pid=product.pid;
                var size=$(".spec.size").children("a.selected").html();
                var count=$(".num").children("input").val();
                // console.log(uid);
                // console.log(pid);
                // console.log(size);
                // console.log(count);
                if(size){
                    $.ajax({
                        url:"http://127.0.0.1:3000/products/addCart",
                        data:{uid,pid,count,size},
                        type:"get",
                        success:function(result){
                            // console.log(result);
                            if(result.code==1){
                                // window.alert(`${result.msg}`);
                                toast(result.msg,false);
                                /*
                                $("#pop").removeClass("hide").addClass("show").children("p").html(`${result.msg}`).parent().next().show();
                                //禁止滚轮滚动
                                window.onmousewheel=document.onmousewheel=function(){
                                    return false;
                                }*/
                            }else{
                                window.alert(`网络故障，请检查`);
                            }
                        }
                    })
                }else{
                    /*$("#pop").removeClass("hide").addClass("show").children("p").html(`请选择尺寸`).parent().next().show();
                    window.onmousewheel=document.onmousewheel=function(){
                        return false;
                    }*/
                    toast("请选择尺寸",false);
                }
                
            })
            /*********添加收藏夹*********/
            $("#addCollect").on("click",function(e){
                var scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;
                if(scrollTop>0)window.scrollTo(0,0);
                e.preventDefault();
                var uid=sessionStorage.getItem("uid");
                if(!uid){
                    // window.alert("请登录");
                    toast("请登录",false);
                    return;
                }else{
                    var pid=product.pid;
                    $.ajax({
                        url:"http://127.0.0.1:3000/products/addCollect",
                        data:{uid,pid},
                        type:"get",
                        success:function(result){
                            // console.log(result);
                            toast(result.msg,false);       
                        }
                    })
                }
                
            })
            
            /****商品推荐***/
            var html=`<div id="caroudel-item1" style="float: left;">`;
            for(item of recomment.slice(0,3)){
                html+=`
                <div class="item1 lf">
                    <a class="img-item" href="product_details.html?pid=${item.pid}">
                        <img src="${item.img}" alt="">
                        <p>${item.title}</p>
                    </a>
                </div>`
            }
            html+=`</div><div id="caroudel-item2" style="float: left;">`
            for(item of recomment.slice(3)){
                html+=`
                <div class="item2 lf">
                    <a class="img-item" href="product_details.html?pid=${item.pid}">
                        <img src="${item.img}" alt="">
                        <p>${item.title}</p>
                    </a>
                </div>`
            }
            html+=`</div>`
            $("#in-carsel").html(html);
            /***商品推荐 */
            var speed = 20;
            var tab = document.getElementById("carousel");
            var tab1 = document.getElementById("caroudel-item1");
            var tab2 = document.getElementById("caroudel-item2");
            console.log(tab.offsetWidth);
            function task() {
                if (tab2.offsetWidth - tab.scrollLeft <= 0)
                    tab.scrollLeft -= tab1.offsetWidth
                else {
                    tab.scrollLeft++;
                }
            }
            var timer= setInterval(task, speed);
            tab.onmouseover = function () {
                clearInterval(timer);
            };
            tab.onmouseout = function () {
                timer=setInterval(task, speed)
            };
        }
        
    })
  
})
