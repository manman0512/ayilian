$(function(){
    var fid=location.search.slice(-1);
     $.ajax({
        url:"http://127.0.0.1:3000/products/lookbook",
        data:{fid},
        dataType:"json",
        type:"get",
        success:function(output){
            // console.log(output);
            var html="";
            for(var item of output){
                html+=`<a href="javascript:;">
                <img src="${item.img_url}" alt="">
                <div class="details">
                    <p>¥${item.price}</p>
                    <p>销量：${item.sold_count}</p>
                    <span>查看详情</span>
                </div>
            </a>`
            }
            $("#lb-cool").html(html);
            $("#pop").hide();
            $("#lb-cool").on("click","a",function(e){
                e.preventDefault();
                var img=$(this).children("img").attr("src");
                $("#pop>img").prop("src",`${img}`).parent().show().next().show();;
            });
            $("#pop>span").on("click",function(){
                $(this).parent().hide().next().hide();
            })
        }
     })
    
})