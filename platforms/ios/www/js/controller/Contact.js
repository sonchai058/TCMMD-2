app.controller('ContactController', ['$scope', '$state', 'DataService', '$ionicLoading', '$ionicPlatform', '$cordovaSQLite', function($scope, $state, DataService, $ionicLoading, $ionicPlatform, $cordovaSQLite) {
 
  $scope.name = "Contacts";

  $scope.profiles = [];

  $ionicPlatform.ready(function() {
        $ionicLoading.show();

        var query = "SELECT * FROM items where menu_id=9";
        try {
            $cordovaSQLite.execute(db, query).then(function(res) {

                console.log(res.rows.length);
                for(i=0;i<res.rows.length;i++) {
                    $scope.profiles.push({name: res.rows.item(i).name,tel:res.rows.item(i).tel});
                }

                $ionicLoading.hide();

            }, function(err) {});
        
        } catch (err) { console.log('DB Error: ' + err.message); }
    });

/*
  $scope.profiles = [
    {name:'Police',tel:'191'},
    {name:'Tourist Police',tel:'1155'},
  ];
*/
    //$("ion-list ion-item:nth-child(1)").addClass("item-positive");

/*    $scope.news = [];

    $scope.loadNews = function() {

        $ionicLoading.show();

        NewsService.loadNews()
            .success(function(data){
                $ionicLoading.hide();
                console.dir(data);
                for (var i=0; i<data.length; i++) {
                    data[i].imageUrl = NewsService.endPointUrl+data[i].imageUrl;
                }
                $scope.news = data;
            })
            .error(function(error){
                $ionicLoading.hide();
                console.error('Error');
            });

    }

    $scope.showDetail = function(newsItem){
        NewsService.selectedNews = newsItem;
        $state.go('detail');
    }


    $scope.loadNews();*/


}])
