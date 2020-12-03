"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdSlide = void 0;
var AdSlide = /** @class */ (function () {
    /**
     * el: 盒子元素
     * config: 基本配置
     */
    function AdSlide(el, config) {
        this.el = $(el);
        this.wrapper = this.el.find('.adw-wrapper');
        //传入数据
        this.props = {
            auto: config.auto || true,
            time: config.time || 3000,
            ml: config.ml || 0,
            max: config.max || 0
        };
        this.data = {
            il: 0,
            iw: 0,
            imr: 0,
            play: null,
            flag: true,
            num: 0
        };
        var item = this.el.find('.adw-item');
        if (item.length > this.props.max) {
            for (var i = 0; i < item.length; i++) {
                item.eq(i).clone().appendTo(this.wrapper);
            }
            this.el.find('.adw-left').show();
            this.el.find('.adw-right').show();
            // 初始化
            this.initData();
        }
    }
    ;
    AdSlide.prototype.initData = function () {
        try {
            var item = this.el.find('.adw-item');
            this.data.il = item.length;
            this.data.iw = +item.width();
            this.data.imr = +item.css('margin-right').replace("px", "");
            this.wrapper.css({ width: (this.data.iw + this.data.imr) * this.data.il });
            for (var i = 0; i < item.length / 2; i = i + this.props.max) {
                this.el.find('.adw-pagination').append('<span class="adw-pagination-bullet" data-index="' + i + '"></span>');
            }
            this.el.find('.adw-pagination-bullet').eq(0).addClass('active');
            this.autoPlayer();
            this.initEvent();
        }
        catch (e) {
        }
    };
    ;
    AdSlide.prototype.initEvent = function () {
        var that = this;
        this.el.on('mouseenter', function (event) {
            if (that.data.play) {
                clearInterval(that.data.play);
                that.data.play = '';
            }
        });
        this.el.on('mouseleave', function (event) {
            if (that.data.play) {
                return;
            }
            that.data.play = setInterval(that.move, that.props.time);
        });
        this.el.find('.adw-left').on('click', function () {
            // @ts-ignore
            that.preSlideChange.apply(that);
        });
        this.el.find('.adw-right').on('click', function () {
            // @ts-ignore
            that.nextSlideChange.apply(that);
        });
        this.el.delegate('.adw-pagination-bullet', 'click', function () {
            // @ts-ignore
            that.slideChange.call(this, that);
        });
    };
    ;
    AdSlide.prototype.autoPlayer = function () {
        var that = this;
        this.move = function () {
            if (!that.data.flag) {
                return;
            }
            that.data.flag = false;
            // @ts-ignore
            that.wrapper.animate({ marginLeft: -(that.data.iw + that.props.ml) }, 500, 'swing', function () {
                that.el.find('.adw-item').eq(0).appendTo(that.wrapper);
                that.wrapper.css({ marginLeft: that.props.ml });
                that.data.flag = true;
            });
            that.data.num++;
            if (that.data.num >= that.el.find('.adw-item').length / 2) {
                that.data.num = 0;
            }
            console.log(that.data.num);
            that.el.find('.adw-pagination-bullet').removeClass('active');
            that.el.find('.adw-pagination-bullet').eq(parseInt(String(that.data.num / that.props.max))).addClass('active');
        };
        if (this.props.auto) {
            that.data.play = setInterval(this.move, that.props.time);
        }
    };
    ;
    AdSlide.prototype.preSlideChange = function () {
        this.move();
    };
    ;
    AdSlide.prototype.nextSlideChange = function () {
        var that = this;
        if (!that.data.flag) {
            return;
        }
        that.data.flag = false;
        that.el.find('.adw-item').last().prependTo(that.wrapper);
        that.wrapper.css({ marginLeft: -(that.data.iw + that.props.ml) });
        // @ts-ignore
        that.wrapper.animate({ marginLeft: that.props.ml }, 500, 'swing', function () {
            that.data.flag = true;
        });
        that.data.num--;
        if (that.data.num < 0) {
            that.data.num = that.el.find('.adw-item').length / 2 - 1;
        }
        console.log(that.data.num);
        that.el.find('.adw-pagination-bullet').removeClass('active');
        that.el.find('.adw-pagination-bullet').eq(parseInt(String(that.data.num / that.props.max))).addClass('active');
    };
    ;
    AdSlide.prototype.slideChange = function (that) {
        var _this = $(this);
        var index = _this.attr('data-index');
        if (!that.data.flag) {
            return;
        }
        that.data.flag = false;
        if (+index > +that.data.num) {
            that.wrapper.animate({ marginLeft: (-(that.data.iw + +that.data.imr) * (index - that.data.num)) + that.props.ml }, 500, 'swing', function () {
                for (var i = 0; i < (index - that.data.num); i++) {
                    that.el.find('.adw-item').eq(0).appendTo(that.wrapper);
                }
                that.wrapper.css({ marginLeft: that.props.ml });
                that.data.flag = true;
                that.data.num = index;
                console.log(that.data.num);
                that.el.find('.adw-pagination-bullet').removeClass('active');
                that.el.find('.adw-pagination-bullet').eq(parseInt(String(that.data.num / that.props.max))).addClass('active');
            });
        }
        else if (+index < +that.data.num) {
            for (var i = 0; i < (that.data.num - index); i++) {
                that.el.find('.adw-item').last().prependTo(that.wrapper);
            }
            that.wrapper.css({ marginLeft: (-(that.data.iw + +that.data.imr) * (that.data.num - index)) + that.props.ml });
            // @ts-ignore
            that.wrapper.animate({ marginLeft: that.props.ml }, 500, 'swing', function () {
                that.data.flag = true;
                that.data.num = index;
                console.log(that.data.num);
                that.el.find('.adw-pagination-bullet').removeClass('active');
                that.el.find('.adw-pagination-bullet').eq(parseInt(String(that.data.num / that.props.max))).addClass('active');
            });
        }
        else if (+index == +that.data.num) {
            that.data.flag = true;
        }
    };
    ;
    return AdSlide;
}());
exports.AdSlide = AdSlide;
