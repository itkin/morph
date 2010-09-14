// Ajouter une option ajax_selector, qui identifie des elements
// sur clic
//  - fermer l'accordeon,
//  - lancer la requete ajax
//  - récuperer son le cotnenu html retourné par le serveur et mettre a jour l'accordeon
//  - rouvrir l'accordeon a la position voulue

(function($){
  var options ;
  options = $.extend({}, $.ui.accordion.prototype.options, {
      ajaxSelectors: null
  });
  var AjaxAccordion = $.extend({}, $.ui.accordion.prototype, {
    options: options,
    _enableAjax: function(){
      var self = this;
      if (this.options.ajaxSelectors.length){
        $.each(this.options.ajaxSelectors, function(){
          self._bindAjax(this[0],this[1])
        })
      }
    },
    _bindAjax: function(selector, eventType){
      var self = this;
      //On utilise livequery pour binder l'element final lui meme
      this.element.find(selector).livequery(
        function(){
          $(this)
            .bind(eventType,function(e){
              e.stopImmediatePropagation();
              e.preventDefault();
              var $elt = $(this);
              self.element
                .queue(function(){
                  $(this).ajaxAccordion('activate',-1);
                  $(this).dequeue();
                })
                .delay(200)
                .queue(function(){
                  if($elt.attr('data-remote')){
                    $elt.callRemote();
                  }
                  $(this).dequeue();
                });
            });
        }
      );
      self.element.delegate('.ajaxAccordion-tab', 'ajax:complete', function(){
        self.activate($(this).index());
      });
    },
    _create: function(){
      this.element.children().addClass('ajaxAccordion-tab');
      this._enableAjax();
      $.ui.accordion.prototype._create.call(this);

    },
    destroy: function(){
      this.element.children().removeClass('ajaxAccordion-tab');
      this._disableAjax();
    }

  });
  $.widget('itkin.ajaxAccordion', AjaxAccordion);
})(jQuery)