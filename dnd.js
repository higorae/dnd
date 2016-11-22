var DND = function(options){
  var none = function() {};
  this.element = document.querySelector(this.selector|| '.box');
  this.onComplete = options.onComplete || none;
  this.onDragenter = options.onDragenter || none;
  this.onDragend = options.onDragend || none;
  this.onDrop = options.onDrop || none;
  
  
  this.init();
}

DND.prototype.init = function(){
  var $el = this.element;
  var self = this;
  addMultipleEventListener('drag dragstart dragend dragover dragenter dragleave drop', $el, function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
  
  addMultipleEventListener('dragover dragenter', $el, function() {
    $el.classList.add('is-dragover');
    self.onDragenter();
  });
  addMultipleEventListener('dragleave dragend drop',$el, function() {
    $el.classList.remove('is-dragover');
    self.onDragend();
  });
  addMultipleEventListener('drop', $el, function(e) {
    self.onDrop(e);
  }); 
  
  function addMultipleEventListener(events, $el , func){
    (events.split(" ")).forEach(function(e){
      $el.addEventListener(e, func, false);
    })
  }
}
