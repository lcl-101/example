<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="test"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
    return {
      test: {}
    }
  },
  components: {
    HelloWorld
  },
  created () {
    console.log('a-created')
    this.test = {
      name: 123,
      img: ''
    }
    console.log(this.test.img.a.indexOf('a'))
    console.log('test')
  },
  mounted (){
    console.log('a-mounted')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
