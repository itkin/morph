// on key up make an ajax call and display the results in a container
// display a loader while retrieving the request results

(function($){
  $.widget('itkin.searchBox',{
    options: {
      url: null,
      container: null,
      target: '',
      delay: 1500
    },
    timeout: null,
    loading: 0,
    last_search:'',
    _create: function(){
      var self = this;
      var disabled_key_codes = []
      $.each($.ui.keyCode,function(i,val){
        if ($.inArray(val,[$.ui.keyCode.ESCAPE, $.ui.keyCode.ENTER, $.ui.keyCode.DELETE, $.ui.keyCode.BACKSPACE, $.ui.keyCode.SPACE, $.ui.keyCode.NUMPAD_ENTER]) == -1){
          disabled_key_codes.push(val)
        }
      })
      this.element.bind('keydown',function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if($.inArray(code,disabled_key_codes) == -1){
          this.timeout = setTimeout(function(){self.search()}, self.options.delay)
        }
      })
    },
    search: function(){
      var self = this ;
      if (this.loading < 2 && this.last_search != $.trim(this.element.val()) ){
        ++this.loading;
        this.last_search = $.trim(this.element.val());
        this.options['container'].fadeTo(500,0,function(){
          $(this).load(self.options['url'] + '?' + self.element.serialize() + ' ' + self.options.target, function(){
            --self.loading;
            clearTimeout(self.timeout);
            $(this).fadeTo(500,1)
          });
        })
      }
    }
  })
})(jQuery);