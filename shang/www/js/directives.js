angular.module('starter.directives', [])
  .directive('choose', function ($templateCache) {
    return {
      link: function (scope, element, attrs) {
        /**给每一个a添加click事件（有待优化）*/
        element.bind('click', function () {
          var tempHtml = $(this).parent('div').prev().html();
          var tempId = $(this).parent('div').prev().attr('pid');
          for (var i = 0; i < scope.postMsg.length; i++) {

            if (tempHtml === scope.postMsg[i].title) {
              scope.postMsg[i].t_id = attrs.id;
              scope.postMsg[i].t_name = $(this).html();
              break;
            }
          }
          console.log( scope.postMsg);
          $(this).addClass('btn-green').siblings().removeClass('btn-green');
        });
      }
    }
  })
