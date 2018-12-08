$(function(){
    var pid=location.search.slice(5);
    $.ajax({
      url:"http://127.0.0.1:3000/details",
      type:"get",
      data:{pid},
      dataType:"json",
      success:function(res){
        // console.log(res);
        /**********商品名字和服务承诺******* */
        var {product, specs, pics}=res;
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
            if(left<0){
                left=0; 
            }else if(left>200){
                left=200;
            }else{
                $(this).prev().css("left",`${left}px`);
            }

            if(top<0){
                top=0; 
            }else if(top>200){
                top=200;
            }else{
                $(this).prev().css("top",`${top}px`);
            }
            //大图片的背景位置变化
          $lImg.css("background-position",`-${2*left}px -${2*top}px`)
            
        })
        }
    })
  
})
