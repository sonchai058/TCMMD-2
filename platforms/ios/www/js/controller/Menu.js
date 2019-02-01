app.controller('MenuController', ['$scope', '$state','DataService', function($scope, $state, DataService) {

//exitApp = DataService.exitApp;
 // A confirm dialog
 /*
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Exit',
     template: 'Are you sure you want to exit program?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
*/
//$scope.showConfirm();


//$state.go('detail');

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
