angular.module('starter.directives', [])
    .directive('choose', function ($templateCache) {
        return {
            link: function (scope, element, attrs) {
                /**给每一个a添加click事件（有待优化）*/
                element.bind('click', function () {
                    console.log(scope.postMsg);
                    var tempHtml = $(this).parent('div').prev().html();
                    var tempId = $(this).parent('div').prev().attr('pid');
                    for (var i = 0; i < scope.postMsg.length; i++) {
                        if (tempHtml === scope.postMsg[i].title) {
                            scope.postMsg[i].t_id = attrs.id;
                            scope.postMsg[i].t_name = $(this).html();
                            break;
                        }
                    }
                    $(this).addClass('btn-green').siblings().removeClass('btn-green');
                });
            }
        }
    })

    /*地图控制指令**/
  .directive('sub', function () {
    return {
      link: function (scope, element, attrs) {
          element.children('a').on('click', function () {

            element.children('a').removeClass('active');
         this.className = 'active'
            scope.$emit('change',this.innerHTML)
          })

      }
    }
  })
