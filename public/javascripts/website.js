$.widget('itkin.rotatedBackground',{
  options:{
    image_files: [],
    delay: 2000
  },
  index: 0,
  _create:function(){
    var self = this;
    setInterval(function(){
      self._increment_index();
      self.element.css({'backgroundImage':'url(images/' + self.options.image_files[self.index] + ')'});
    }, 2000)
  },
  _increment_index: function(){
    if (this.options.image_files.length - 1 > this.index ){
      ++this.index;
    } else {
      this.index = 0;
    }

  }

});
$(function(){
  $('#header').rotatedBackground({image_files: ['logo_1.gif', 'logo_2.gif', 'logo_3.gif', 'logo_4.gif', 'logo_5.gif']})
})