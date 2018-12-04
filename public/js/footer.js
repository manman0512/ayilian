$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    //获取header的html片段
     $.ajax({
        url:"footer.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#footer");
        }
    })
})