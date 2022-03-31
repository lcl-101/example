<template>
  <div class="hello">
    {{msg.name}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: Object
  },
  created () {
    console.log('b-created')
    console.log(this.msg.img)
    this.msg.img.indexOf('b')
  },
  mounted (){
    console.log('b-mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
