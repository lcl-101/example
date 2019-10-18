;(function($){
  'use strict';
  var win = window;
  var doc = document;
  var $win = $(win);
  var $doc = $(doc);
  var flag = true;
  var loadStatus = true;
  $.fn.dropload = function(options){
      return new download(this,options);
  };
  var download = function (element,obj){
    obj.$element = $(element);
    obj.threshold = obj.threshold || 1;
    obj.loadDownFn = obj.loadDownFn;
    obj.domDown = {
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    }
    // 是否有数据
    obj.isData = true;
    this.init(obj);
  };
  download.prototype.init = function(options){
    var _this = this;
    flag = true;
    // window.onscroll = function() {
    //   if(flag && loadStatus && getScrollTop() + getClientHeight() + options.threshold >= getScrollHeight()) {
    //     loadStatus = false;
    //     if($('.dropload-load').length < 1){
    //       options.$element.append(options.domDown.domLoad)
    //     }
    //     if(options.loadDownFn){options.loadDownFn(_this)}
    //   }
    // };
    function addEvent(obj,type,fn){
      if(obj.attachEvent){ //ie
          obj.attachEvent('on'+type,function(){
          fn.call(obj);
        });
      }else{
        obj.addEventListener(type,fn,false);
      }
    };

    addEvent(window,'scroll',function(e){
      if(flag && loadStatus && getScrollTop() + getClientHeight() + options.threshold >= getScrollHeight()) {
        loadStatus = false;
        if($('.dropload-load').length < 1){
          options.$element.append(options.domDown.domLoad)
        }
        if(options.loadDownFn){options.loadDownFn(_this)}
      }
    });
    //获取滚动条当前的位置
    function getScrollTop(){
      var scrollTop = 0;
      if(document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
      } else if(document.body) {
          scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    };
    //获取当前可视范围的高度
    function getClientHeight(){
      var clientHeight = 0;
      if(document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
    };
    function getScrollHeight(){
      var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
          bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    };
  }

  // 重置
  download.prototype.resetload = function() {
    $('.dropload-load').remove();
    loadStatus = true;
  }
  // 无数据
  download.prototype.noData = function(status){
    if(status === undefined || status == true){
      flag = false;
      $('.dropload-load').remove();
    }else if(flag == false){
      flag = true;
    }
  };
})(window.Zepto || window.jQuery);
