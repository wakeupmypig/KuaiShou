angular.module('starter.controllers', [])

    .controller('TestCtrl', function ($ionicPlatform, $rootScope, $cordovaNetwork) {

    })

    // .controller('DashCtrl', function($scope, Camera) {
    //     $scope.getPhoto = function() {
    //         Camera.getPicture().then(function(imageURI) {
    //             console.log(imageURI);
    //             $scope.lastPhoto = imageURI;
    //         }, function(err) {
    //             console.err(err);
    //         }, {
    //             quality: 80,
    //             targetWidth: 320,
    //             targetHeight: 320,
    //             saveToPhotoAlbum: false
    //         });
    //     };
    // })

  .controller('DashCtrl', function ($scope,ajax , $state) {
    $scope.homeurl = homeurl;
    var promise = ajax.query(homeurl + '/app/news/showNews');
    var banner = ajax.query(homeurl + '/app/index/bannerList');
    promise.then(function(response){
      return $scope.objs = response;
    },function(response){
      console.log('error');
    })
    banner.then(function(response){
      $scope.banners = response;
      console.log(response);
    },function(response){
      console.log('error');
    });



    $scope.goMessageInfo = function(messageId){
      ajax.query(homeurl + '/app/news/messageInfo?id='+messageId)
        .then(function(response){
          console.log(response.title);
          $state.go('tab.newsinfo',{
            title: response.title,
            create_time: response.create_time,
            content: response.content
          })
        },function(response){
          console.log('error');
        });
    }
  })
  .controller('newsInfoCtrl', function ($rootScope,$scope,$state,$stateParams) {
    $scope.goInfo= function () {
      $state.go('tab.info')
    }
      $scope.title=$stateParams.title;
      $scope.create_time=$stateParams.create_time;
      $scope.content=$stateParams.content;
  })


    .controller('ClassifyCtrl', function ($scope, ajax) {
      var promise = ajax.query(homeurl + "/App/Category/categorys_app");
      promise.then(function(response) {
        console.log(response)
        $scope.cs = response;
      }, function(response) {
        console.log('error');
      });
    })

  .controller('WorkingUCtrl', function ($rootScope,$scope,$ionicPopup,$timeout, $http,$state) {
    /*删除已完结的订单*/
    $scope.delFinOrder=function(param){
      console.log(param)
      var custCfmPopup = $ionicPopup.confirm({
        title: '确定要删除订单吗?',
        scope:$scope,
        cancelText: '取消',
        okText: '确认'
      });
      custCfmPopup.then(function(res) {
        console.log(res)
        if(res==true){
          console.log(1)
          $http({
            method: 'POST',
            url: homeurl + '/app/order/deleteOrder',
            params:{
              uid: window.localStorage['uid'],
              oid: param
            }
          }).success(function(res){
            console.log(res)
            $state.go('tab.workend',{},{reload: true});
          })
        }
      });
    }

    $scope.showConfirm = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          { text: '取消' },
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function(e) {
              return '1'
            }
          },
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log(id);
          $http({
            url:homeurl+'/App/order/cancelOrder',
            params:{
              oid:id,
              uid:localStorage['uid']
            }
          }).success(function (data) {
            console.log(data);
          })
        } else {
          console.log('not sure');
        }
      });
    };
    $scope.agree = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认完成交易?',
        buttons: [
          { text: '取消' },
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function(e) {
              return '1'
            }
          },
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          /*商户给朕打钱吧*/
          console.log('打钱');
          console.log(id);
          $http({
            url:homeurl+'/app/pay/pay',
            params:{
              oid:id,
            }
          }).success(function (data) {
            if(data.order_status==5){
              console.log('商户没钱');
              return;
            }
            $state.go('tab.workend',{},{reload:true})
            console.log(data);
          })
        } else {
          console.log('not sure');
        }
      });
    };
        $scope.homeurl = homeurl;
        $scope.usercenter= function () {
          console.log(1);
          $state.go('tab.usercenter');
        }
        $http({
            url: homeurl + "/App/Order/getOrderList",
            method: 'post',
            params: {
                uid: window.localStorage['uid'],
                status: 0
            }
        }).then(function successCallback(response) {
          console.log(response);
            if (response.data == 'null') {
                console.log("NULL");
            } else {
              console.log(response);
                $scope.orders = response.data;
            }
            console.log("OK");
        }, function errorCallBack(response) {
            console.log('error');
        });
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['uid'],
          status: 0
        }
      }).success(function(response) {
        if (response.data == 'null') {
          console.log("NULL");
        } else {
          $scope.orders = response;
        }
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
    })
  .controller('WorkingCtrl', function ($rootScope,$scope,$ionicPopup,$timeout, $http,$state, $stateParams) {
    $scope.dbBack = $stateParams.dbBack;
    $scope.goUserCenter= function () {
      $state.go("tab.usercenter");
    }
    $scope.showConfirm = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          { text: '取消' },
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function(e) {
              return '1'
            }
          },
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log(id);
          $http({
            url:homeurl+'/App/order/cancelOrder',
            params:{
              oid:id,
              uid:localStorage['uid']
            }
          }).success(function (data) {
            console.log(data);
          })
        } else {
          console.log('not sure');
        }
      });
    };
    $scope.agree = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认完成交易?',
        buttons: [
          { text: '取消' },
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function(e) {
              return '1'
            }
          },
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          /*商户给朕打钱吧*/
          console.log(res)
          console.log('打钱');
          console.log(id);
          $http({
            url:homeurl+'/app/pay/pay',
            params:{
/*add uid at 2015-12-23*/
              uid: window.localStorage['uid'],
              oid:id,
            }
          }).success(function (data) {
            if(data.order_status==5){
              console.log('商户没钱');
              return;
            }
            $state.go('tab.workend',{},{reload:true})
            console.log(data);
          })
        } else {
          console.log('not sure');
        }
      });
    };
    $scope.homeurl = homeurl;
    $scope.usercenter= function () {
      console.log(1);
      $state.go('tab.usercenter');
    }
    $http({
      url: homeurl + "/App/Order/getOrderList",
      method: 'post',
      params: {
        uid: window.localStorage['uid'],
        status: 1
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {
        console.log(response);
        $scope.orders = response.data;
      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['uid'],
          status: 1
        }
      }).success(function(response) {
        if (response.data == 'null') {
          console.log("NULL");
        } else {
          $scope.orders = response;
        }
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
  })

  .controller('OrderSuccessCtrl', function ($scope, $state) {
        $scope.goOrderList = function () {
            $state.go("tab.working");
        }
        $scope.goHome= function () {
          $state.go("tab.dash");
        }
    })
    .controller('OrderCheckCtrl', function ($scope, $state, $http,$stateParams) {
        $scope.nickname = window.localStorage['nickname'];
        $scope.mobile = window.localStorage['mobile'];
        $scope.address = window.localStorage['province'] + ", "
            + window.localStorage['city'] + ", "
            + window.localStorage['area'] + ", "
            + window.localStorage['address']

    var tmp='';

    $scope.titlename=[]
    if($stateParams.data==1) {
      tmp = JSON.parse(window.localStorage['allPro']);
      var temp =0;
      for(var i in tmp){
        temp+=parseInt(tmp[i].price);
        $scope.titlename.push(tmp[i].name);

      }
      $scope.price =temp;
    }else if($stateParams.data==3){

      tmp = JSON.parse(window.localStorage['other']);
      $scope.titlename.push(tmp.brand);
      $scope.price = '';
    }else{
      tmp = JSON.parse(window.localStorage['pro']);
      $scope.titlename.push(tmp.titleName);
      $scope.price = tmp.total;
    }

    $scope.goOrderSuccess = function () {
            var obj ={
              uid: window.localStorage['uid'],
              address: window.localStorage['address'],
              province: window.localStorage['province'],
              city: window.localStorage['city'],
              area: window.localStorage['area'],
              mobile: window.localStorage['mobile'],
            }
            if($stateParams.data==1){

            }else if($stateParams.data==3){
              obj['data']=window.localStorage['other'];
            }else{
              obj['data']=window.localStorage['pro'];
            }
            $http({
                url: homeurl + '/App/Order/saveOrder_app',
                method: 'post',
                params:obj,

            }).then(function successCallback(response) {
              console.log(response);
                if (response.data['code'] == 1) {
                    window.localStorage.removeItem("address");
                    window.localStorage.removeItem("province");
                    window.localStorage.removeItem("city");
                    window.localStorage.removeItem("area");
                    window.localStorage.removeItem("pro");
                    window.localStorage.removeItem("latlng");
                    $state.go("tab.orderSuccess");
                } else {
                    alert(response.data['message']);
                    return;
                }
                console.log("OK");
            }, function errorCallBack(response) {
                console.log('error');
            });
        }

        $scope.orderCancel = function () {
            window.localStorage.removeItem("address");
            window.localStorage.removeItem("province");
            window.localStorage.removeItem("city");
            window.localStorage.removeItem("area");
            window.localStorage.removeItem("latlng");
            window.localStorage.removeItem("pro");
            $state.go("tab.dash")
        }
    })

    .controller('ClassifyTypeCtrl', function ($scope, $stateParams, $http, $ionicLoading) {
        var $pid = $stateParams.typeId;
        $scope.homeurl = homeurl;

        $scope.show = function () {
            $ionicLoading.show({
                template: "获取数据中..."
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show();

        $http({
            url: homeurl + '/App/Category/categoryList_app',
            method: 'GET',
            params: {pid: $pid}
        }).then(function successCallback(response) {
            $scope.types = response.data;
            $scope.hide();
        }, function errorCallBack(response) {
            console.log("error");
            $scope.hide();
        });
    })


    .controller('ProductListCtrl', function ($scope, $stateParams, $http, $ionicLoading) {
        var $cid = $stateParams.categoryId;
        $scope.homeurl = homeurl;
        var data = '';
        function getMessages(obj,fn){
          var page =obj.page;
          var perPage = obj.perPage;
          if(!data) {
            $http({
              url: homeurl + '/App/Category/productList_app',
              method: 'GET',
              params: {cid: $cid}
            }).then(function successCallback(response) {
              over(response.data);
            }, function errorCallBack(response) {
              console.log("error");
            });
          }else{
            over(data);
          }
          function over(data){
            var temp =[];
            for(var i = (page-1)*perPage ;i <perPage*page;i++){
              if(data[i]==undefined){
                break;
              }
              temp.push(data[i]);
            }
            fn(temp);
          }

        }
        var vm = $scope.vm = {
          moredata: false,
          messages: [],
          pagination: {
            perPage:20,
            currentPage: 1
          },
          init: function () {
            getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
              vm.messages = data;
              $scope.lists=data;
            })
          },
          show: function (message) {
            if (message.static) {
              message.static = false;
            } else {
              message.static = true;
            }
          },
          doRefresh: function () {
            $timeout(function () {
              $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
          },
          loadMore: function () {
            vm.pagination.currentPage += 1;
            getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
              if (data.length == 0) {
                vm.moredata = true;
              };
              vm.messages = vm.messages.concat(data);
              $scope.lists=vm.messages;
              $scope.$broadcast('scroll.infiniteScrollComplete');
            })
          }
        }
        vm.init();
    })


    .controller('ProductCtrl', function ($scope, $stateParams) {
        var $pid = $stateParams.productId;
    console.log($pid);
        //$scope.product = TestData.get($stateParams.productId);
    })


    .controller('SearchCtrl', function ($scope, $http) {
        $scope.search = function () {
            $scope.homeurl = homeurl;

            if ($scope.searchText !== null && $scope.searchText !== '') {
                $http({
                    url: homeurl + '/App/Product/search',
                    method: 'GET',
                    params: {keyword: $scope.searchText}
                }).then(function successCallback(response) {
                    if (response.data == "null") {
                        console.log("Null");
                    } else {
                        $scope.products = response.data;
                    }
                }, function errorCallBack(response) {
                    console.log("error");
                });
            }
        };
    })


    .controller('CarCtrl', function ($scope, $http, $state) {
        //判断是否已经登陆
        //$scope.$on('$ionicView.beforeEnter', function () {
        //    if (window.localStorage['uid']) {
        //        $scope.login_ok = true;
        //    } else {
        //        $scope.login_ok = false;
        //    }
        //});

        $scope.remove = function (product) {
            $http({
                method: 'GET',
                url: homeurl + '/App/Cart/clearCart',
                params: {productId: product.id}
            }).then(function successCallback(response) {
                $state.go("tab.car", {}, {reload: true});
                console.log("ok");
            }, function errorCallback(response) {
                console.log("error");
            });
        }

        $scope.homeurl = homeurl;

        $http({
            method: 'GET',
            url: homeurl + '/App/Cart/showCart'
        }).then(function successCallback(response) {
            //debugger;

            if (response.data.code == 1) {
                var items = response.data;
                var proList = new Object();
                var i = 0;
                for (var item in items) {
                    if (item != 'total' && item != 'code') {
                        var p = new Object();
                        p.id = item;
                        p.name = items[item].title;
                        p.price = items[item].price;
                        p.image = items[item].images;
                        proList[i] = p;
                    } else {
                        $scope.total = items.total;
                    }
                    i++;
                }
                $scope.products = proList;
            }

        }, function errorCallback(response) {
            console.log("error");
        });
        $scope.allProducts= function (allProducts) {
         localStorage['allPro']=JSON.stringify(allProducts);
          $state.go('tab.downOrder',{data:1})
        }
    })


    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })


  .controller('InfoCtrl', function ($scope,$http,ajax,$state) {
    $http({
      url: homeurl + '/app/news/messageList',
      method: 'GET',
    }).then(function successCallback(response) {
      console.log(response);
      $scope.infos =response.data
    }, function errorCallBack(response) {

    });
    $scope.goMessageInfo = function(messageId){
      ajax.query(homeurl + '/app/news/messageInfo?id='+messageId)
        .then(function(response){
          console.log(response.title);
          $state.go('tab.newsinfo',{
            title: response.title,
            create_time: response.create_time,
            content: response.content
          })
        },function(response){
          console.log('error');
        });
    }
  })



  .controller('AccountCtrl', function ($scope, $http, $state, Camera) {

        //判断是否已经登陆
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.login_ok = window.localStorage['username'];
            //$scope.username = window.localStorage['username'];

            if (window.localStorage['uid']) {
                $state.go("tab.usercenter", {}, {reload: true});
            } else {
                $scope.password = '';
            }
        });

        //登陆
        $scope.login = function (username, password) {
            if (username == undefined || username == "" || password == undefined || password == "") {
                $scope.login_error = true;
                $scope.error_msg = "用户名和密码不能为空！";
                return;
            }

            $http({
                method: 'POST',
                url: homeurl + '/App/User/login_app',
                params: {
                    username: username,
                    password: password,
                    flag: true
                }
            }).then(function successCallback(response) {

                if (response.data['status'] == 1) {
                  window.localStorage["user_auth_sign"] = response.data['user_auth_sign'];
                  window.localStorage["uid"] = response.data['uid'];
                  $http({
                    url: homeurl + '/App/User/getUserInfo',
                    method: 'GET',
                    params: {uid: window.localStorage['uid']}
                  }).then(function successCallback(response) {
                    console.log(response);
                    if(!response.username){
                      window.localStorage['username']=response.data.username;
                      $state.go("tab.usercenter", {}, {reload: true});
                    }
                  }, function errorCallBack(response) {
                    console.log("error");
                  });
                    //$scope.login_ok = true;
                    //$scope.username = response.data['username'];


                } else {
                    //debugger;
                    $scope.error_msg = response.data;
                    $scope.login_error = true;
                }
            }, function errorCallback(response) {
                console.log("error");
            });
        };

        $scope.clear_msg = function () {
            $scope.login_error = false;
            $scope.error_msg = "";
        };
    })


    .controller('UserCenterCtrl', function ($scope, $state, $http,ajax) {
      $scope.passParam = function(){
        $state.go('tab.working',{'dbBack': 0})
      }
      $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.login_ok = window.localStorage['username'];
            //$scope.username = window.localStorage['username'];

            if (!window.localStorage['uid']) {
                $state.go("tab.account", {}, {reload: true});
            }
        });

        $scope.username = window.localStorage['username'];
        $http({
            url: homeurl + '/App/User/getUserInfo',
            method: 'GET',
            params: {uid: window.localStorage['uid']}
        }).then(function successCallback(response) {
            $scope.nickname = response.data['nickname'];
            if(response.data["sex"]=='男'){
              $scope.sel = '1';
            }else{
              $scope.sel = '0';
            }



            window.localStorage['nickname'] = response.data['nickname'];
          $scope.mobile =window.localStorage['mobile'] = response.data['mobile'];

        }, function errorCallBack(response) {
            console.log("error");
        });

        $scope.logout = function () {
            window.localStorage.clear();
            $state.go("tab.account", {}, {reload: true});
        };

        //$scope.goInfo = function () {
        //    $state.go("tab.userinfo", {}, {reload: true})
        //};

        //$scope.goOrder = function () {
        //    $state.go("tab.working", {}, {reload: true})
        //};
        $scope.goSetup = function(){
            $state.go('tab.setup')
        };
        $scope.usercenter= function () {
          $state.go('tab.usercenter');
        }



        $scope.changeSex = function(val){
            $http({
              method: 'POST',
              url: homeurl + '/app/user/modifySex',
              params: {uid: window.localStorage['uid'],
                  sex:parseInt(val)
              }
            }).success(function (response) {
              if(response.code==1){
                console.log('修改成功');
              }

            }).error(function () {

            })
        }
    })

    .controller('NickNameEditCtrl', function ($scope, $http, $state, $ionicPopup) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.nickname = window.localStorage['nickname'];
        });

        $scope.nicknameSave = function (nickname) {
            if (nickname == null || nickname == "") {
              $ionicPopup.alert({
                title: '请输入昵称!',
                okText: '确认'
              })
              return;
            } else {
                var uid = window.localStorage['uid'];

                $http({
                    method: 'POST',
                    url: homeurl + '/App/User/modifyNickname',
                    params: {
                        uid: uid,
                        nickname: nickname
                    }
                }).then(function successCallback(response) {
                    if (!response.data) {
                      $ionicPopup.alert({
                        title: '昵称已存在,请重新输入!',
                        okText: '确认'
                      })
                    } else {
                        $state.go("tab.userinfo", {}, {reload: true});
                    }
                }, function errorCallback(response) {
                    console.log("Error");
                });
            }
        }
    })

    .controller('MobileEditCtrl', function ($scope, $http, $state, $ionicPopup) {
        //$scope.msgclear = function () {
        //    $scope.msgerror = "";
        //}

        $scope.sendKey = function (mobile) {

            if (mobile == null || mobile == "") {
                //$scope.msgerror = "手机号不能为空";
              $ionicPopup.alert({
                title: '手机号不能为空!',
                okText: '确认'
              })
            } else {
                $http({
                    method: 'GET',
                    url: homeurl + '/App/User/checkPhoneNo',
                    params: {
                        mobile: mobile
                    }
                }).then(function successCallback(response) {
                    if (response.data == "") {
                        //$scope.msgerror = "手机号错误或已被注册。";
                      $ionicPopup.alert({
                        title: '手机号错误或已被注册!',
                        okText: '确认'
                      })
                    } else {
                        $scope.sendSms = true;
                    }
                }, function errorCallback(response) {
                    console.log("Error");
                });
            }
        }

        $scope.mobileSave = function (mobile, key) {
            if (key == null || key == "") {
                $scope.msgerror = "请填写验证码继续。"
                return;
            } else {
                $http({
                    method: 'GET',
                    url: homeurl + '/App/User/modifyPhoneNo',
                    params: {
                        verify: key,
                        mobile: mobile,
                        uid: window.localStorage['uid']
                    }
                }).then(function successCallback(response) {
                    if (!response.data) {
                        $scope.msgerror = "验证码错误,修改失败！";
                    } else {
                        $state.go("tab.userinfo", {}, {reload: true});
                    }
                }, function errorCallback(response) {
                    console.log("Error");
                });
            }
        }
    })

    .controller('RegistCtrl', function ($scope, $http, $state, $timeout) {

        $scope.msg = "获取验证码";
        $scope.isBtnGray=false;
        $scope.isBtnGreen=true;
        $scope.sendVerify = function (mobileNumber) {

            if (mobileNumber == undefined || mobileNumber == '') {
                $scope.reg_error = true;
                $scope.error_msg = "请填写手机号";
                return;
            }

            $http({
              method: 'POST',
              url: homeurl + '/App/User/check',
              params: {name: 'mobile', param: mobileNumber}
            }).then(function successCallback(response) {
                if (response.data['status'] == 'y') {
                    $http({
                        method: 'POST',
                        url: homeurl + '/App/User/sms_app',
                        params: {flag: 'reg', mobile: mobileNumber}
                    }).then(function successCallback(res) {
                        if (res.data['status'] !== 0) {
                            var wait = 180;

                            function time() {
                                if (wait == 0) {
                                    $scope.noSend = false;
                                    $scope.msg = "再次发生验证码";
                                    $scope.isBtnGray=false;
                                  $scope.isBtnGreen=true;
                                } else {
                                    $scope.isBtnGray=true;
                                    $scope.isBtnGreen=false;
                                    $scope.noSend = true;
                                    $scope.msg = "重新获取(" + wait + ")";
                                    wait--;
                                    $timeout(function () {
                                        time();
                                    }, 1000)
                                }
                            };

                            time();

                            console.log('ok');
                        } else {
                            console.log('error');
                        }
                    }, function errorCallback(response) {
                        console.log("error");
                    });
                } else {
                    $scope.reg_error = true;
                    $scope.error_msg = response.data['info'];
                }
            }, function errorCallback(response) {
                console.log("error");
            });
        };

        $scope.register = function (mobileNumber, verify, username, password, repassword) {

            if (mobileNumber == '' || mobileNumber == null) {
                $scope.reg_error = true;
                $scope.error_msg = "请输入合法的手机号码!";
                return;
            }else{
                var reg=/^1\d{10}$/;
                if(!reg.test(mobileNumber)){
                  $scope.reg_error = true;
                  $scope.error_msg = "请输入合法的手机号码!";
                  return;
                }
            }

            if (verify == '' || verify == null) {
                $scope.reg_error = true;
                $scope.error_msg = "请输入验证码";
                return;
            }

            if (username == '' || username == null) {
                $scope.reg_error = true;
                $scope.error_msg = "请输入用户名";
                return;
            }

            if (password == '' || password == null) {
                $scope.reg_error = true;
                $scope.error_msg = "请输入密码";
                return;
            }
            ;

            if (repassword == '' || repassword == null) {
                $scope.reg_error = true;
                $scope.error_msg = "请再出输入密码";
                return;
            }

            if (password != repassword) {
                $scope.reg_error = true;
                $scope.error_msg = "两次输入密码不一致";
                return;
            }

            $http({
                method: 'POST',
                url: homeurl + '/App/User/register_app',
                params: {
                    username: username,
                    password: password,
                    repassword: repassword,
                    verify: verify,
                    mobile: mobileNumber
                }
            }).then(function successCallback(response) {
              if(response.data['username']){
                window.localStorage["username"] = response.data['username'];
                window.localStorage["user_auth_sign"] = response.data['user_auth_sign'];
                window.localStorage["uid"] = response.data['uid'];
                $state.go("tab.usercenter", {}, {reload: true});
              }else{
                $scope.reg_error = true;
                $scope.error_msg = response.data;
              }
            }, function errorCallback(response) {

            });

        };

        $scope.clear_msg = function () {
            $scope.reg_error = false;
            $scope.error_msg = "";
        };
    })


    .controller('ProductInfoCtrl', function ($scope, $http, $stateParams, $location, $state) {
    $scope.homeurl=homeurl;
        if (!window.localStorage['pro']) {
            $state.go("tab.dash", {}, {reload: true});
            return;
        }

        var pro = JSON.parse(window.localStorage['pro']);
        $scope.list = pro;

        $scope.addCart = function () {
            var tmp = JSON.parse(window.localStorage['pro']);

            var arrs = new Object();
            for (var i = 0; i < tmp.data.length; i++) {
                arrs[tmp.data[i].pid.toString()] = tmp.data[i].t_id;
            }
            console.log('arrs',arrs);
            $http({
                url: homeurl + "/App/Order/addCart",
                method: 'post',
                params: {
                    productId: tmp.productId,
                    option: JSON.stringify(arrs)
                }
            }).then(function successCallback(response) {
              console.log(response)
                //alert("添加成功");
                $state.go("tab.car");
                window.localStorage.removeItem('pro');
                console.log('ok');
            }, function errorCallBack(response) {
                console.log('error');
            });

            console.log(arrs);
        };
    })


    .controller('ProductCtrl', function ($scope, $http, $stateParams, $location, $state, $ionicLoading) {
        //查看当前商品id
        var proId = $stateParams.productId;

        $scope.oSrc = $location.search().item;
        $scope.homeurl = homeurl;

        $scope.show = function () {
            $ionicLoading.show({
                template: "获取数据中..."
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show();
        $scope.img = '';
        $http({
            url: homeurl + "/app/product/getProduct_app/id/" + proId,
            method: 'GET',
        }).then(function successCallback(response) {
            $scope.lists = response.data;
            //console.log($scope.lists.title);
            var list = [];
            for (var i = 0; i < $scope.lists.option.length; i++) {
                var curObj = {};
                $scope.img= $scope.lists.image;
                curObj.title = $scope.lists.option[i].title;
                curObj.pid = $scope.lists.option[i].id;
                curObj.t_id = $scope.lists.option[i]._child[0].id;
                curObj.t_name = $scope.lists.option[i]._child[0].title;
                list.push(curObj);
            }
            list.push({"proId": $stateParams.productId});
            $scope.postMsg = list;
            $scope.hide();
        }, function errorCallBack(response) {
            $scope.hide();
            console.log("error");
        });
        $scope.foundPrice = function () {
            /**查询最终total值**/

            $http({
                url: homeurl + "/app/product/getProductPrice_app",
                method: 'post',
                params: $scope.postMsg
            }).then(function successCallback(response) {

                /*下个页面需要用到的数据*/
                var tempJSON = {};
                $scope.postMsg.pop();
                tempJSON.data = $scope.postMsg;
                tempJSON.total = response.data.totals;
                tempJSON.titleName = $scope.lists.title;
                tempJSON.productId = proId;
                tempJSON.path = $scope.img;
                //tempJSON.path = $scope.oSrc;

                /**当前用户选择后的内容 存到本地pro下*/
                window.localStorage['pro'] = JSON.stringify(tempJSON);
                $state.go("tab.productInfo");
            }, function errorCallBack(response) {
                console.log('error');
            });
        }
    })


    .controller('DownOrderCtrl', function ($scope,$http, $state, GeoService,$stateParams) {

        $scope.$on('$ionicView.beforeEnter', function () {
          console.log(!window.localStorage['allPro'])
            if ((!window.localStorage['pro']) &&(!window.localStorage['allPro'])) {
                $state.go("tab.dash", {}, {reload: true});
            }
        });


        if($stateParams.data=='1'){
          //购物车批量提交
          $scope.all=1;
        }else if($stateParams.data=='3'){
          $scope.all=3;
        }else{
          $scope.all=2;
        }


        new PCAS("province,请选择省份", "city,请选择城市", "area,请选择地区");
          var ele = document.getElementById('container');
          var markersArray = [];
          var map = new qq.maps.Map(ele, {
            center: new qq.maps.LatLng(39.916527, 116.397128),      // 地图的中心地理坐标。
            zoom: 12
          });
          citylocation = new qq.maps.CityService({
            complete: function (result) {
              map.setCenter(result.detail.latLng);
            }
          });
          citylocation.searchLocalCity();
        $scope.find = function (add) {
            if (add) {
                var p = document.getElementById("province").value + document.getElementById("city").value + document.getElementById("area").value;
              getPosition(p,add);
              function getPosition(p, addr) {
                $http({
                  url: 'http://apis.map.qq.com/ws/geocoder/v1/?callback=JSON_CALLBACK&key=KSYBZ-LOHH4-T6JUY-D37CF-2GVP7-47BMX&output=jsonp&address=' + p + addr,
                  method: 'jsonp',
                }).success(function (data) {
                  if (data.status == 0) {
                    var w = data.result.location.lat;
                    var h = data.result.location.lng;
                    var center = new qq.maps.LatLng(w, h);
                    var map = new qq.maps.Map(ele, {
                      center: center,      // 地图的中心地理坐标。
                      zoom: 12
                    });
                    function clearOverlays() {
                      if (markersArray) {
                        for (i in markersArray) {
                          markersArray[i].setMap(null);
                        }
                      }
                    }
                    clearOverlays();
                    var marker = new qq.maps.Marker({
                      position: center,
                      animation: qq.maps.MarkerAnimation.DROP,
                      map: map
                    });
                    markersArray.push(marker);
                    map.panTo(center);
                    map.zoomTo(16);
                    document.getElementById("abs").addEventListener("click", function () {
                      window.localStorage['address'] = addr;
                      window.localStorage['latlng'] = marker.position;
                      window.localStorage['province'] = document.getElementById("province").value;
                      window.localStorage['city'] = document.getElementById("city").value;
                      window.localStorage['area'] = document.getElementById("area").value;

                      if (window.localStorage['uid'] == undefined) {
                        $state.go("tab.account");
                        return;
                      } else {
                        $state.go("tab.orderCheck",{data:$scope.all},{reload:true});
                      }
                    })
                  }
                })
              }
            }
        };

    })
    .controller('QuickCtrl', function ($scope, $http, $state ,$ionicPopup) {
        $scope.type='手机';
        $scope.list = '';
    /**
     * 手机初始化方法
     */
        function init () {
      $http({
        url: homeurl + '/app/product/hotProductList',
        params: {
          type: 40,
        },
        method: 'GET',
      }).success(function (data) {
        console.log(data);
        $scope.list = data;
      });
    }
    init();
    /**
     * 坚听sub蓝内的切换
     */
        $scope.$on('change', function (e,a) {
          var type = a.toString();
          if(type==='家电'){
          }else if(type==='电脑'){
          }else if(type==='其他'){
          }else if(type==='手机'){
            init()
          }
        });

     /*
     * 验证快速入口提交内容是否为空
     * */
       $scope.ckInfo = function(val){
          if(val == null || val == '' || val == ' '){
            $ionicPopup.alert({
              title: '请选择品牌!',
              okText: '确认'
            })
          }
       }

    })
  .controller('repassword', function ($scope, $http, $state, $timeout) {
    $scope.msg = "获取验证码";
    $scope.isBtnGray=false;
    $scope.isBtnGreen=true;
    $scope.sendVerify = function (mobileNumber) {
      if (mobileNumber == undefined || mobileNumber == '') {
        $scope.reg_error = true;
        $scope.error_msg = "请输入合法的手机号码!";
        return;
      }else{
        var reg=/^1\d{10}$/;
        if(!reg.test(mobileNumber)){
          $scope.reg_error = true;
          $scope.error_msg = "请输入合法的手机号码!";
          return;
        }
      }
      $http({
        method: 'POST',
        url: homeurl + '/app/user/checkPhoneNo',
        params:{mobile:mobileNumber,flag:'fgt'}
      }).then(function successCallback(response) {
          var wait = 180;
          function time() {
            if (wait == 0) {
              $scope.noSend = false;
              $scope.msg = "再次发生验证码";
              $scope.isBtnGray=false;
              $scope.isBtnGreen=true;
            } else {
              $scope.isBtnGray=true;
              $scope.isBtnGreen=false;
              $scope.noSend = true;
              $scope.msg = "重新获取(" + wait + ")";
              wait--;
              $timeout(function () {
                time();
              }, 1000)
            }
          };
          time();
      });
    }

    $scope.commit = function (mobileNumber, number, newpassword, conpassword) {
      if (mobileNumber == '' || mobileNumber == null) {
        $scope.reg_error = true;
        $scope.error_msg = "手机号码输入有误";
        return;
      }
      if (number == '' || number == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请输入验证码";
        return;
      }
      if (newpassword == '' || newpassword == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请输入新密码";
        return;
      }
      if (conpassword == '' || conpassword == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请再次输入密码";
        return;
      }
      if (newpassword != conpassword) {
        $scope.reg_error = true;
        $scope.error_msg = "两次输入密码不一致";
        return;
      }
      $http({
        method: 'POST',
        url: homeurl + '/app/user/resetPassword',
        params: {
          mobile: mobileNumber,
          verify: number,
          password: newpassword
        }
      }).then(function successCallback(response) {
        console.log(response)
        if(response.data['code']=='1'){
          $state.go("tab.account");
        }else{
          $scope.reg_error = true;
          $scope.error_msg = response.data.message;
        }

      }, function errorCallback(response) {
        console.log("error");
      });
    };

    $scope.clear_msg = function () {
      $scope.reg_error = false;
      $scope.error_msg = "";
    };

  })

  .controller('usersetup',function($scope, $http, $state){
    $scope.goUpdatepwd = function(){
      $state.go('tab.updatepwd');
    }
  }).controller('ProductOtherCtrl',function($scope, $http, $state){
    $scope.otherProduct= function (a,b,c) {
      var obj = {
        brand:a,
        num:b,
        desc:c
      }
      localStorage['other']=JSON.stringify(obj);
      $state.go('tab.downOrder',{data:3})
    }

  })
  .controller('updatepwd',function($scope, $state,ajax){
    $scope.update = function(oldpassword, newpassword, conpassword) {
      if (oldpassword == '' || oldpassword == null) {
        $scope.reg_error = true;
        $scope.error_msg = "原始密码错误";
        return;
      }
      if (newpassword == '' || newpassword == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请输入新密码";
        return;
      }
      if (conpassword == '' || conpassword == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请再次输入新密码";
        return;
      }
      if (newpassword != conpassword) {
        $scope.reg_error = true;
        $scope.error_msg = "两次输入密码不一致";
        return;
      }
      var uid = window.localStorage['uid'];
      var promoise = ajax.post(homeurl + '/app/user/modifyPassword', {
        uid: uid,
        old_pwd: oldpassword,
        password: newpassword
      });
      promoise.then(function (response) {
        $state.go('tab.usercenter');
      }, function () {
        console.log('error');
      });
    }
  })
  .controller('orderProductInfoCtrl', function ($scope,$http,$stateParams) {
    var pid = $stateParams.id;
    var oid = $stateParams.oid;
    $scope.homeurl = homeurl;
    $http({
      url:homeurl+'/app/order/showOrderInfo/',
      params:{
        orderid:oid,
        proId:pid
      }
    }).success(function (response) {
       $scope.list= response;
      console.log($scope.list);
      console.log(response.product);
    })
  })

  .controller('customCtrl', function ($rootScope,$scope,$state,$http,$stateParams) {

  })

  .controller('balanceBCtrl',['$scope','$state','$http', function (scope,state,http) {
    http.get(homeurl+'/app/user/amountInfo/').success(function (data) {
      scope.mny=data.user_account;
    })
  }])

  .controller('cashBCtrl', function ($scope,$http,$ionicPopup) {
    /*可提现金额*/
    $http.get(homeurl+'/app/user/amountInfo/').success(function (data) {
      $scope.mny=data.user_account;
    });
    $scope.cashMny='';

    $scope.changMny= function (cashMny) {
      if(parseInt(cashMny)>parseInt($scope.mny)){
        $scope.show=true;
      }else{
        $scope.show=false;
      }
    }
    $scope.cash= function (a, v) {
      if((a!='')&&(v!='')&&(a!=undefined)&&(v!=undefined)){
        $http({
          url: homeurl+"/app/user/toWithdraw",
          method: 'post',
          params:{
            price:a,
            pay_account:v,
          }

        }).then(function successCallback(response) {
          console.log('提现啦');
          var alertPopup = $ionicPopup.alert({
            title: '已经成功啦',
            template: '稍后查看余额',
            buttons: [
              {
                text: '<b>确认</b>',
                type: 'button-positive btn-gre',

              }
            ]
          });

        }, function errorCallBack(response) {
          console.log('error');
        });
      }
    }
  })


  .controller('cashdetailBCtrl', function ($scope,$http) {

    $http({
      url: homeurl+"/app/user/billInfo/",
    }).then(function successCallback(response) {
      $scope.list = response.data;
      console.log(response);
    }, function errorCallBack(response) {
    });
  })

