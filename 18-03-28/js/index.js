$(function(){
    $('#fullpage').fullpage({
      'css3': true,
      'loopHorizontal':false,
      onLeave: function(index, direction){
        switch (direction) {
          case 'down':
            if(index == 1){
              setTimeout(function(){
                $('.section2-box img').attr('src','images/1.gif');
              },800);
            }else if(index == 3){
              setTimeout(function(){
                $('.section4-box img').attr('src','images/2.gif');
              },800);
            }else {
              setTimeout(function(){
                $('.section2-box img').attr('src','');
                $('.section4-box img').attr('src','');
              },500);
            }
            break;
          case 'up':
            if(index == 3){
              setTimeout(function(){
                $('.section2-box img').attr('src','images/1.gif');
              },800);
            }else if(index == 5){
              setTimeout(function(){
                $('.section4-box img').attr('src','images/2.gif');
              },800);
            }else {
              setTimeout(function(){
                $('.section2-box img').attr('src','');
                $('.section4-box img').attr('src','');
              },500);
            }
            break;
          default:
        }
      }
    });
})
