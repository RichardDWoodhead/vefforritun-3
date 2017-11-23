
	Vue.component("modal",{
		props:["title","icon","wallpaper","title"],
		data:function(){
			return{
				active:false
			}
		},
		methods:{
			show_modal: function(){
				this.active = true
			},
			closeModal: function(){
				this.active = false
			}
		},	
		template:`
	<div class="card">
  		<div class="card-image">
   			<figure class="image is-4by3">
      			<img :src="wallpaper" alt="Placeholder image">
    		</figure>
 		</div>
 		<div class="card-content">
    		<div class="media">
      			<div class="media-left">
       				<figure class="image is-48x48">
          				<img :src="icon">
        			</figure>
     			 </div>
      		<div class="media-content">
        	<p class="title is-4">{{title}}</p>
        	<p class="subtitle is-6">@johnsmith</p>
      		</div>
   		</div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>`
	})


	var app = new Vue({
		el: "#app",
		data: {

			

		},

	})
