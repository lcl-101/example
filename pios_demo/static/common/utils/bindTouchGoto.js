//为一个或多个元素绑定touch跳转事件，不适用列表页
//基于zepto
var touch_pre_time = 0;
var touch_startX = 0,
    touch_startY = 0,
    touch_moveEndX = 0,
    touch_moveEndY = 0,
    touch_X = 0,
    touch_Y = 0;
function bindTouchGoto (arr, gotofun) {
    var x_ismove, x_finger;
    arr.each(function (index, ele) {
        $(ele).bind("touchstart", function (e) {
            x_ismove = false;
            x_finger = e.touches.length;
            touch_startX = e.touches[0].pageX;
            touch_startY = e.touches[0].pageY;
            $(this).addClass('hover');
            e.stopPropagation();
        }).bind("touchmove", function (e) {
            // x_ismove = true;
            touch_moveEndX = e.touches[0].pageX;
            touch_moveEndY = e.touches[0].pageY;
            touch_X = touch_moveEndX - touch_startX;
            touch_Y = touch_moveEndY - touch_startY;
            if (Math.abs(touch_X) >= 3 || Math.abs(touch_Y) >= 3) {
                x_ismove = true;
            }
            $(this).removeClass('hover');
            e.stopPropagation();
        }).bind("touchend", function (e) {
            var touch_now = Date.now();
            if (touch_now - touch_pre_time < 250) {
                $(this).removeClass('hover');
                touch_pre_time = touch_now;
                return;
            }
            touch_pre_time = touch_now;
            $(this).removeClass('hover');
            if (x_ismove || x_finger > 1) {
                e.stopPropagation();
                return;
            }
            e.stopPropagation();
            if (typeof gotofun == "function") {
                gotofun($(this), index);
            }
        }).bind("touchcancel", function () {
            $(this).removeClass('hover');
        });
    });
};

module.exports = bindTouchGoto;
