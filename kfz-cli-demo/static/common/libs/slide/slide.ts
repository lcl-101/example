/**
    <div class="slide-container">
         <ul class="slide-wrapper">
             <li class="slide-item">slide1</li>
             <li class="slide-item">slide2</li>
             <li class="slide-item">slide3</li>
         </ul>
         <div class="slide-pagination"></div>
    </div>
**/

interface Window {
    Slide:any
}

/**
 * el: 盒子元素
 * config: 基本配置
 */
class Slide {
    el: any;
    private props: {
        auto: boolean,
        time: number
    };
    private on: {
        slideChangeStart: any,
        slideChangeEnd: any
    };
    private data: {
        index: number;
        next: number;
        prev: number;
        play: any;
        isPagination: any;
        maxLen: any
    };
    private move: any;
    constructor (el: any,config: any){
        this.el = $(el);
        //传入数据
        this.props = {
            auto: config.auto || true,              //是否自动播放
            time: config.time || 3000
        };
        //事件
        this.on = {
            slideChangeStart: config.on && config.on.slideChangeStart || '',
            slideChangeEnd:  config.on && config.on.slideChangeEnd || ''
        };
        //内部数据
        this.data = {
            index: 0,
            next: 0,
            prev: 0,
            play: null,
            isPagination: this.el.find('.slide-pagination').length,
            maxLen: this.el.find('.slide-item').length
        };
        //内部方法
        this.move = null;
        if(this.data.maxLen > 1){
            // 初始化
            this.initData();
        }
    };
    initData (){
        const that = this;
        try {
            this.el.find('.slide-item').hide();
            this.el.find('.slide-item').eq(0).stop(true,false).show();

            //初始化按钮数量
            if(this.data.isPagination){
                for(let i = 0; i < that.el.find('.slide-item').length; i++){
                    that.el.find('.slide-pagination').append('<span class="slide-pagination-bullet" data-index="'+i+'"></span>');
                }
                that.el.find('.slide-pagination-bullet').eq(0).addClass('active');
            }

            if(this.props.auto){
                this.autoPlayer();
            }
            this.initEvent();
        } catch (e) {
            console.log(e);
        }
    };
    initEvent (){
        const that = this;
        this.el.delegate('.slide-pagination-bullet', 'click', function(event:any) {
            // @ts-ignore
            that.slideChange.call(this, that);
        });
        this.el.on('mouseenter', function(event:any) {
            if(that.data.play){
                clearInterval(that.data.play);
                that.data.play = '';
            }
            that.el.find('.arrow-left').stop(true,false).fadeIn();
            that.el.find('.arrow-right').stop(true,false).fadeIn();
        });
        this.el.on('mouseleave', function(event:any) {
            if(that.data.play){
                return;
            }
            that.data.play = setInterval(that.move,that.props.time);
            that.el.find('.arrow-left').stop(true,false).fadeOut();
            that.el.find('.arrow-right').stop(true,false).fadeOut();
        });
        this.el.delegate('.arrow-left','click',function(){
            // @ts-ignore
            that.preSlideChange.call(this,that);
        });
        this.el.delegate('.arrow-right','click',function(){
            // @ts-ignore
            that.nextSlideChange.call(this,that);
        });
    };
    autoPlayer(){
        const that = this;
        this.move = function(){
            if(that.on.slideChangeStart){
                that.on.slideChangeStart({index: that.data.index + 1});
            }

            that.data.next++;
            if(that.data.next >= that.el.find('.slide-item').length){
                that.data.next = 0;
            }
            that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
            that.el.find('.slide-item').eq(that.data.next).stop(true,false).fadeIn();

            if(that.data.isPagination){
                that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
                that.el.find('.slide-pagination-bullet').eq(that.data.next).addClass('active');
            }
            that.data.index = that.data.next;

            if(that.on.slideChangeEnd){
                that.on.slideChangeEnd({index: that.data.index + 1});
            }
        };
        clearInterval(that.data.play);       //创建定时器前先清除掉上一个定时器
        that.data.play = setInterval(that.move,that.props.time);
    };
    slideChange (that:any){
        const _this = $(this);
        const index:any = _this.attr('data-index');
        if(index === that.data.index){
            return;
        }

        if(that.on.slideChangeStart){
            that.on.slideChangeStart({index: +that.data.index + 1});
        }

        that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
        that.el.find('.slide-item').eq(index).stop(true,false).fadeIn();

        if(that.data.isPagination){
            that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
            that.el.find('.slide-pagination-bullet').eq(index).addClass('active');
        }
        // @ts-ignore
        that.data.index = that.data.next = +index;

        if(that.on.slideChangeEnd){
            // @ts-ignore
            that.on.slideChangeEnd({index: +index + 1});
        }
    };
    preSlideChange (that:any) {
        const _this = $(this);
        let index = that.data.index - 1;

        if(+index < 0){
            index = that.data.maxLen - 1;
        }

        if(that.on.slideChangeStart){
            that.on.slideChangeStart({index: +that.data.index});
        }

        that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
        that.el.find('.slide-item').eq(index).stop(true,false).fadeIn();

        if(that.data.isPagination){
            that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
            that.el.find('.slide-pagination-bullet').eq(index).addClass('active');
        }

        that.data.index = that.data.next = +index;

        if(that.on.slideChangeEnd){
            that.on.slideChangeEnd({index: +index});
        }

    };
    nextSlideChange (that:any){
        const _this = $(this);
        let index = that.data.index + 1;

        if(index >= that.data.maxLen){
            index = 0;
        }

        if(that.on.slideChangeStart){
            that.on.slideChangeStart({index: +that.data.index});
        }

        that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
        that.el.find('.slide-item').eq(index).stop(true,false).fadeIn();

        if(that.data.isPagination){
            that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
            that.el.find('.slide-pagination-bullet').eq(index).addClass('active');
        }

        that.data.index = that.data.next = +index;

        if(that.on.slideChangeEnd){
            that.on.slideChangeEnd({index: +index + 1});
        }
    }
}

window.Slide = Slide;