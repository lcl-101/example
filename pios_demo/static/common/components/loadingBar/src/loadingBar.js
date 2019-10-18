import LoadingBarVue from './loadingBar.vue'
import Vue from 'vue'

let loadingBar = Vue.extend(LoadingBarVue)

let el;
let instance;

const LoadingBar = {
  create(text, title=''){
    if (!el) {
      el = document.createElement('div')
    }
    instance = new loadingBar({
      el: el
    })
    instance.text = text
    if (title) {
      instance.title = title
    }
    document.getElementById('app').appendChild(instance.$el)
    return this
  },
  show(){
    instance.visible = true
    return this
  },
  hide(){
    instance.visible = false
    return this
  }
}

export default LoadingBar