angular.module('espacoVC').factory('vcRequests', function($http) {

	var base_url = '/goldark-api/';
	var token = 'ncdyzh2XBzpTwDbrvUlSVHh22IkPsNxZDE5KSVsL0aBjXaNq1yVv1oYd68SDbrPERCR92RQwLTd8oGWTYYj4kQ==';
	var contType = 'application/json;charset=utf-8';
	var accept = 'application/json';

	return{
		getBuildings : function(){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				}
			});
		},
		getBuild : function(userid){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'user':userid}
			});
		},
		getBuilding : function(buildId){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'id':buildId}
			});
		},
		login : function(dataObj){
			return $http.post(base_url+'sessions',dataObj,{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token,
					'Content-Type' : contType
				} 
			});
		},
		tokenLogin : function(user, pass){
			return $http.get(base_url+'sessions',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'username':token, 'password' : pass}
			});
		},
		getPhotos : function(buildid){
			return $http.get(base_url+'photos',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'building':buildid}
			});
		},
		getStatus : function(buildid){
			return $http.get(base_url+'building_status',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'building':buildid}
			});
		}
	};
});