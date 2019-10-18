<template>
    <div class="swiper-container">
        <div class="swiper-wrapper" ref="wrapper">
            <slot></slot>
        </div>
        <div :class="indicatorClassObject" v-if="showIndicators">
            <ul class="swipe-point-indicator" v-if="indicatorType === 'point'">
                <li 
                    class="point-indicator-item" 
                    v-for="(item, $index) in children"
                    :class="[$index === index ? 'is-active' : '']"
                ></li>
            </ul>
            
            <span v-if="indicatorType === 'number'" class="swipe-number-indicator">
                {{index + 1}} / {{children.length}}
            </span>
        </div>
    </div>
</template>

<script>
    import './swipe.css';

    export default {
        name: "swipe",
        created(){
            // console.log('swipe组件初始化ing...');
            //存储滑动状态
            this.dragState = {
                // startTime: null,
                // startLeft: null,
                // currentLeft: null,
                // startTop: null,
                // currentTop: null,
                // startTopAbsolute: null,
                // currentTopAbsolute: null,
                // pageWidth: null,
                // pageHeight: null
            };
        },
        data(){
            return {
                ready: false,
                index: 0,
                children: [],
                dragging: false,//判断用户是否在进行滑动行为
                userScrolling: false,//是否是用户滚动条事件
                animating: false,//判断是否处于动画过渡中
                pageWidth: null,
                pageHeight: null,
                childrenCount: 0
                // pages: []
            }
        },
        watch: {
            index: function(newValue){
                let itemLen = this.$children.length,
                    index = this.index

                this.index = this.getIndexByRule(newValue)
                this.$emit('indexChanged', this.index)
            },
            // childrenCount: function(newV, oldV){
            //     if(newV !== oldV){
            //         this.initPages()
            //     }
            // },
            defaultIndex: function(newV, oldV){
                if(newV !== oldV){
                    console.log(newV,oldV)
                    // this.$nextTick(()=>{
                    //     this.initPages()                    
                    // })
                }
            },
        },
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            // loop: {
            //     type: Boolean,
            //     default: false
            // },
            speed: {
                type: Number,
                default: 300
            },
            auto: {
                type: Number,
                default: 3000
            },
            damping: {
                type: [Number, Function],
                default: 1.6
            },
            showIndicators: {
                 type: Boolean,
                 default: true
            },
            indicatorType: {
                // the value is  'point' or 'number'
                type: String,
                default: 'point'
            },
            indicatorPosition: {
                // the value is  'left' or 'right' or 'center'
                type: String,
                default: 'center'
            }
        },
        computed: {
            indicatorClassObject() {
                let _pos = this.indicatorPosition
                return {
                   'swipe-indicators': true,
                   'l': _pos === 'left',
                   'r': _pos === 'right'
                }
            }
        },
        methods: {
            //暂时无用
            swipeItemCreated: function(){
                // this.reInitPage()
            },
            swipeItemUpdated: function(){
                // this.reInitPage()
            },
            initPages: function(){
                let element = this.$el,
                    children = this.$children,
                    dragState = this.dragState,
                    intDefaultIndex = Math.floor(this.defaultIndex),
                    defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0

                this.children = children
                this.index = defaultIndex
                this.translate(-1*defaultIndex*element.offsetWidth)

                if(this.auto > 0){
                    this.autoTimer = setInterval(()=>{
                        if(this.index >= children.length - 1) {
                            this.clearTimer()
                            return 
                        }
                        if(!this.dragging && !this.animating){
                            ++this.index
                            this.animateFn()
                        }   
                    }, this.auto)
                }
                
                // console.log('init ready, now to listening touch event')
            },
            clearTimer: function(){
                clearInterval(this.autoTimer)
                this.autoTimer = null
            },
            getIndexByRule: function(index){
                return index < 0 ? 0 : index >= this.$children.length - 1 
                                 ? this.$children.length - 1 : index
            },
            reInitPage: function(){
                //=======此函数是否存在带商榷==========
                if(!this.ready) return
                clearTimeout(this.reInitTimer)
                this.reInitTimer = setTimeout(() => {
                    this.initPages()
                }, 100)
            },
            touchStartAction: function(event){
                let element = this.$el,
                    index = this.index,
                    children = this.$children, 
                    touch = event.touches[0],
                    dragState = this.dragState;
                this.pageWidth = element.offsetWidth
                this.pageHeight = element.offsetHeight

                dragState.startTime = new Date()
                dragState.startLeft = touch.pageX
                dragState.startTop = touch.pageY
                dragState.max_X = 0;
                dragState.startTopAbsolute = touch.clientY
            },
            touchMoveAction: function(event){
                let dragState = this.dragState,
                    index = this.index,
                    pageWidth = this.pageWidth,
                    touch = event.touches[0],
                    towards

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                let offsetLeft = dragState.currentLeft - dragState.startLeft,
                    offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
                let distanceX = Math.abs(offsetLeft),
                    distanceY = Math.abs(offsetTop);
                let max_X = Math.max(distanceX, dragState.max_X) 
                dragState.max_X = max_X;
                
                offsetLeft = Math.min(Math.max(-pageWidth + 1, offsetLeft), pageWidth - 1);//兼容PC端模拟器的界限处理
                dragState.offsetLeft = offsetLeft;
                towards = offsetLeft < 0 ? -1 : 1; // 1 -> next  -1 -> prev    0 -> cur 
                dragState.towards = this.$children.length < 2? 0 : towards;
                if (max_X < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
                    this.userScrolling = true;
                    return;
                } else {
                    this.userScrolling = false;
                    event.preventDefault();
                }  
                this.translate(-1*index*pageWidth + this.transformValueByDamping(offsetLeft, this.damping));
            },
            touchEndAction: function(event){
                let index = this.index,
                    dragState = this.dragState,
                    offsetLeft = dragState.offsetLeft,
                    currentLeft = dragState.currentLeft,
                    towards = dragState.towards,
                    dragTime = new Date() - dragState.startTime,                      
                    offsetTop = dragState.currentTop - dragState.startTop,
                    pageWidth = this.pageWidth; 
                let element = null,
                    flag = null;
                
                if(dragTime < 300){
                    let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
                    if (isNaN(offsetLeft) || isNaN(offsetTop)) {
                        fireTap = true;
                    }
                    if (fireTap) {
                        this.$children[this.index].$emit('tap');
                    }
                    if(currentLeft === undefined) return;
                }

                if(dragTime < 300 || Math.abs(offsetLeft) > pageWidth / 2){
                    // console.log('可以翻页')
                    this.index = index + (-1 * towards) //设置下一页 页码

                }else{
                    towards = 0;
                    // console.log('回到原来的状态')
                }

                this.animateFn()

                this.dragState = {};//清除本次滑动数据
            },
            translate: function(offset, speed, callback){
                let element = this.$refs.wrapper
                if(speed){
                    this.animating = true;
                    element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
                    setTimeout(() => {
                        element.style.webkitTransform = this.getTranslateStyle(offset);
                    }, 50);

                    let called = false;

                    let transitionEndCallback = () => {
                        if (called) return;
                        called = true;
                        this.animating = false;
                        // element.style.webkitTransition = '';
                        if (callback) {
                            callback.apply(this, arguments);
                        }
                    };

                    // once(element, 'webkitTransitionEnd', transitionEndCallback);
                    element.addEventListener('webkitTransitionEnd', transitionEndCallback)
                    // setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
                }else{
                    element.style.webkitTransition = '';
                    element.style.webkitTransform = this.getTranslateStyle(offset);
                }
            },
            getTranslateStyle: function(translateX, translateY=0) {
                let translateValue = 'translate(' + translateX + 'px,' + translateY + 'px) translateZ(0)'
                return translateValue
            },
            transformValueByDamping: function(value, damping) {
                if (this.isFunction(damping)) {
                    return damping(value)
                }
                if (this.isNumber(damping)) {
                    return value / damping
                }
                return value
            },
            isNumber: function (obj) {
                return typeof obj === 'number' && !isNaN(obj)
            },
            isFunction: function (obj) {
                return typeof obj === 'function'
            },
            animateFn: function(){
                let speed = this.speed,
                    index = this.getIndexByRule(this.index),
                    pageWidth = this.pageWidth,
                    offsetLeft = this.offsetLeft
                
                let callback = () => {

                }
                this.translate(-1*index*pageWidth, speed)
            }
        },
        mounted(){
            console.log("component is ready")
            this.ready = true;
            this.initPages();

            let element = this.$el;
            this.$nextTick(()=>{
                this.pageWidth = element.offsetWidth
                this.pageHeight = element.offsetHeight
            })

            element.addEventListener("touchstart", (event) => {
                //箭头函数可以保证当前作用域在父级下
                if (this.animating) return;                
                this.dragging = true;
                this.touchStartAction(event);
            },{ passive: false })
            element.addEventListener("touchmove", (event) => {
                if (!this.dragging) return;
                this.touchMoveAction(event)

            }, { passive: false })
            element.addEventListener("touchend", (event) => {
                if (this.userScrolling) {
                    this.dragging = false;
                    this.dragState = {};
                    return;
                }
                if (!this.dragging) return;                
                this.dragging = false;
                this.touchEndAction(event);
            }, { passive: false })
        }
    }
</script>