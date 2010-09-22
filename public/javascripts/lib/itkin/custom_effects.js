(function($){
  $.fn.htmlWithFade= function(html, fade_out_speed,fade_in_speed ){
    var fade_out_speed = fade_out_speed || 'slow';
    var fade_in_speed = fade_in_speed || 'fast';
    return $.each(this, function(){
      $(this).fadeTo(fade_out_speed,0,function(){
        $(this).html(html).fadeTo(fade_in_speed,1)
      });
    })
  }

  $.fn.replaceWithFade=function(html,fade_out_speed,fade_in_speed){
    var fade_out_speed = fade_out_speed || 'slow',
        fade_in_speed = fade_in_speed || 'fast',
        html = html ;
    return $.each(this, function(){
      $wrapper = $(this).wrap('<div class="wrapper"></div>').parent();
      $wrapper.fadeTo(fade_out_speed,0, function(){
        $(this).html(html)
      }).fadeTo(fade_in_speed,1,function(){
        $(this).children().unwrap()
      });
    })
  }
})(jQuery);