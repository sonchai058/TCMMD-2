app.service('DataService',['$http',function($http){

	return {
		selectedItem: {},
		/*,
		endPointUrl: 'http://localhost:80/news/',
		loadNews: function(){
			return $http.get(this.endPointUrl);
		}*/
	};
}])