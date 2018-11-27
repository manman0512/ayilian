$(function(){



  // function task(){
  //   var $tar=$("#carousel img.show");
  //   if($tar.parent().next().is(".carousel-item")){
  //      $tar.removeClass("show").parent().next().children(":first-child").addClass("show");
  //   }else{
  //     $tar.removeClass("show").parent().parent().children(":first-child").children(":first-child").addClass("show");
  //   }
    
  //  }
  // var timer=setInterval(task,5000);
  // $(".carousel-item").hover(
  //   function(){clearInterval(timer)},
  //   function(){setInterval(task,5000)}
  // )
  task();
  function task(){
    var $tar=$("#carousel img.show");
    if($tar.parent().next().is(".carousel-item")){
       $tar.removeClass("show").parent().next().children(":first-child").addClass("show");
    }else{
      $tar.removeClass("show").parent().parent().children(":first-child").children(":first-child").addClass("show");
    }
    $("#carousel .mask").animate({
      width:1150,
    },2250).animate({
      width:0
    },2250)
  }
  var timer=setInterval(task,5500);
  $("#carousel").hover(
      function(){clearInterval(timer);$("#carousel .mask").stop(true)},
      function(){task();timer=setInterval(task,5500)}
  )

})