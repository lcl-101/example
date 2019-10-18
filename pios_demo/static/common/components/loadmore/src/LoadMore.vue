<template>
    <div class="z-loadmore" ref="wrapper">
        <div class="z-loadmore-content" :style="{transform: 'translate3d(0px, '+ distY +'px, 0px)',transition: transitionStyle}"
            ref="content">
            <div class="z-loadmore-top" v-if="topMethod">
                <slot name="top">
                    <span v-show="topStatus !== 'loading'"  class="arr" :class="{up:topShow}"> &darr; </span>
                    <span v-show="topStatus === 'loading'" class="icon_load"></span>
                    <span v-if="showDecText" class="top-text">{{topText}}</span>
                </slot>
            </div>
            <slot></slot>
            <div class="z-loadmore-bottom" v-if="bottomMethod">
                <slot name="bottom">
                    <span v-show="bottomStatus !== 'loading'"  class="arr" :class="{up:bottomShow}"> &uarr; </span>
                    <span v-show="bottomStatus === 'loading'" class="icon_load"></span>
                    <span v-if="showDecText" class="top-text">{{bottomTextText}}</span>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import './loadmore.css'

    export default {
        name: 'loading-more',
        data() {
            return {
                "distY": 0,
                "transitionStyle": '',
                "topShow": false,
                "bottomShow": false,
                "topStatus": 'pull', // pull -> drag -> loading
                "bottomStatus": 'pull', // pull -> drag -> loading
                "topText": '',
                "bottomText": ''
            }
        },
        props: {
            topMethod: {
                type: Function
            },
            bottomMethod: {
                type: Function
            },
            topDistance: {
                type: Number,
                default: 100
            },
            showDecText: {
                type: Boolean,
                default: false
            },
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topDropText: {
                type: String,
                default: '释放更新'
            },
            topLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomDropText: {
                type: String,
                default: '释放更新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDistance: {
                type: Number,
                default: 100
            },
            damping: {
                //拖动阻尼，接受数字和函数，为函数的话实际滑动距离为 damping(手指滑动距离) 默认1.6
                type: [Number, Function],
                default: 1.6
            }
        },
        watch: {
            distY: function (newVal, oldVal) {
                if (newVal === 0) {
                    this.topShow = false
                    this.bottomStatus = false
                }
            },
            topStatus: function (val) {
                this.$emit('top-status-change', val);
                switch (val) {
                    case 'pull':
                    console.log('is pull')
                        this.topShow = false
                        this.topText = this.topPullText
                        break;
                    case 'drag':
                        this.topShow = true
                        this.topText = this.topDropText                        
                        break;
                    case 'loading':
                        this.topText = this.topLoadingText
                        break;
                }
            },
            bottomStatus: function(val){
                this.$emit('bottom-status-change', val);
                switch (val) {
                    case 'pull':
                    console.log('is pull')
                        this.bottomShow = false
                        this.bottomText = this.bottomPullText
                        break;
                    case 'drag':
                        this.bottomShow = true
                        this.bottomText = this.bottomDropText                        
                        break;
                    case 'loading':
                        this.bottomText = this.bottomLoadingText
                        break;
                }
            }
        },
        methods: {
            initPage: function () {
                let _this = this
                _this.scrollEventTarget = _this.getScrollEventTarget(this.$el);
                _this.isScrolling = false
                _this.topText = _this.topPullText;
            },
            onTopLoaded() {
                let _this = this

                _this.distY = 0;
                setTimeout(() => {
                    _this.topStatus = 'pull';
                }, 200);

            },
            checkBottomReached() {
                return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
            },
            _start: function (event) {
                if (!this.topMethod && !this.bottomMethod) return

                let _this = this,
                    point = event.touches[0]

                _this.transitionStyle = ''
                _this.startX = point.pageX
                _this.startY = point.pageY
            },
            _move: function (event) {
                if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                    return;
                }
                let _this = this,
                    point = event.touches[0],
                    deltaX = point.pageX - _this.startX,
                    deltaY = point.pageY - _this.startY
                
                _this.dirX = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0 //X轴方向 1表示右滑 -1表示左滑
                _this.dirY = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0 //Y轴方向 1表示下滑 -1表示上滑
                _this.absDistX = Math.abs(deltaX)
                _this.absDistY = Math.abs(deltaY)

                if (typeof _this.topMethod === 'function' && document.body.scrollTop === 0 && _this.dirY === 1) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (deltaY < 0) deltaY = 0
                    _this.distY = typeof _this.damping === 'Function'? _this.damping(deltaY) : deltaY/_this.damping
                    ts.topStatus = _this.absDistY > _this.topDistance ? 'drag' : 'pull'

                }

                if(typeof _this.bottomMethod === 'function' && _this.checkBottomReached() && _this.dirY === -1){
                    // console.log('到底了')
                    event.preventDefault();
                    event.stopPropagation();
                    if (deltaY > 0) deltaY = 0
                    _this.distY = typeof _this.damping === 'Function'? _this.damping(deltaY) : deltaY/_this.damping
                    ts.bottomStatus = _this.absDistY > _this.bottomDistance ? 'drag' : 'pull'
                }
            },
            _end: function (event) {
                let _this = this
                if (_this.topStatus === 'drag') {
                    _this.distY = 45
                    _this.topStatus = 'loading'
                    _this.topMethod()
                    _this.transitionStyle = 'transform .5s ease-in-out'
                } else if(_this.bottomStatus === 'drag'){
                    _this.distY = -45
                    _this.bottomStatus = 'loading'
                    _this.bottomMethod()
                    _this.transitionStyle = 'transform .5s ease-in-out'
                } else{
                    _this.distY = 0
                }
            },
            getScrollEventTarget(element) {
                let currentNode = element
                while (currentNode && currentNode.tagName !== 'HTML' &&
                    currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode
                    }
                    currentNode = currentNode.parentNode
                }
                return window
            },
            getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
                } else {
                    return element.scrollTop
                }
            },
        },
        mounted() {
            let _this = this
            _this.initPage()
            _this.$el.addEventListener('touchstart', _this._start)
            _this.$el.addEventListener('touchmove', _this._move)
            _this.$el.addEventListener('touchend', _this._end)
        }
    }
</script>