// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//全局变量
var homeurl = "http://test.kuaishou365.com";
//var homeurl = "http://www.kuaishou365.com";
//var homeurl = "http://demo.playbaby.cn";

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives', 'starter.services'])

    .run(function ($rootScope,$ionicPlatform,$templateCache, $timeout,$cordovaAppVersion,$ionicPopup,$http) {
    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess($rootScope) {
      $templateCache.removeAll();
    }
    $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }


            $timeout(checkUpdate,2000);
            function checkUpdate() {
              $http({
                url: homeurl + '/app/index/appInfo',
                method: 'GET',
                params:{
                  system: 2,
                  type: 1
                }
              }).success(function(appInfo){
                $rootScope.serverAppVersion = appInfo.verion;
                $rootScope.serverAppPath = homeurl + '/App/down/download?type=2';

                cordova.getAppVersion.getVersionNumber(function (version) {
                  if (version != $rootScope.serverAppVersion) {
                    showUpdateConfirm();
                  }
                });
                function showUpdateConfirm() {
                  var confirmPopup = $ionicPopup.confirm({
                    title: '版本升级',
                    template: '建议检查更新', //从服务端获取更新的内容
                    cancelText: '取消',
                    okText: '升级'
                  });
                  confirmPopup.then(function (res) {
                    if(res){
                      //调用浏览器打开下载链接，需要安装inappbrowser插件
                      window.open($rootScope.serverAppPath, '_system', 'location=yes');
                    }else{
                      confirmPopup.close();
                    }
                  });
                }

              })
            }





        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

   $httpProvider.defaults.withCredentials = true;

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        $ionicConfigProvider.views.maxCache(0);
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive

            .state('tab', {
                url: '',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('tab.to', {
                url: '/to',
                abstract: true,
                templateUrl: 'templates/user-order-tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/index',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl',

                    }
                }
            })

            .state('tab.classify', {
                url: '/classify',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/classify.html',
                        controller: 'ClassifyCtrl'
                    }
                }
            })

            .state ('tab.type', {
                url: '/classify/type/:typeId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/classify-types.html',
                        controller: 'ClassifyTypeCtrl'
                    }
                }
            })

            .state ('tab.productList', {
                url: '/productList/:categoryId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/product-list.html',
                        controller: 'ProductListCtrl'
                    }
                }
            })
              .state ('tab.productOther', {
              url: '/productOther',
              views: {
                'tab-dash': {
                  templateUrl: 'templates/product-other.html',
                  controller: 'ProductOtherCtrl'
                }
              }
            })
            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/dash-search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('tab.product', {
                url: '/product/:productId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/product.html',
                        controller: 'ProductCtrl'
                    }
                }
            })
            .state('tab.productInfo', {
                url: '/productInfo',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/product-info.html',
                        controller: 'ProductInfoCtrl',
                    }
                }
            })

            .state('tab.car', {
                url: '/car',
                views: {
                    'tab-car': {
                        templateUrl: 'templates/tab-car.html',
                        controller: 'CarCtrl'
                    }
                }
            })

            .state('tab.info', {
                url: '/info',
                views: {
                    'tab-info': {
                        templateUrl: 'templates/tab-info.html',
                        controller: 'InfoCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.usercenter', {
                url: '/usercenter',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-center.html',
                        controller: 'UserCenterCtrl'
                    }
                }
            })

            .state('tab.userinfo', {
                url: '/userinfo',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-info.html',
                        controller: 'UserCenterCtrl'
                    }
                }
            })

            .state('tab.nicknameEdit', {
                url: '/userinfo/nicknameEdit',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-nicknameEdit.html',
                        controller: 'NickNameEditCtrl'
                    }
                }
            })

            .state('tab.mobileEdit', {
                url: '/userinfo/mobileEdit',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-mobileEdit.html',
                        controller: 'MobileEditCtrl'
                    }
                }
            })

            .state('tab.userorder', {
                url: '/userorder',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-order.html',
                        controller: 'UserCenterCtrl'
                    }
                }
            })

            .state('tab.working', {
                url: '/userorder/working',
                params:{
                  'dbBack': null
                },
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-order-working.html',
                        controller: 'WorkingCtrl'
                    }
                }
            })

            .state('tab.workend', {
                url: '/userorder/workend',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/user-order-workend.html',
                        controller: 'WorkingUCtrl'
                    }
                }
            })

            .state('tab.regist', {
                url: '/regist',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/login-regist.html',
                        controller: 'RegistCtrl'
                    }
                }
            })

            .state('tab.downOrder', {
                url: '/downOrder',
                  cache:false,
                params:{
                  data:0
                },
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/order-down.html',
                        controller: 'DownOrderCtrl'
                    }
                }
            })

            .state('tab.orderCheck', {
                url: '/checkOrder',
                params:{
                  data:null
                },
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/order-check.html',
                        controller: 'OrderCheckCtrl'
                    }
                }
            })

            .state('tab.orderSuccess', {
                url: '/successOrder',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/order-success.html',
                        controller: 'OrderSuccessCtrl'
                    }
                }
            })

            .state('tab.test', {
                url: '/test',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/test.html',
                        controller: 'TestCtrl'
                    }
                }
            })
          .state('tab.quick', {
            url: '/quick',
            views: {
              'tab-dash': {
                templateUrl: 'templates/quick.html',
                controller: 'QuickCtrl'
              }
            }
          })
          .state('tab.repassword', {
            url: '/repassword',
            views: {
              'tab-dash': {
                templateUrl: 'templates/login-repassword.html',
                controller: 'repassword'
              }
            }
          })
          .state('tab.custom', {
            url: '/custom',
            views: {
              'tab-account': {
                templateUrl: 'templates/custom.html',
                controller:'customCtrl'
              }
            }
          })
          .state('tab.coding', {
            url: '/coding',
            views: {
              'tab-dash': {
                templateUrl: 'templates/coding.html',
              }
            }
          })
          .state('tab.setup',{
            url: '/setup',
            views:{
              'tab-account':{
                templateUrl: 'templates/user-setup.html',
                controller: 'usersetup'
              }
            }
          })
          .state('tab.updatepwd',{
            url: '/updatepwd',
            views: {
              'tab-account':{
                templateUrl: 'templates/updatepwd-login.html',
                controller: 'updatepwd'
              }
            }
          })
          .state('tab.newsinfo',{
            url: '/newinfo',
            params:{
              title: null,
              create_time:null,
              content: null
            },
            views: {
              'tab-info':{
                templateUrl: 'templates/news-detail.html',
                controller: 'newsInfoCtrl',

              }
            }
          })
          .state('tab.orderProductInfo',{
            url: '/orderProductInfo/:id/:oid',
            views: {
              'tab-account':{
                templateUrl: 'templates/order-product-info.html',
                controller: 'orderProductInfoCtrl',

              }
            }
          })

          .state('tab.balancemanageB',{
            url: '/usercenter/balancemanageB',
            views: {
              'tab-account': {
                templateUrl : 'templates/balance-manage.html'
              }
            }
          })
          .state('tab.balanceB', {
            url: '/usercenter/balanceB',
            views: {
              'tab-account': {
                templateUrl: 'templates/balance.html',
                controller: 'balanceBCtrl',
              }
            }
          })
          .state('tab.rechargeB', {
            url: '/usercenter/rechargeB',
            views: {
              'tab-account': {
                templateUrl: 'templates/recharge.html',
              }
            }
          })
          .state('tab.cashB', {
            url: '/usercenter/cashB',
            views: {
              'tab-account': {
                templateUrl: 'templates/cash.html',
                controller:'cashBCtrl'
              }
            }
          })
          .state('tab.rechargepayB', {
            url: '/usercenter/rechargepayB',
            views: {
              'tab-account': {
                templateUrl: 'templates/recharge-pay.html',
              }
            }
          })
          .state('tab.cashdetailB', {
            url: '/usercenter/cashdetailB',
            views: {
              'tab-account': {
                templateUrl: 'templates/cash-detail.html',
                controller:'cashdetailBCtrl'
              }
            }
          })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/index');

    })
