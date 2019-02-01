app.controller('ListController', ['$scope', '$stateParams', '$state', 'DataService', '$ionicLoading', '$ionicPlatform', '$cordovaSQLite', function($scope, $stateParams, $state, DataService, $ionicLoading, $ionicPlatform, $cordovaSQLite) {

    console.log($stateParams.list_id);
    $scope.list_id = $stateParams.list_id;

    $scope.ArrayName = ['Hotels', 'Apartments', 'Resorts', 'Guesthouses', 'Culture, Temple, Museums, Gallery, Old City, Zoo,   Waterfall, National park', 'Restaurant, Food Center, Cafe', 'Market, Shopping Malls', 'Sports, Spa, Fitness', 'University, School, Public Center, Library'];
    $scope.name = $scope.ArrayName[$scope.list_id - 1];

    $('#search_content').hide();

    $scope.search = {};
    $scope.search.choice = 1;

    $scope.case_option = 'Keyword';////////////////////////////////////////////////////////////////////////////////////////

    $scope.items = [];
    if ($scope.list_id <= 4 && $scope.list_id >= 1) {

        $ionicPlatform.ready(function() {
            $ionicLoading.show();

            var query = "SELECT * FROM items where menu_id=3 AND cate_id=" + $scope.list_id;
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

    } else {
        $scope.items.push({
            item_id: 1,
            name: "test",
            img: "img.jpg",
            description: "testtest1"
        });
        $scope.items.push({
            item_id: 2,
            name: "test2",
            img: "img.jpg",
            description: "testtest2"
        });
        $scope.items.push({
            item_id: 3,
            name: "test3",
            img: "img.jpg",
            description: "testtest3"
        });
        $scope.items.push({
            item_id: 4,
            name: "test4",
            img: "img.jpg",
            description: "testtest4"
        });
    }
    console.log($scope.items);



    $scope.showDetail = function(newsItem) {
        //console.log($scope.items[newsItem]);
        //DataService.selectedItem = $scope.items[newsItem];
        $state.go('detail', { detail_id: newsItem });
    }



    $scope.Search1 = function(newsItem) {
        console.log($scope.search.choice);
        console.log($scope.search.keyword);

        $scope.result_search = '';

        if ($scope.search.keyword) {
            $scope.items = [];

            $ionicPlatform.ready(function() {
                $ionicLoading.show();

                var query = "SELECT * FROM items where menu_id=3 AND cate_id=" + $scope.list_id + " AND (name like '%" + $scope.search.keyword + "%' OR description like '%" + $scope.search.keyword + "%')";
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

                        $scope.result_search = 'Result: Found '+res.rows.length+' Items.';
                        $ionicLoading.hide();

                    }, function(err) {});

                } catch (err) { console.log('DB Error: ' + err.message); }
            });

            //$scope.$apply(); //reload data ng-repeat
        } else {
            $scope.items = [];
            $ionicPlatform.ready(function() {
                $ionicLoading.show();

                var query = "SELECT * FROM items where menu_id=3 AND cate_id=" + $scope.list_id;
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
            //$scope.$apply(); //reload data ng-repeat
        }

        $('#search_content').toggle(300);
    }

    $scope.Search2 = function(newsItem) {
        console.log($scope.search.zone);
        console.log($scope.search.rate);
        console.log($scope.search.price);

        $scope.result_search = '';

        if ($scope.search.zone || $scope.search.rate || $scope.search.price) {

            $scope.items = [];

            var query = "SELECT * FROM items where menu_id=3 AND cate_id=" + $scope.list_id;

            if($scope.search.zone) {
                query = query+' AND zone_id='+$scope.search.zone;
            }

            if($scope.search.rate) {
                switch($scope.search.rate) {
                    case '1': query = query+' AND rate_statr BETWEEN 0 AND 1'; break;
                    case '2': query = query+' AND rate_statr BETWEEN 2 AND 3'; break;
                    case '3': query = query+' AND rate_statr BETWEEN 4 AND 5';  
                }  
            }

            if($scope.search.price) {
                switch($scope.search.price) {
                    case '1': query = query+' AND price < 1000'; break;
                    case '2': query = query+' AND price BETWEEN 1000 AND 3000'; break;
                    case '3': query = query+' AND price BETWEEN 3001 AND 5000'; break; 
                    case '4': query = query+' AND price > 5000'; break; 
                }  
            }

            $ionicPlatform.ready(function() {
                $ionicLoading.show();

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

                        $scope.result_search = 'Result: Found '+res.rows.length+' Items.';
                        $ionicLoading.hide();

                    }, function(err) {});

                } catch (err) { console.log('DB Error: ' + err.message); }
            });

        } else {
            $scope.items = [];
            $ionicPlatform.ready(function() {
                $ionicLoading.show();

                var query = "SELECT * FROM items where menu_id=3 AND cate_id=" + $scope.list_id;
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
            //$scope.$apply(); //reload data ng-repeat
        }
        $('#search_content').toggle(300);
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
