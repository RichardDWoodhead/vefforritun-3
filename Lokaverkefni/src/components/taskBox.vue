<template>
<div>
  <div class="created">
      <p v-text="'created: '+list.created" class="subtitle"></p>
  </div>
  <h1 v-bind:class="{ completed:taskcompleted}" class="title" v-text="list.title"></h1>
  <input @click="wasclicked" class="checkbox" type="checkbox" :value="list.id">
</div>
</template>

<script>
export default {
  name: 'taskBox',
  props:["list","taskcompleted"],
  data () {
    return {
    }
  },
  methods:{
    wasclicked:function(event){
      this.$emit("check",event)
    }
  }
}
</script>

<style>
#box{
	border:solid black 1px;
	border-radius: 5px;
	text-align:center;
	display:inline-block;
}
h1{
	padding: 3px;
}

</style>
