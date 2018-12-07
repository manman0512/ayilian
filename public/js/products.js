$(function(){
    if(location.search.indexOf("kwords")!=-1){
    var kwords=location.search.split("=")[1];
    $(".search input").val(kwords);
    }
    var pno=0;
})