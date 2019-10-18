import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import CommentsPicVue from './commentPic.vue'

Vue.use(VueLazyload, {
    preLoad: 100,
    loading: require('../../../img/img_placehd3.png'),
    listenEvents: [ 'transitionend' ],
    adapter: {
        loaded (listender, Init) {
            // console.log('loaded')
        },
        loading (listender, Init) {
            // console.log('loading')
        },
        error (listender, Init) {
            // console.log('error')
        }
    }
})

let instance = null
let sourceCatch = null

const merge = (target, limit) => {
    let newData = {}
    for(let key in target){
        if(key in limit){
            newData[key] = target[key]
        }
    }

    return newData
}

const FocusPicConstructor = Vue.extend(CommentsPicVue)
// console.log(FocusPicConstructor.$props)

const getAnInstance = () => {
    instance = instance || new FocusPicConstructor({
        el: document.createElement('div')
    })
    return instance
}

const commentsPic = (picData = {}) => {
    let instance = getAnInstance()
    instance.curIndex = picData.defaultIndex || 0
    Object.assign(instance, merge(picData, instance._props))

    document.getElementById('app').appendChild(instance.$el)
    // Vue.nextTick(function() {
        instance.visible = true
    // });
}
commentsPic.CommentsPicVue = CommentsPicVue

export default commentsPic