(function($){
  $.fn.htmlWithFade= function(html, fade_out_speed,fade_in_speed ){
    var fade_out_speed = fade_out_speed || 'slow';
    var fade_in_speed = fade_in_speed || 'fast';
    return $.each(this, function(){
      $(this).fadeOut(fade_out_speed,function(){
        $(this).html(html).fadeIn(fade_in_speed)
      });
    })
  }

  $.fn.replaceWithFade=function(html,fade_out_speed,fade_in_speed){
    var fade_out_speed = fade_out_speed || 'slow',
        fade_in_speed = fade_in_speed || 'fast',
        html = html ;
    return $.each(this, function(){
      $wrapper = $(this).wrap('<div class="wrapper"></div>').parent();
      $wrapper.fadeOut(fade_out_speed, function(){
        $(this).html(html)
      }).fadeIn(fade_in_speed,function(){
        $(this).children().unwrap()
      });
    })
  }
})(jQuery);