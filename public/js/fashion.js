$(function(){
    var num=2,count=0;imgWidth=580;
    $(".carousel").on("click",function(e){
        e.preventDefault();
        var $tar=$(e.target);
        if($tar.is("a.prev")){
            move(true);
            content(count);
        }
        if($tar.is("a.next")){
            move();
            
        }
        
    })
    function move(flag){
        if(flag){
            if(count==0){
                count=2;
            }else{
                count--; 
            }
            len=-count*imgWidth;
            $(".carousel ul").css("margin-left",len);
        }else{
            if(count==num){
                count=0;
            }else{
               count++; 
            }
            len=-count*imgWidth;
            $(".carousel ul").css("margin-left",len)
        }
        content(count);
    }
    /***返回顶部 */
    $(window).on("scroll",function(){
       
        var scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;
        // console.log(scrollTop);
        if(scrollTop>=500){
            $("#totop").show();
        }else{
            $("#totop").hide();
        }
    })
    $("#totop").on("click",function(){
        window.scrollTo(0,0);
    })
    function content(count){
        console.log(count)
        var html="";
        switch (count){
            case 0:html=`<h2>天堂鸟</h2>
            <img src="img/fashion/news1/20181008063530_94841.jpg" alt="">
            <img src="img/fashion/news1/20181008063934_75113.png" alt="">
            <img src="img/fashion/news1/20181008064005_72028.png" alt="">
            <img src="img/fashion/news1/20181008064043_66296.png" alt="">
            <p>天堂岛</p>
                <p>-</p>
                <p>冬天的苏格兰</p>
                <p>就像脾气恶劣</p>
                <p>行为残暴的卡利契</p>
                <p>但是苏格兰人</p>
                <p>却丝毫没有受影响</p>
                <p>不少与冬天有关的</p>
                <p>苏格兰诗歌都描写</p>
                <p>在冷风呼啸的漫天冬天</p>
                <p>充满了温暖</p>
                <p>.......</p>
            <img src="img/fashion/news1/20181008064057_92589.png" alt="">
            <img src="img/fashion/news1/20181008064117_37748.png" alt="">
            <img src="img/fashion/news1/20181008064127_54923.png" alt="">
            <img src="img/fashion/news1/20181008064137_74898.png" alt="">
        </div>`
            break;
            case 2:html=`<h2>2 0 1 8 夏 季 时 尚 新 品 发 布 会</h2>  <pre>
            /
            
            清
            
            凉
            
            启
            
            程
            
            /
            
            夏日悠长
            
            来一次发现真我的
            
            寻梦之旅
            
            
            66号公路
            
            少女心驰神往的天堂
            
            体验沙漠
            
            奇妙的汽车旅馆
            
            感受塞利格曼
            
            迷人的小镇风情
            
            邂逅卡梅尔
            
            轻轻拂过脸庞的海风
            
            依稀浮现在眼前的
            
            冰淇淋博物馆
            
            少女心
            
            升华后的艺术品
            
            
            清凉又自由
            
            这个夏季
            
            a.yilian

            让你进入寻梦之旅
                        </pre>
            <img src="img/fashion/news3/20180404034103_16330.gif" alt="">
            <pre>
陈列展示 

Shop Display


/

-      夏  日 衣 橱 寻 梦      -




寻梦

在

整个ayilian

夏日的

美丽时尚衣橱
            </pre>
            <img src="img/fashion/news3/20180408031710_82051.jpg" alt="">
            <img src="img/fashion/news3/20180404033533_38896.gif" alt="">
            <pre>
订货会现场 

Ordering Meeting  


/

-       聚焦终端    精营致胜      -


每次的相遇

带来不同的感动

夏季新品的氛围

更让人

珍惜这样相处的机会

感谢有你们
            </pre>
<img src="img/fashion/news3/20180404033706_64750.jpg" alt="">`
            break;
            case 1:html=`<h2> ayilian冬季新品发布暨订货会绚烂启幕</h2><img src="img/fashion/news2/20170908072959_32277.jpg" alt="">
            <pre>
        On The Road  
    
       -- 在路上   
    
    
            借一场旅行 ，成全自己的  诗和远方 
    
            总有 那么一个地方 配得上你心底那一个 “走”字
    
            旅行的意义并不在脚下
    
    
            而在于心灵和灵魂
    
            在于一段旅程
    
            遇见 更美好的自己       </pre>
            <h3>Source of inspiration </h3>
            <h4>灵感来源</h4>    
            <img src="img/fashion/news2/20170908073256_99813.jpg" alt="">
            <h3> Product description </h3>
            <h4>商品培训</h4>
            <img src="img/fashion/news2/20170908073308_74173.jpg" alt="">
            <img src="img/fashion/news2/20170908073318_23079.jpg" alt="">
            <h3> show time and backstage </h3>
            <h4>唱版及后台直击</h4> 
            <img src="img/fashion/news2/20170908073330_15479.jpg" alt="">
            <h3> Shop 's new image </h3>
            <h4>店铺新形象</h4>
            <img src="img/fashion/news2/20170908073339_74445.jpg" alt="">
            <img src="img/fashion/news2/20170908073349_82248.jpg" alt="">
            <img src="img/fashion/news2/20170908073358_53873.jpg" alt="">
            <h3> Shop display </h3>
            <h4>店铺陈列</h4>
            <img src="img/fashion/news2/20170908073408_70224.jpg" alt="">
            <img src="img/fashion/news2/20170908073418_17261.jpg" alt="">
            <img src="img/fashion/news2/20170908073427_42335.jpg" alt="">
            <pre>
                /
    
    冬季的极光
    
    滑雪爱好者的乐园
    
    如同着陆地球的飞碟一般的岩石教堂
    
    Havis Amanda铜像
    
    国家美术馆
    
    包括梵高的Street in Auvers在内的
    
    欧洲各国及俄国画家的艺术品
    
    一切的美好
    
    这个冬季
    
    a.yilian
    
    带你进入梦幻之旅
            </pre>`
            break;
            default:html=""
        }
        $(".fashion-content").html(html);    
    }
})