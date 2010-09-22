$(function(){

  $("#tabs").tabs({
    fx: { height: 'toggle',  duration: 400 },
    select: function(event, ui) {
      $(ui.panel).fadeTo(500,0);
    },
    load: function(event,ui){
      setTimeout(function(){
        $(ui.panel).fadeTo(500,1);
      },400)

    }
  });

  $("ul.users, ul.metadata_types, ul.parameters").livequery(function(){
    $(this).ajaxAccordion();
  });

  $("ul.projects").livequery(function(){
    $(this).ajaxAccordion({ajaxSelectors: [['.actions a, .buttons a', 'click']]});
  });

  ajaxMulitipartForm.setup(function(e){
    $(this).closest('.ajax-accordion').ajaxAccordion('activate',-1)
  });

  $('.add_metadata').live('click',function(e){
    e.preventDefault();
    var content = $(this).prev('div').clone()
    content.css('display', 'block');
    content.find('.metadata_id').val(null);
    content.find('.metadata_destroy').val(null);
    $(this).prev('div').after(content);
  });
  $('.delete_metadata').live('click', function(e){
    e.preventDefault();
    $(this).prev('input').val(true);
    $(this).closest('.inline-field').fadeOut();
  });


  $('.pagination a, a.new').live('click', function(e){
      e.preventDefault();
      var $wrapper = $(this).closest(".ui-tabs-panel").find(".ajax-accordion-wrapper");
      $wrapper.fadeTo(500,0);
      $wrapper.load($(this).attr('href')+' .ajax-accordion-wrapper',function(){
        $wrapper.fadeTo(500,1);
      });
  });

  $('input.search').livequery(function(){
    $(this).searchBox({
      url: $(this).attr('data-source'),
      container: $(this).closest(".ui-tabs-panel").find('.ajax-accordion-wrapper'),
      target: '.ajax-accordion-wrapper'
    })
  });
})