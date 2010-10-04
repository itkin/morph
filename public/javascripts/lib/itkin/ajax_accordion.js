(function($){

  var options ;

  options = $.extend({}, $.ui.accordion.prototype.options, {
    collapsible: true,
    active: false,
    autoHeight: false,
    ajaxSelectors: [['form', 'submit'],['.actions a, .buttons a', 'click']],
    sortable: false,
    sortOptions: {
      placeholder: 'ui-state-highlight',
      forcePlaceholderSize: '50px',
//      connectWith: '.droppable',
      axis: 'y',
      handle: 'h2'
//      opacity: 0.6
    },
    reorderUrl: null,
    perPage: null
  });

  var AjaxAccordion = $.extend({}, $.ui.accordion.prototype, {
    options: options,

    _create: function(){
      var self = this;

      if (this.options.sortable){
        this._enableSorting();
      }

      this.element.children().addClass('ajax-accordion-tab');
      this.element.find(this.options.header).wrapInner('<a class="header-content"></a>');
      this._ajaxify();
      $.ui.accordion.prototype._create.call(this);


    },

    _ajaxify: function(){
      var self = this;

      if (this.options.ajaxSelectors.length){
        $.each(this.options.ajaxSelectors, function(){
          self._bindAjaxEvent(this[0],this[1])
        })
      }
    },


    _bindAjaxEvent: function(selector, eventType){
      var self = this;

      //On utilise livequery pour binder l'element final lui meme
      this.element.find(selector).livequery(function(){

        var $elt = $(this);
        var $accordion_tab = $elt.closest('.ajax-accordion-tab');

        // on rajoute ca pour que rails comprenne que l'on veut du html
        $elt.attr('data-type',"html");


        // On stope la propagation pour éviter l'ouverture de l'item,
        // puis on ferme l'accordeon et on requete en AJAX
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

        // On ecoute les evenements de retour de requete ajax sur nos selecteurs préalablement bindés
        // delete link we remove the tab
        if ($elt.attr('data-method') == 'delete'){
          $elt.bind('ajax:success',function(){
            $accordion_tab.fadeOut('slow', function(){
              $(this).remove();
              self.reset_headers();
            });
          })
        }

//        // If it's a form we update the inner header and the content, then reopen the content
//        else if ($elt[0].nodeName == 'FORM'){
//
//          $elt.bind('ajax:complete', function(status, xhr){
//
//            var $data = $($.httpData(xhr,'html'));
//            if (xhr.status == 200){
//              $accordion_tab.find('.header-content').html($data.children().first().html());
//              $accordion_tab.children().last().html($data.children().last().html());
//              self.activate($accordion_tab.index());
//            } else{
//              $accordion_tab.children().last().html($data);
//              self.activate($accordion_tab.index());
//            }
//          });
//        }

        // If it's a simple link we just update the tab content and open it
        else {
          $elt.bind('ajax:success', function(status,data , xhr){
            $accordion_tab.children().last().html(data);
            self.activate($accordion_tab.index());
          });
        }

      });
    },

    stop: false,

    reset_headers: function(){
      this.headers = this.element.find( this.options.header )
      if(this.element.data('sortable'))
        this.element.data('sortable').refresh() ;
    },

    _completeOption: function(option_name,attr_name){
      return this.options[option_name] ? this.options[option_name] : this.options[option_name]= this.element.attr(attr_name)
    },
    _enableSorting:function(){
      var self = this

      this._completeOption('reorderUrl', 'data-reorder-url')
      this._completeOption('perPage', 'data-per-page')

      // Empeche l'ouverture pendant qu'un item est dragué
      this.element.find('h2')
          .bind('click',{ui: this}, function(e) {
            if (e.data.ui.stop) {
              e.stopImmediatePropagation();
              e.preventDefault();
              e.data.ui.stop = false ;
              self.reset_headers();
            }
          });

      var $pagination_elt = self.element.siblings('.pagination');



      // On créé des boites de dépots en dessus et au dessous de l'accordion en fonction de la pagintation, si présente
      if($pagination_elt.find('.current').prev('a').length){
        var $previous_page = $('<div class="droppable  previous_page"><div>Placer dans la page précedente</div></div>').insertAfter($pagination_elt)
        this._initDroppableContainer($previous_page, 'previous_page')
      }
      if($pagination_elt.find('.current').next('a').length){
        var $next_page = $('<div class="droppable  next_page"><div>Placer dans la page suivante</div></div>').insertAfter($pagination_elt)
        this._initDroppableContainer($next_page, 'next_page')
      }

      // main sortable initilization
      this.element.sortable($.extend({},this.options.sortOptions, {
        stop: function(e, ui) {
          self.stop = true ;
        },
        // lorsqu'un item est changé de position :
        update: function(e,ui){
          if (!self.preventReorder){
            self._reorder(ui.item, ui.item.index()+1, function(data){
              var data = data;
              $.each(self.element.children(), function(i,elt){
                $(elt).find('span.number').html('#'+ data[i])
              })
            })
          }
        }
      }));

    },
    _reset_numbers: function(data){
      var data = data;
      $.each(this.element.children(), function(i,elt){
        $(elt).find('span.number').html('#'+ data[i])
      })
    },
    _initDroppableContainer: function(droppableCont, action){
      // Ici on initialise le comportement des boites de dépots des pages voisines
      // Si l'item est déposé dans une boite de dépot correspondant a une pasge voisine
      // - on envoi la requete de modification de la position de l'item
      // - puis on déclanche un evevement sur le lien de pagination correspondant, ce qui a pour effet d'actualiser la liste
      var self = this,
          action = action

      droppableCont.droppable({
        accept: '.ajax-accordion li',
        activeClass: 'show',
        hoverClass: "ui-state-hover",
        drop: function(ev,ui){
          self.preventReorder = true
          var $elt = $(ui.draggable);
          $elt.hide('slow',function(){
            self._reorder(this, action, function(){
              if(action == 'next_page')
                self.pagination().find('.current').next('a').trigger('click')
              else
                self.pagination().find('.current').prev('a').trigger('click')
            })
          })
        }
      })

    },
    preventReorder: false,
    _reorder: function(reordered_elt, position, callback){
      var perPage = parseInt(this.options.perPage || 0);
      if(position == 'next_page'){
        position = parseInt(this.pagination().find('span.current').html() || 1 ) * perPage + 1
      } else if (position == 'previous_page'){
        position = (parseInt(this.pagination().find('span.current').html() || 1 ) - 1) * perPage
      } else { //if (position == 'current_page')
        position = parseInt(this.pagination().find('span.current').html() || 1 )  * perPage - perPage + position
      }
      $.post(this.options.reorderUrl, {
        id: $(reordered_elt).attr('id').match(/\d+/).toString(),
        position: position,
        ids: $.map(this.element.children(), function( elt,i){ return $(elt).attr('id').match(/\d+/) })
      },callback)

    },
    pagination: function(){
      return this.element.next('.pagination')
    }
  });

  $.widget('itkin.ajaxAccordion', AjaxAccordion);
})(jQuery)