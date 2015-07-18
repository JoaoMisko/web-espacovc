angular.module('espacoVC').service('myService', function() {

	var obj = {};
	obj.data = {};
	obj.build = {};

	return{
		setData: function(data){
			obj.data=data;
		},
		getData: function(){
			return obj.data;
		},
		clearData: function(){
			obj.data={};
		},
		setBuild: function(build){
			obj.build=build;
		},
		getBuild: function(){
			return obj.build;
		},
		clearBuild: function(){
			obj.build={};
		}

	};
});