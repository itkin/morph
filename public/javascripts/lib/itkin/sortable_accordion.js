
(function($){
  $.widget('itkin.sortableAccordion',{
    options:{
      stop: false,
      accordion:{},
      sortable:{
        stop: function(e, ui) {
          $(this).data('sortableAccordion').option('stop',true) ;
        }
      }
    },

    _setOption: function(name,value){
      this.options[name] = value;
    },

    _create: function(){

      // Prevent the sortable accodion header to open when dragged
      this.element.find(this.options.accordion.header).bind('click',{ui: this}, function(e) {
        if (e.data.ui.option('stop')) {
          e.stopImmediatePropagation();
          e.preventDefault();
          e.data.ui.option('stop',false);
        }
      });

      this.element
        .ajaxAccordion(this.options.accordion)
        .sortable(this.options.sortable);

    },

    destroy: function(){

      //Unbind the header click
      this.element
        .find(this.options.accordion.header)
        .unbind('click');

      //Destroy the sub widgets
      this.element.accordion('destroy').sortable('destroy');
      
      // call the base destroy function
      $.Widget.prototype.destroy.call(this);

    }
  });
})(jQuery);