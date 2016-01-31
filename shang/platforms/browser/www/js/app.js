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

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives', 'starter.services','starter.filters'])

  .run(function ($rootScope, $ionicPlatform, $state,  $location,$timeout,$ionicHistory,$cordovaToast,$cordovaKeyboard,$ionicPopup) {
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
    });

    $ionicPlatform.registerBackButtonAction(function (e) {

      e.preventDefault();

      function showConfirm() {
        var confirmPopup = $ionicPopup.confirm({
          title: '<strong>退出应用?</strong>',
          template: '你确定要退出应用吗?',
          okText: '退出',
          cancelText: '取消'
        });

        confirmPopup.then(function (res) {
          if (res) {
            ionic.Platform.exitApp();
          } else {
            // Don't close
          }
        });
      }

      // Is there a page to go back to?
      if ($location.path() == '/usercenterB' || $location.path() == '/usercenter' || $location.path() == '/grabB' || $location.path() == '/grab' || $location.path() == '/login' || $location.path() == '/loginB') {
        showConfirm();
      } else if ($ionicHistory.backView()) {
        // Go back in history
        if ($cordovaKeyboard.isVisible) {
          $cordovaKeyboard.close();
        } else {
          $ionicHistory.goBack();
        }
      } else {
        // This is the last page: Show confirmation popup
        showConfirm();
      }

      return false;
    }, 301);
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


    /**Public view**/
      .state('tab', {
        url: '',
        abstract: true,
        templateUrl: 'templates/individual/tabs.html'
      })
      .state('tab.account', {
        url: '/account',
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
      })
    /**End Public view**/
    /**Start with Individual**/
      .state('dash', {
        url: '/index',
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl',
      })
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/tab-dash.html',
            controller: 'DashCtrl',
          }
        }
      })
      .state('tab.transaction', {
      url: '/transaction',
      views: {
        'tab-dash': {
          templateUrl: 'templates/individual/blocktrade-commit.html',
          controller: 'transactionCtrl'
        }
      }
    })
      .state('tab.working', {
        url: '/userorder/working/:id',
        params:{
          'dbBack': null
        },
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-order-working.html',
            controller: 'WorkingCtrl'
          }
        }
      })
      .state('tab.workingi', {
        url: '/userorder/workingi/:id',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/user-order-workingi.html',
            controller: 'WorkingiCtrl'
          }
        }
      })
      .state('tab.workingwi', {
        url: '/userorder/workingwi/:id',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/user-order-workendi.html',
            controller: 'WorkingwiCtrl'
          }
        }
      })
      .state('tab.workingw', {
        url: '/userorder/workingw/:id',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-order-workend.html',
            controller: 'WorkingwCtrl'
          }
        }
      })
      .state('tab.info', {
        url: '/info',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/tab-info.html',
            controller: 'InfoCtrl'
          }
        }
      })
      .state('tab.newsinfo', {
        url: '/newinfo',
        params: {
          title: null,
          create_time: null,
          content: null
        },
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/news-detail.html',
            controller: 'newsInfoCtrl',

          }
        }
      })
      .state('tab.grab', {
        url: '/grab',
        views: {
          'tab-info': {
            templateUrl: 'templates/individual/grab.html',
            controller: 'grabCtrl',

          }
        }
      })
      .state('tab.orderProductInfo', {
        url: '/orderProductInfo/:id/:oid',
        views: {
          'tab-info': {
            templateUrl: 'templates/individual/order-product-info.html',
            controller: 'orderProductInfoCtrl',

          }
        }
      })
      .state('tab.usercenter', {
        url: '/usercenter',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-center.html',
            controller: 'UserCenterCtrl'
          }
        }
      })
      .state('tab.userinfo', {
        url: '/userinfo',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-info.html',
            controller: 'UserCenterCtrl'
          }
        }
      })
      .state('tab.nicknameEdit', {
        url: '/userinfo/nicknameEdit',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-nicknameEdit.html',
            controller: 'NickNameEditCtrl'
          }
        }
      })
      .state('tab.mobileEdit', {
        url: '/userinfo/mobileEdit',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-mobileEdit.html',
            controller: 'MobileEditCtrl'
          }
        }
      })
      .state('tab.setup', {
        url: '/setup',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/user-setup.html',
            controller: 'usersetup'
          }
        }
      })
      .state('tab.updatepwd', {
        url: '/updatepwd',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/updatepwd-login.html',
            controller: 'updatepwd'
          }
        }
      })
      .state('tab.usertrade',{
        url: '/usertrade/:id',
        views: {
          'tab-account':{
            templateUrl: 'templates/individual/user-blocktrade.html',
            controller: 'UserCenterCtrl'
          }
        }
      })
      .state('tab.commitsucc',{
        url: '/commitSuccess',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/trade-commitsucc.html',
          }
        }
      })
      .state('tab.product', {
        url: '/product/:productId/:orderId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/individual/product.html',
            controller: 'ProductCtrl'
          }
        }
      })
      .state('tab.balance', {
        url: '/usercenter/balance',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/balance.html',
            controller:'balanceCtrl'
          }
        }
      })
      .state('tab.recharge', {
        url: '/usercenter/recharge',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/recharge.html',
          }
        }
      })
      .state('tab.cash', {
        url: '/usercenter/cash',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/cash.html',
            controller:'cashCtrl'
          }
        }
      })
      .state('tab.cashdetail', {
        url: '/usercenter/cashdetail',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/cash-detail.html',
            controller:'cashdetailCtrl'
          }
        }
      })
      .state('tab.rechargepay', {
        url: '/usercenter/rechargepay',
        views: {
          'tab-account': {
            templateUrl: 'templates/individual/recharge-pay.html',
          }
        }
      })
      .state('tab.balancemanage',{
        url: '/usercenter/balancemanage',
        views: {
          'tab-account': {
            templateUrl : 'templates/individual/balance-manage.html'
          }
        }
      })

    /**End with Individual**/


/*Bussiness***********************************************************************************/

    /**Begin With Bussiness**/
      .state('tabs', {
        url: '',
        abstract: true,
        templateUrl: 'templates/bussiness/tabs.html'
      })
      .state('tabs.loginB', {
        url: '/loginB',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/tab-dash.html',
            controller: 'DashBCtrl',
          }
        }
      })
      .state('tabs.managerB', {
        url: '/managerB',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/manager.html',
            controller: 'managerBCtrl',
          }
        }
      })
      .state('tabs.usercenterB', {
        url: '/usercenterB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-center.html',
            controller: 'UserCenterBCtrl'
          }
        }
      })
      .state('tabs.grabB', {
        url: '/grabB',
        views: {
          'tab-info': {
            templateUrl: 'templates/bussiness/grab.html',
            controller: 'grabBCtrl',

          }
        }
      })
      .state('tabs.userinfoB', {
        url: '/userinfoB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-info.html',
            controller: 'UserCenterBCtrl'
          }
        }
      })
      .state('tabs.nicknameEditB', {
        url: '/userinfo/nicknameEditB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-nicknameEdit.html',
            controller: 'NickNameEditBCtrl'
          }
        }
      })
      .state('tabs.mobileEditB', {
        url: '/userinfo/mobileEditB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-mobileEdit.html',
            controller: 'MobileEditBCtrl'
          }
        }
      })
      .state('tabs.workingB', {
        url: '/userorder/workingB',
        params:{
          'dbBack': null
        },
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-order-working.html',
            controller: 'WorkingBCtrl'
          }
        }
      })
      .state('tabs.workingC', {
        url: '/userorder/workingC/:id',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/user-order-workingC.html',
            controller: 'WorkingCCtrl'
          }
        }
      })
      .state('tabs.workingBw', {
        url: '/userorder/workingBw',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-order-workend.html',
            controller: 'WorkingBwCtrl'
          }
        }
      })
      .state('tabs.workingCw', {
        url: '/userorder/workingCw/:id',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/user-order-workendC.html',
            controller: 'WorkingCwCtrl'
          }
        }
      })
      .state('tabs.productB', {
        url: '/productB/:productId/:orderId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/product.html',
            controller: 'ProductBCtrl'
          }
        }
      })
      .state('tabs.setupB', {
        url: '/setupB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/user-setup.html',
            controller: 'usersetupB'
          }
        }
      })
      .state('tabs.updatepwdB', {
        url: '/updatepwdB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/updatepwd-login.html',
            controller: 'updatepwdB'
          }
        }
      })
      .state('tabs.orderProductInfoB',{
        url: '/orderProductInfoB/:id/:oid',
        views: {
          'tab-info':{
            templateUrl: 'templates/bussiness/order-product-infoB.html',
            controller: 'orderProductInfoBCtrl',

          }
        }
      })
      .state('tabs.usertradeB',{
        url: '/usertradeB',
        views: {
          'tab-dash':{
            templateUrl: 'templates/bussiness/user-blocktradeB.html',
            controller: 'allListBCtrl'
          }
        }
      })
      .state('tabs.balancemanageB',{
        url: '/usercenter/balancemanageB',
        views: {
          'tab-account': {
            templateUrl : 'templates/bussiness/balance-manage.html'
          }
        }
      })
      .state('tabs.balanceB', {
        url: '/usercenter/balanceB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/balance.html',
            controller: 'balanceBCtrl'
          }
        }
      })
      .state('tabs.rechargeB', {
        url: '/usercenter/rechargeB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/recharge.html',
          }
        }
      })
      .state('tabs.cashB', {
        url: '/usercenter/cashB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/cash.html',
            controller:'cashBCtrl'
          }
        }
      })
      .state('tabs.rechargepayB', {
        url: '/usercenter/rechargepayB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/recharge-pay.html',
          }
        }
      })
      .state('tabs.cashdetailB', {
        url: '/usercenter/cashdetailB',
        views: {
          'tab-account': {
            templateUrl: 'templates/bussiness/cash-detail.html',
            controller:'cashdetailBCtrl'
          }
        }
      })
      .state('tabs.infoB', {
        url: '/infoB',
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/tab-info.html',
            controller: 'InfoBCtrl'
          }
        }
      })
      .state('tabs.newsinfoB', {
        url: '/newinfoB',
        params: {
          title: null,
          create_time: null,
          content: null
        },
        views: {
          'tab-dash': {
            templateUrl: 'templates/bussiness/news-detail.html',
            controller: 'newsInfoBCtrl',

          }
        }
      })
    /**End With Bussiness**/

      // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');

  })



