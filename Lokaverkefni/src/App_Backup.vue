<template>

<div class="container">
  <input v-model="title" class="input">
  <button class="button" @click="postData">hello</button>
  <div v-for="task in data.data" class="box column">
  <div class="created">
    <a class="delete"></a>
    <p v-text="'created: '+task.created" class="subtitle"></p>
  </div>
    <h1 v-bind:class="{ completed:task.completed}" class="title" v-text="task.title"></h1>
    <input @click="checkthebox" class="checkbox" type="checkbox" :value="task.id">
  </div>
  
</div>

</template>

<script>
import axios from "axios"
export default {
  name: 'app',
  data () {
    return {
      data:[],
      title:""
    }
  },
  methods:{
    postData : function(){
      axios.post('http://fjolbraut.org/api/tasks?api_token=OU8KsDzMSx7ZQ7xcAJ8kIc0q4L4nKkEZ3yKrKEwa2m0W1kJZFstLobh3xj3t', {
              title:this.title
           })
           .then(function(response) {
              console.log(response);
           })
           .catch(function(error) {
              console.log(error);
           });
          var cthis = this
          setTimeout(function(){
            cthis.getData()
          },200)
          
    },
    checkthebox:function(event){

      var id = event.path[0].value
      axios.post('http://fjolbraut.org/api/tasks/' + id + '/status?api_token=OU8KsDzMSx7ZQ7xcAJ8kIc0q4L4nKkEZ3yKrKEwa2m0W1kJZFstLobh3xj3t')
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
         });
          var cthis = this
          setTimeout(function(){
            cthis.getData()
          },200)
    },
    getData:function(){
      var cthis = this
    axios.get('http://fjolbraut.org/api/tasks', {
        params: {
            api_token: 'OU8KsDzMSx7ZQ7xcAJ8kIc0q4L4nKkEZ3yKrKEwa2m0W1kJZFstLobh3xj3t'
        }
       })
       .then(function(response) {
        console.log(response)
          cthis.data = response
       }).
       catch(function(error) {
          console.log(error);
       });

      },
      checkTheBoxes:function(){
        var checkboxes = document.getElementsByClassName("checkbox")
        for (var i = checkboxes.length - 1; i >= 0; i--) {
          console.log(checkboxes)
          if(this.data.data[i].completed){
            checkboxes[i].checked = true;
          }

        }
      }
    },
    mounted(){
      this.getData()
      var cthis = this
          setTimeout(function(){
            cthis.checkTheBoxes()
      },200)
      
    }
  }
</script>

<style lang="scss">
.delete{
  float:right;
}
.input{
  width:250px;
}
.button{
  padding-top:100px;
  width:100%;
}
.created{
  padding-top:1%;
  float:right;
  padding-bottom:10px;
}
.container{
  width:75%;

}
.completed{
   text-decoration: line-through;

}

@import "~bulma/bulma"
</style>
