app.controller('DetailController', ['$scope', '$stateParams', '$state', 'DataService', '$ionicLoading', '$window', '$compile', '$ionicPlatform', '$cordovaSQLite', '$ionicSlideBoxDelegate', function($scope, $stateParams, $state, DataService, $ionicLoading, $window, $compile, $ionicPlatform, $cordovaSQLite, $ionicSlideBoxDelegate) {

    console.log($stateParams.detail_id);
    $scope.detail_id = $stateParams.detail_id;


    //$scope.item = DataService.selectedItem;
    //console.log($scope.item);

    $scope.item = [];

    $scope.openMap;
    $scope.centerOnMe;
    $scope.clickTest;

    $scope.imgs = [];

    $ionicPlatform.ready(function() {
        $ionicLoading.show();

        var query = "SELECT * FROM items where (menu_id<9 AND menu_id>2) AND item_id=" + $scope.detail_id;
        try {
            $cordovaSQLite.execute(db, query).then(function(res) {

                $scope.item = res.rows.item(0);
                console.log($scope.item);

                $scope.openMap = function() {
                    if($ionicPlatform.is('ios')){
                        //$window.location.href = "maps://maps.apple.com/?q=" + lat + "," + long;
                        //window.location.href = "maps://maps.apple.com/?q=" + lat + "," + long;
                        //http://maps.google.com/maps
                        $window.location.href = "maps://maps.apple.com/?q=" + $scope.item.latitude + "," + $scope.item.longitude;
                    }else {
                        $window.location.href = 'geo:' + $scope.item.latitude + ',' + $scope.item.longitude;
                    }
                }

                function initialize() {
                    var myLatlng = new google.maps.LatLng($scope.item.latitude, $scope.item.longitude);

                    var mapOptions = {
                        center: myLatlng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);

                    //Marker + infowindow + angularjs compiled ng-click
                    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                    var compiled = $compile(contentString)($scope);

                    var infowindow = new google.maps.InfoWindow({
                        content: compiled[0]
                    });

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: 'Uluru (Ayers Rock)'
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    $scope.map = map;
                }
                if (document.readyState === "complete") {
                    initialize();
                } else {
                    google.maps.event.addDomListener(window, 'load', initialize);
                }

                $scope.centerOnMe = function() {
                    if (!$scope.map) {
                        return;
                    }

                    $scope.loading = $ionicLoading.show({
                        content: 'Getting current location...',
                        showBackdrop: false
                    });

                    navigator.geolocation.getCurrentPosition(function(pos) {
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        $scope.loading.hide();
                    }, function(error) {
                        alert('Unable to get location: ' + error.message);
                    });
                };

                $scope.clickTest = function() {
                    //alert('Example of infowindow with ng-click')
                    $window.location.href = 'geo:43.07493,-89.381388';
                };

                var query1 = "SELECT * FROM images where item_id=" + $stateParams.detail_id;
                try {
                    $cordovaSQLite.execute(db, query1).then(function(res1) {

                    console.log(res1.rows.length);
                    for (i = 0; i < res1.rows.length; i++) {
                    /*
                        $scope.items.push({
                            item_id: res.rows.item(i).item_id,
                            name: res.rows.item(i).name,
                            img: res.rows.item(i).img,
                            description: res.rows.item(i).description
                        });
                    */
                        $scope.imgs.push(res1.rows.item(i));
                    }
                    $ionicSlideBoxDelegate.update();

                    console.log($scope.imgs);

                    }, function(err) {});

                } catch (err) { console.log('DB Error: ' + err.message); }

                $ionicLoading.hide();
            }, function(err) {});

        } catch (err) { console.log('DB Error: ' + err.message); }
    });


    $scope.bookmark_save = function(status) {
        try {
            var query = "UPDATE items set bookmark="+status+" where item_id="+$stateParams.detail_id;
            $cordovaSQLite.execute(db, query).then(function(res) {
                //alert("INSERT ID -> " + res.insertId);
                //console.log("UPDATE ID -> " + res.updateId);
                //console.log(res);

                $scope.item.bookmark = status;

            }, function(err) {
                console.error(err);
                console.log("error update");
            });
        } catch (err) { console.log(err.message); }

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
