// $(function(){
    
// })
//由于footer是动态加载到页面的底部，因此需要整个页面加载完（包括图片的加载）之后获取页面内容的高度，
$(window).bind("load",function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    //获取header的html片段
     $.ajax({
        url:"footer.html",
        type:"get",
        success:function(res){
            // $(res).replaceAll("#footer");
            $(res).appendTo("#footer")
            
            var footerHeight=0,footerTop=0;
            $footer=$("#footer");
            positionFooter();
            function positionFooter(){
                //取到footer本身的高度
                footerHeight=$footer.height();
                //footer距离屏幕顶部的距离
                footerTop=($(window).scrollTop()+$(window).height()-footerHeight)+"px";
                // console.log(footerHeight);
                // console.log(footerTop);
                //如果页面内容的高度小于屏幕的高度，footer将绝对定位到屏幕底部，否则保留正常的定位
                if(($(document.body).height()+footerHeight)<$(window).height()){
                    $footer.css({position:"absolute",top:footerTop})
                    //  .stop().animate({
                    //     
                    //  })
                }else{
                    $footer.css({
                        position:"static"
                    })
                }
            }
            $(window).scroll(positionFooter).resize(positionFooter);
        }
    })
   
})