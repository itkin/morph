// Enable unobstrusive ajax multipart posting via Iframes
// Need livequery to be pre-loaded,
// find it at : http://github.com/downloads/brandonaaron/livequery/jquery.livequery-1.1.1.zip


var ajaxMulitipartForm = {

  setup: function(before_submit){
    $("form[data-remote=true][enctype=multipart\/form-data]")
      .livequery(
        function(){
          ajaxMulitipartForm.addIframe(this);
          $(this).bind('submit', function(e){
            $(this).trigger('ajax-multipart:submit');
            return true
          });
          if (before_submit){
            $(this).bind('ajax-multipart:submit',before_submit)
          }
        },
        function(){
          ajaxMulitipartForm.removeIframe(this);
        }
      );
  },

  randomInteger: function(n){
    var n = n || Math.pow(10,5) ;
    return Math.floor(Math.random()*n)
  },

  addIframe: function(elt){
    $(elt)
      .attr('target', function(){
        return this.id + "_iframe_" + ajaxMulitipartForm.randomInteger()
      })
      .removeAttr('data-remote')
      .append(function(){
        return $("<iframe></iframe>").attr({id: this.id + '_iframe', name: this.target, width:0, height:0})
      });
  },

  removeIframe: function(elt){
    $(elt.id + "_iframe").remove()
  }
}