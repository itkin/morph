$(function(){

  $("#tabs").tabs({
    fx: { height: 'toggle',  duration: 400 }
  });


  $('.add_metadata').live('click',function(e){
    e.preventDefault();
    var content = $(this).prev('div').clone()
    content.css('display', 'block');
    content.find('.metadata_id').val(null);
    content.find('.metadata_destroy').val(null);
    content.find('input').val(null);
    var nb = parseInt(Math.random() * 1000000).toString();
    $.each(content.find('input,select'), function(i,elt){
      $(elt).attr('name', $(elt).attr('name').replace(/\d+/,nb))
    });
    $(this).prev('div').after(content);
  });

  $('.delete_metadata').live('click', function(e){
    e.preventDefault();
    $(this).prev('input').val(true);
    $(this).closest('.inline-field').fadeOut();
  });



})