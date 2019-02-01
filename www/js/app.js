// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

var $cordovaSQLite;

var app = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }


        if (window.cordova) {
            //db = $cordovaSQLite.openDB({ name: "nextflow.db" }); //device
            db = $cordovaSQLite.openDB({ name: "project.db", location: 'default' }); //device
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS items (item_id integer primary key, menu_id integer, cate_id integer, zone_id integer, name text, description text, address text, tel text, img text, price real, rate_statr integer, bookmark integer, latitude real, longitude real)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS images (img_id integer primary key, item_id integer, img_src text)");

            insert_items($cordovaSQLite);
            insert_images($cordovaSQLite);

            console.log("Android");
        } else {
            db = window.openDatabase("project5.db", '1', 'my', 1024 * 1024 * 100); // browser
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS items (item_id integer primary key, menu_id integer, cate_id integer, zone_id integer, name text, description text, address text, tel text, img text, price real, rate_statr integer, bookmark integer, latitude real, longitude real)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS images (img_id integer primary key, item_id integer, img_src text)");

            insert_items($cordovaSQLite);
            insert_images($cordovaSQLite);

            console.log("browser");
        }


    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/menu.html',
            controller: 'MenuController'
        });

    $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
        });

    $stateProvider
        .state('tran', {
            url: '/tran',
            templateUrl: 'views/tran.html',
        });

    $stateProvider
        .state('accom', {
            url: '/accom',
            templateUrl: 'views/accom.html',
        });

    $stateProvider
        .state('list', {
            url: '/list/:list_id',
            templateUrl: 'views/list.html',
            controller: 'ListController'
        });

    $stateProvider
        .state('detail', {
            url: '/detail/:detail_id',
            templateUrl: 'views/detail.html',
            controller: 'DetailController'
        });

    $stateProvider
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        });


    $stateProvider
        .state('about_us', {
            url: '/about_us',
            templateUrl: 'views/about_us.html',
        });

    $stateProvider
        .state('favorites', {
            url: '/favorites',
            templateUrl: 'views/favorites.html',
            controller: 'FavoritesController'
        });


    /*
        $stateProvider
        .state('detail', {
          url: '/detail',
          templateUrl: 'views/detail.html',
          controller: 'DetailController'
        })
    */

    $urlRouterProvider.otherwise('/home');
});

var insert_items = function($cordovaSQLite) {

    var query = "SELECT * FROM items";
    try {
        $cordovaSQLite.execute(db, query).then(function(res) {

            if (res.rows.length < 1) {
                $.getJSON("source/items.json", function(data) {
                    console.log("JSON Data: " + data);
                    $.each(data, function(key, val) {
                        //console.log(key + "value:: " + val.menu_id);
                        //console.log(val);

                        try {
                            var query = "INSERT INTO items (item_id, menu_id, cate_id, zone_id, name, description, address, tel, img, price, rate_statr, bookmark, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            $cordovaSQLite.execute(db, query, [val.item_id, val.menu_id, val.cate_id, val.zone_id, val.name, val.description, val.address, val.tel, val.img, val.price, val.rate_statr, val.bookmark, val.latitude, val.longitude]).then(function(res) {
                                //alert("INSERT ID -> " + res.insertId);
                                console.log("INSERT ID -> " + res.insertId);
                                //console.log(res);
                            }, function(err) {
                                console.error(err);
                                console.log("error insert");
                            });
                        } catch (err) { console.log(err.message); }
                    });
                });
            }
        }, function(err) {});
    } catch (err) { console.log('DB Error: ' + err.message); }

}

var insert_images = function($cordovaSQLite) {

    var query = "SELECT * FROM items";
    try {
        $cordovaSQLite.execute(db, query).then(function(res) {

            if (res.rows.length < 1) {
                $.getJSON("source/images.json", function(data) {
                    console.log("JSON Data: " + data);
                    $.each(data, function(key, val) {
                        //console.log(key + "value:: " + val.menu_id);
                        //console.log(val);

                        try {
                            var query = "INSERT INTO images (img_id, item_id, img_src) VALUES (?,?,?)";
                            $cordovaSQLite.execute(db, query, [val.img_id, val.item_id, val.img_src]).then(function(res) {
                                //alert("INSERT ID -> " + res.insertId);
                                console.log("INSERT ID -> " + res.insertId);
                                //console.log(res);
                            }, function(err) {
                                console.error(err);
                                console.log("error insert");
                            });
                        } catch (err) { console.log(err.message); }
                    });
                });
            }
        }, function(err) {});
    } catch (err) { console.log('DB Error: ' + err.message); }

}
