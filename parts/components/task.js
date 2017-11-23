Vue.component("task-list", {
	template: `
		<ul>
			<task v-for='task in tasks' v-text='task.title'>

			</task>
		</ul>	`
		,

	data: function(){
		return {
			tasks: [
				{ title: "Fara í búðina", complete: true},
				{ title: "Skoða heiminn", complete : false},
				{ title: "Pota í lávaxna karlmenn", complete: true},
				{ title: "Nota lyklaborð sem innstungu", complete: false},
			]
		}
	}
})

Vue.component("task", {
	template: "<li><slot></slot></li>"
})


var app = new Vue({
	el: "#app",
	data: {

	}
})