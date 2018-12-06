$(function(){
  
  $.ajax({
    url:"http://127.0.0.1:3000/index",
    dataType:"json",
    type:"get",
    success:function(output){
      // console.log(output);
      var{carousel,pics,foot_nav}=output;

      //首页轮播
      var html="";
      for(var item of carousel){
        // console.log(item.img);
        html+=`<a class="carousel-item" href="${item.href}">
              <img src="${item.img}" alt="${item.title}">
              </a>`
      }
      html=html+'<div class="mask"></div> ';
      $("#carousel").html(html).children(":first").addClass("active").children().addClass("show");
      task();
      var html="";

      //底部图片
      for(var pic of pics){
        // console.log(item.img);
        html+=`<div class="desc">
        <a href="${pic.href}"><img src="${pic.pic}" alt="${pic.title}"></a>
        </div>`
      }
      $("#product").html(html);

      //底部导航
      var html="<ul>";
      for(var item of foot_nav.slice(0,6)){
       html+=`<li>
        <a href="${item.href}"><span>${item.e_title}</span>${item.c_title}</a>
        </li>`
      }
      html+="</ul><ul>"
      // $("#foot").html(html);
      for(var item of foot_nav.slice(6,10)){
       html+=`<li>
        <a href="${item.href}"><span>${item.e_title}</span>${item.c_title}</a>
        </li>`
      }
      html+="</ul><ul>"
      for(var item of foot_nav.slice(10)){
        html+=`<li>
         <a href="${item.href}"><span>${item.e_title}</span>${item.c_title}</a>
         </li>`
       }
      html+=`</ul><ul>
      <li>
          <img src="img/index/sub_logo.gif" alt="">
      </li>
    </ul> `;
      $("#foot").html(html);
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
    }
  })

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
  

})