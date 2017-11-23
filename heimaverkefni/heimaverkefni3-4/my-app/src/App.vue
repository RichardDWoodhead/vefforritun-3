<template>
  <div id="app">
  <div class="buttons column">
    <input type="radio"  v-model="companyFilter" id="b1" value="all"  @click="sortByThing" checked="checked"><label for="b1">all</label> 
    <input type="radio" v-model="companyFilter" id="b2" value="Atlantsolía"  @click="sortByThing" checked><label for="b2">Atlantsolía</label>
    <input type="radio" v-model="companyFilter" id="b3" value="Costco Iceland"  @click="sortByThing" checked><label for="b3">Costco</label>
    <input type="radio" v-model="companyFilter" id="b4" value="Dælan" @click="sortByThing"><label for="b4">Dælan</label>
    <input type="radio" v-model="companyFilter" id="b5" value="N1" @click="sortByThing"><label for="b5">N1</label>
    <input type="radio" v-model="companyFilter" id="b6" value="Olís" @click="sortByThing"><label for="b6">Olís</label>
    <input type="radio" v-model="companyFilter" id="b7" value="ÓB" @click="sortByThing"><label for="b7">ÓB</label>
    <input type="radio" v-model="companyFilter" id="b8" value="Orkan"  @click="sortByThing" checked><label for="b8">Orkan</label>
    <input type="radio" v-model="companyFilter" id="b9" value="Orkan X"  @click="sortByThing" checked><label for="b9">Orkan X</label>
    <input type="radio" v-model="companyFilter" id="b10" value="Skeljungur"  @click="sortByThing" checked><label for="b10">Skeljungur</label>

  </div>
  <p style="padding-left:30%;padding-bottom:11px;" v-text="'fjöldi stöðva: '+tempList.length"></p>
    <div v-for="station in tempList" class="box columns">
      <div class="right column is-two-thirds">      
        <h3 class="title" v-text="station.company"></h3>
        <h3 class="title" v-text="station.name"></h3>
      </div>
      <div class="left column is-one-third">
        <h5 v-text="'bensin95: '+station.bensin95"></h5>
        <br><br><br>
        <h5 v-text="'diesel: '+station.diesel"></h5>  
      </div>
    </div>

  </div>

</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      data : [],
      tempList:[],
      companyFilter:"all"
    };
  },
  computed:{
    sortByThing(){
      console.log(this.companyFilter)
      this.tempList = this.data
        this.tempList = this.tempList.filter(function(station){
          if(station.company == this.companyFilter || this.companyFilter == "all"){
          return station
        }
    }.bind(this))
         this.tempList = this.tempList.sort(function(a,b){
          return parseFloat(a.bensin95) - parseFloat(b.bensin95);
         }.bind(this));
        return this.tempList
    }
  },
  mounted(){
    var cthis = this

    axios.get("http://apis.is/petrol")
      .then(function(responce){
        cthis.data = responce.data.results
        console.log(cthis.data)
      })

      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">

  @import "~bulma/bulma"

</style>
<style type="text/css">
  input{
    margin-left: 30px; 
  }
  .buttons{
    margin-left:25%;
    padding:10px;
  }
  .left{
   margin-left:10%;
  }
  .box{
    padding-top: 15px;
    margin-top:2%; 
    margin-left: 30%;
    margin-right: 30%;
    color:#a3a3a3;
  }
  .box:hover{
    color:black;
  }
</style>
