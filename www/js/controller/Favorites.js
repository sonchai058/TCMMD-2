app.controller('FavoritesController', ['$scope', '$stateParams', '$state', 'DataService', '$ionicLoading', '$ionicPlatform', '$cordovaSQLite', function($scope, $stateParams, $state, DataService, $ionicLoading, $ionicPlatform, $cordovaSQLite) {

    /*    console.log($stateParams.list_id);
        $scope.list_id = $stateParams.list_id;

        $scope.ArrayName = ['Hotels', 'Apartments', 'Resorts', 'Guesthouses', 'Culture, Temple, Museums, Gallery, Old City, Zoo,   Waterfall, National park', 'Restaurant, Food Center, Cafe', 'Market, Shopping Malls', 'Sports, Spa, Fitness', 'University, School, Public Center, Library'];
        $scope.name = $scope.ArrayName[$scope.list_id - 1];

        $('#search_content').hide();

        $scope.choice = 1;*/

    $scope.items = [];

    $ionicPlatform.ready(function() {
        $ionicLoading.show();

        var query = "SELECT * FROM items where bookmark=1";
        try {
            $cordovaSQLite.execute(db, query).then(function(res) {

                console.log(res.rows.length);
                for (i = 0; i < res.rows.length; i++) {
                    /*
                    $scope.items.push({
                        item_id: res.rows.item(i).item_id,
                        name: res.rows.item(i).name,
                        img: res.rows.item(i).img,
                        description: res.rows.item(i).description
                    });
                    */
                    $scope.items.push(res.rows.item(i));
                }

                $ionicLoading.hide();

            }, function(err) {});

        } catch (err) { console.log('DB Error: ' + err.message); }
    });


    console.log($scope.items);


    $scope.showDetail = function(newsItem) {
        //console.log($scope.items[newsItem]);
        //DataService.selectedItem = $scope.items[newsItem];
        $state.go('detail', { detail_id: newsItem });
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
