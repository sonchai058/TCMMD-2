app.controller('ControlController', ['$scope', '$state', 'DataService', '$ionicLoading', '$ionicPopup', function($scope, $state, DataService, $ionicLoading, $ionicPopup) {

    $scope.exitApp = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Exit',
            template: 'Are you sure you want to exit program?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                //console.log('You are sure');
                //ionic.Platform.exitApp(); // stops the app
                 ionic.Platform.exitApp();
            } else {
                //console.log('You are not sure');
            }
        });
    }

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
