<template>

<div class="container">
  <input v-model="title" class="input">
  <button class="button" style="background-color:#a52929;color:#ffffff" @click="postData">Submit</button>
  <div v-for="task in data.data" class="box column">
  <taskBox @check=checkthebox :taskcompleted="task.completed" :list="task"></taskBox>
  </div>
  
</div>

</template>

<script>
import axios from "axios"
import taskBox from "./components/taskBox.vue"
export default {
  components:{taskBox},
  name: 'app',
  data () {
    return {
      data:[],
      title:""
    }
  },
  methods:{
    //hér er ég að senda gögnin í api-ið.

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
          this.title = ""
          
    },
    //hér er ég að senda það að "completed" breytan er true.
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
    //ég setti get data í fall til að geta nota það þegar ég uppfæri gögnin
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
       setTimeout(function(){
        //hér kalla ég á check the boxes í setTimeout til að kalla á það eftir að skjalið hlaðast. 
        cthis.checkTheBoxes()
      },200)

      },
      //hér haka ég við þau box sem eru "completed" í api-inu.
      checkTheBoxes:function(){
        var checkboxes = document.getElementsByClassName("checkbox")
        for (var i = checkboxes.length - 1; i >= 0; i--) {
          console.log(checkboxes)
          if(this.data.data[i].completed){
            checkboxes[i].checked = true;
          }else{
            checkboxes[i].checked = false;
          }

        }
      }
    },
    //hér kalla ég á get data til að hlaða api-inu í skjalið
    mounted(){
      this.getData()
      
    }
  }
</script>

<style lang="scss">
.button{
  background-color:blue;
}
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
