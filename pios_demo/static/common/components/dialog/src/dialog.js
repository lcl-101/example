import Vue from 'vue'
import DialogVue from './Dialog.vue'

let instance = null

const DialogConstructor = Vue.extend(DialogVue)
const defaultArgument = ['skin', 'title', 'content', 'okText', 'cancelText', 'showCancel', 'cbOk','cbCancel']

const merge = (target, limit) => {
    let newData = {}
    limit.forEach((value, index)=>{
        if(target[value] !== 'undefined'){
            newData[value] = target[value]
        }
    })

    return newData
}

const getAnInstance = () => {
    let instance = instance || new DialogConstructor({
        el: document.createElement('div')
    })
    return instance
}

const Dialog = (params = {
    cbOk: Dialog.close,
    cbCancel: Dialog.close
}) => {
    instance = getAnInstance()

    instance.callByFun = true   //将调用标识设置为函数调用
    // console.log(instance.title,'|', instance.body,'|', instance.okText,'|', instance.cancelText,'|', instance.showCancel)
    Object.assign(instance, merge(params, defaultArgument))
    // console.log(instance.title,'|', instance.body,'|', instance.okText,'|', instance.cancelText,'|', instance.showCancel)
    document.getElementById('app').appendChild(instance.$el)

    Vue.nextTick(function(){
        instance.visible = true;
    })
   
}
Dialog.close = () => {
    // console.log('closed')
    instance.visible = false;
}
Dialog.createOwnDialog = DialogVue

export default Dialog