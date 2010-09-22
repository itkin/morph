(function($){
  var options ;
  options = $.extend({}, $.ui.accordion.prototype.options, {
    collapsible: true,
    active: false,
    autoHeight: false,
    ajaxSelectors: [['form', 'submit'],['.actions a, .buttons a', 'click']]
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
      this.element.find(selector).livequery(function(){
        var $elt = $(this);
        var $accordion_tab = $elt.closest('.ajax-accordion-tab');
        $elt.attr('data-type',"html");
        if ($elt.attr('data-method') == 'delete'){
          $elt.bind('ajax:success',function(){
            $accordion_tab.fadeOut('slow');
          })
        }
        else if ($elt[0].nodeName == 'FORM'){
          $elt.bind('ajax:complete', function(status, xhr){
            var $data = $($.httpData(xhr,'html'));
            if (xhr.status == 200){
              $accordion_tab.find('.header-content').html($data.children().first().html());
              $accordion_tab.children().last().html($data.children().last().html());
              self.activate($accordion_tab.index());
            } else{
              $accordion_tab.children().last().html($data);
              self.activate($accordion_tab.index());
            }
          });
        }
        else{
          $elt.bind('ajax:success', function(data, status, xhr){
            $accordion_tab.children().last().html(status);
            self.activate($accordion_tab.index());
          });
        }
        $elt.bind(eventType,
          function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            self.element
              .queue(function(){
                $(this).ajaxAccordion('activate',-1);
                $(this).dequeue();
              })
              .delay(200)
              .queue(function(){
                $elt.callRemote();
                $(this).dequeue();
              });
          }
        );
      });
    },
    _create: function(){
      this.element.children().addClass('ajax-accordion-tab');
      this.element.find(this.options.header).wrapInner('<a class="header-content"></a>');
      this._enableAjax();
      $.ui.accordion.prototype._create.call(this);


    },
    destroy: function(){
      this.element.children().removeClass('ajax-accordion-tab');
      this._disableAjax();
    }

  });
  $.widget('itkin.ajaxAccordion', AjaxAccordion);
})(jQuery)