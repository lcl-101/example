function Drop(obj) {
    this.$self ='';
    this.top = '';
    this.settings = {
        id:obj.id||'',
        infinite: obj ? (obj.infinite ? true : false) : false,
        title: obj ? (obj.title ? obj.title : "标题") : false,//标题文字
        message: obj ? (obj.message ? obj.message : "提示信息") : false,//标题文字//提示信息
        cancel: obj ? (obj.cancel ? obj.cancel : false) : false,//取消按钮文字
        onCancel: obj ? (obj.onCancel ? obj.onCancel : false) : false,//当点击取消按钮后触发的回调函数
        success: obj ? (obj.success ? obj.success : false) : false,//默认的确认按钮文字 可以改成任何文字
        onSuccess: obj ? (obj.onSuccess ? obj.onSuccess : false) : false,//当点击确认后触发的回调函数
        close: obj ? (obj.close ? obj.close : false) : false,
        onShow: obj ? (obj.onShow ? obj.onShow : false) : false,//当窗口显示的时候触发的回调函数
        onHide: obj ? (obj.onHide ? obj.onHide : false) : false,//当窗口隐藏的时候触发的回调函数
        closeOnSuccess: obj ? (obj.closeOnSuccess ? obj.closeOnSuccess : true) : true,//是不是当点击确定后自动关闭弹出窗口
    };
    this.init();
    return this
}
Drop.prototype = {
    constructor: Drop,
    init: function () {
        this.initUI();
        this.bindEvent();
    },
    initUI: function () {
        var layerHtml = '', sign ='';
        if(!this.settings.infinite){
            sign=(!!this.settings.cancel) + (!!this.settings.success);
            layerHtml+='<div class="layer-wrap" id='+ this.settings.id +'>';
            if (this.settings.title) {
                if (this.settings.close) {
                    layerHtml += '<p class="layer-title"><span>' + this.settings.title + '</span><span class="layer-close"></span></p>'
                } else {
                    layerHtml += '<p class="layer-title">' + this.settings.title + '</p>'
                }
            }
            layerHtml += ' <div class="layer-container">' + this.settings.message + '</div>';
            switch (sign) {
                case 0:
                    break;
                case 1:
                    if (this.settings.success) {
                        layerHtml += '<div class="layer-btn"><span class="layer-success">' + this.settings.success + '</span></div>';
                    } else {
                        layerHtml += '<div class="layer-btn"><span class="layer-cancel layer-cancel-only">' + this.settings.cancel + '</span></div>';
                    }
                    break;
                case 2:
                    ayerHtml += '<div class="layer-btn"><span class="layer-cancel">' + this.settings.cancel + '</span><span class="layer-success">' + this.settings.success + '</span><div>';
                    break;
            }
            layerHtml += '</div></div>';
            $('body').append(layerHtml);
        }
        this.$self=$('#'+this.settings.id);
        if ($('#mask').length <= 0) {
            $('body').append('<div id="mask" style="display: none"><div>')
        }
    },
    bindEvent: function () {
        var that = this;
        if (this.settings.cancel) {
            this.$self.on('click', '.layer-cancel', function () {
                that.hide();
                that.settings.onCancel && that.settings.onCancel();
            });
        }
        if (this.settings.success) {
            this.$self.on('click', '.layer-success', function () {
                that.settings.onSuccess && that.settings.onSuccess();
                if (that.settings.closeOnSuccess) {
                    that.hide()
                }
            })
        }
        if (this.settings.close) {
            this.$self.on('click', '.layer-close', function () {
                that.hide();
            });
        }
        $('#mask').on('click', function () {
            that.hide();
        });
        return this
    },
    show: function () {
        this.top = $(window).scrollTop();
        $('body').css({
            position: "fixed",
            top: '-' + this.top + 'px'
        });
        // $('body').css({'overflow':'hidden'});
        $('#mask').show();
        this.$self.show();
        this.settings.onShow && this.settings.onShow();
        return this
    },
    hide: function () {
        $('body').removeAttr('style');
        // $('body').css({'overflow':'auto'});
        $(window).scrollTop(this.top);
        $('#mask').hide();
        this.$self.hide();
        this.settings.onHide && this.settings.onHide();
        return this
    },
};
module.exports ={
  Drop : Drop
};
