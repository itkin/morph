$(function(){
  $('.add_metadata').live('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation()
    $(this).prev('div').after($(this).prev('div').clone())
  })
})