define(function(require,exports,module){
    var aa=require('jquery');

    function Spinning(box){
        alert(box);
        this.box = $(box);
    }
    module.exports = Spinning;
    Spinning.prototype.render = function() {
        this.box.css({'color':'red'});
        alert(1);
    }
})