$.widget('itkin.rotate',{
  options:{
    delay: 2000,
    startIndex: 0,
    duration: 1000,
    transition: function(e,data){
      data.ui.headers.eq(data.nextIndex).fadeIn(data.duration)
      data.ui.headers.eq(data.currentIndex).fadeOut(data.duration)
    }
  },
  index: 0,
  headers: undefined,
  _create:function(){
    this.headers = this.element.children();
    this.index = this.options.startIndex
    this.headers.not(':eq(' + this.index +')' ).hide();
    this.run()
  },
  run: function(){
    var self = this;
    setInterval(function(){
      self._change();
    }, self.options.delay)
  },
  _change: function(){
    var self = this;
    var currentIndex = self.index;
    var nextIndex = self._increment_index();
    this._trigger('transition',null,{ui: self, currentIndex: currentIndex, nextIndex: nextIndex, duration: this.options.duration});
  },

  _increment_index: function(){
    if (this.headers.size() - 1 > this.index ){
      ++this.index;
    } else {
      this.index = 0;
    }
    return this.index
  }

});

$(function(){
  $('#logo').rotate({
    delay: 10000,
    duration: 500,
    transition: function(e,data){
      var data = data;
      data.ui.headers.eq(data.nextIndex).fadeIn(data.duration)
      setTimeout(function(){
        data.ui.headers.eq(data.currentIndex).fadeOut(data.duration);
      },200)

    }
  })
})