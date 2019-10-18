module.exports = {
  imgLoad: function(arr_par, arr_chi){
    var _arr_par = $(arr_par);
    var _arr_chi = arr_chi;

    //取元素的页面绝对 Y位置
    var getTop = function (El) {
        try {
            var top = 0;
            do {
                top += El.offsetTop;
            } while ((El = El.offsetParent).nodeName != 'BODY');
            return top;
        } catch (err) { }
    };

    //取元素的页面绝对 X位置
    var getLeft = function (El) {
        var left = 0;
        try {
            do {
                left += El.getBoundingClientRect().left;
            } while ((El = El.offsetParent).nodeName != 'BODY');
            return left;
        } catch (err) { }
    };

    function sendlogs() {
      var isWebkit = !!navigator.userAgent.match(/AppleWebKit\b/img);
      var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
          _visibleHeight = document.documentElement.clientHeight,
          _scrollLeft = isWebkit ? document.body.scrollLeft : document.documentElement.scrollLeft,
          _visibleWidth = document.documentElement.clientWidth;
      for (var i = 0; i < _arr_par.length; i++) {
        var par_height = _arr_par[i].offsetHeight;
        var _arrTop = getTop(_arr_par[i]);
        var _arrLeft = getLeft(_arr_par[i]);
        var _arrWidth = _arr_par[i].clientWidth;
        if ((_arrTop + par_height) >= _scrollTop && _arrTop <= (_scrollTop + _visibleHeight)) {
          var sub_arr = $(_arr_par[i]).find(_arr_chi);
          for (var j = 0; j < sub_arr.length; j++) {
            var _arrTop2 = getTop(sub_arr[j]);
            var _arrLeft2 = getLeft(sub_arr[j]);
            var _arrWidth2 = sub_arr[j].clientWidth;

            var sub_arr_status = $(sub_arr[j]).attr("data-show");

            if (_arrTop2 >= _scrollTop && _arrTop2 <= _scrollTop + _visibleHeight) {
              //data-show 用来记录是否被曝光过，0 是未曝光或已被曝光过并且滑出可视区域，1 是已曝光
              //如果 元素上 data-show 属性不为1 则发送曝光日志
              if (sub_arr_status != "1") {
                $(sub_arr[j]).attr("data-show", "1");
                //图片賴加载
                var imgBox = $(sub_arr[j]).find('.imgload');
                for(var k=0;k<imgBox.length;k++){
                  var src = imgBox.eq(k).attr('src');
                  var dataSrc = imgBox.eq(k).attr('data-src');
                  var loaded = imgBox.eq(k).attr('data-loaded');
                  if(!loaded && dataSrc){
                    imgBox.eq(k).attr({src:dataSrc}).on("load",function(){
                      imgBox.attr({'data-loaded':1})
                    }).on("error", function () {
                      imgBox.eq(k).attr({src:src,'data-loaded':1});
                    });
                  }
                }
              }
            }else {
              // $(sub_arr[j]).attr("data-show", "0");
            }
          }
        }
      }
    };
    sendlogs();
    $(window).bind("scroll", sendlogs);
  }
}
