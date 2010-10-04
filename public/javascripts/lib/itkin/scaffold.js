$(function(){

  // initilisation des formulaires
  $('form').live('submit', function(){
    $(this).children('.ajax-loader').css({display: "block"});
    return true
  });

  $('.field.buttons a, .field.buttons input').livequery(function(){
    $(this).button()
  });

  ajaxMulitipartForm.setup();

  // initilisation des accordeon (pour plus d'uniformité, et parce qu'il n'y a pas d'intégration rails jquery au niveau des request headers,
  // on gerera les actions d'update via du js coté serveur)
  $('.ajax-accordion').livequery(function(){
    $(this).ajaxAccordion({
      sortable: ($(this).hasClass('sortable') ? true : false),
      ajaxSelectors: [['.actions a, .buttons a', 'click']]
    });
  });

  // initilisation des searchbox
  $('input.search').livequery(function(){
    $(this).searchBox({
      url: $(this).attr('data-source'),
      target: $(this).closest(".ui-tabs-panel").find('.ajax-accordion-wrapper'),
      filter: '.ajax-accordion-wrapper'
    })
  });

  // binding des appels hors accordeon (new , pagination, etc..)
  $('div.pagination a, a.new, .ajax-accordion-wrapper > form .buttons a').live('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).attr('data-type', 'html');
    $(this).callRemote();
  });

  // binding des retours sur succés des requetes en provenance des précedents sélecteurs
  $('div.pagination a, a.new, ' +
      '.ajax-accordion-wrapper > form .buttons a, ').live('ajax:success', function(status,data){
    var $wrapper = $(this).closest(".ui-tabs-panel").find(".ajax-accordion-wrapper");
    var $parsed_data = $(data).find(' .ajax-accordion-wrapper')
    $parsed_data = $parsed_data.length ? $parsed_data : $(data)
    $wrapper.html($parsed_data);
  });

});