angular.module('starter.filters', [])
    .filter('mytime',function(){
      return function (i) {
        var temp= i.split(' ');
        return temp[0]
      }
    })
