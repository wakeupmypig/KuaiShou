angular.module('starter.services', [])

    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])

    .factory('GeoService', function ($ionicPlatform, $cordovaGeolocation) {
        var positionOptions = {timeout: 60000, enableHighAccuracy: true};

        return {
            getPosition: function () {
                return $ionicPlatform.ready().then(function () {
                    return $cordovaGeolocation.getCurrentPosition(positionOptions);
                })
            }
        };

    })

    .factory('TestData', function () {
        var products = [{
            id: 0,
            name: '三星 S6',
            price: '3800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/5458812509690.jpg'
        }, {
            id: 1,
            name: '苹果 5S',
            price: '2800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-11/5461d8f0536d2.jpg'
        }, {
            id: 2,
            name: 'SONY Z5',
            price: '4800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/54588c1a3670f.jpg'
        }, {
            id: 3,
            name: 'HTC H2',
            price: '1600',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/5458ace3ce8ff.jpg'
        }, {
            id: 4,
            name: 'Nexus 5',
            price: '1800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/54589fb156248.gif'
        }, {
            id: 5,
            name: 'Nexus 5',
            price: '1800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-12/5462d921a80a5.jpg'
        }, {
            id: 6,
            name: 'SONY L50U',
            price: '1800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/54589f8dae062.jpg'
        }, {
            id: 6,
            name: 'SONY L50T',
            price: '1800',
            image: 'http://www.kuaishou365.com/Uploads/Picture/2014-11-04/54589f9b13ab6.jpg'
        }];

        return {
            all: function () {
                return products;
            },
            remove: function (product) {
                products.splice(products.indexOf(product), 1);
            },
            get: function (productId) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].id === parseInt(productId)) {
                        return products[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Search', function () {
        return null;
    })

    .factory('Car', function () {
        return null;
    })
    .factory('ajax', function ($q,$http) {
        return {
          query: function (url) {
            var defer = $q.defer();
            $http.get(url).success(function (data) {
              defer.resolve(data);
            }).error(function (data) {
              defer.reject(data);
            });
            return defer.promise;
          },
          post: function (url,data) {
            var defer = $q.defer();
            $http({
              method:'POST',
              url:url,
              params:data
            }).success(function (data) {
              defer.resolve(data);
            }).error(function (data) {
              defer.reject(data);
            });
            return defer.promise;
          }
        }
    });
