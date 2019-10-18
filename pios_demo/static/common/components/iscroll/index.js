import iScroll from 'iscroll'

const vIScroll = (Vue, options) => {
    // console.log(Vue)
    Vue.directive('iscroll', {
        bind: function (el, binding, vnode, oldVnode) { 
            console.info(el, binding)
        },
        inserted: function (el, binding, vnode, oldVnode) {

        },
        update: function () { 

        },
        componentUpdated: function () { 

        },
        unbind: function () { 

        }
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vIScroll, {
        snap: false,
        momentum: false,
        hScrollbar: false,
        vScroll: false,
    })
}

export default vIScroll