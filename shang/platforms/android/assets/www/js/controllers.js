angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope,ajax , $state ,$http ,$ionicPopup) {
      $scope.goOrder = function () {
        $state.go("tab.workingi")
      };
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
    .controller('newsInfoCtrl', function ($scope,$stateParams) {
        $scope.title=$stateParams.title;
        $scope.create_time=$stateParams.create_time;
        $scope.content=$stateParams.content;
    })
    .controller('WorkingCtrl', function ($scope, $http,$ionicPopup,$state, $stateParams) {
      $scope.dbBack = $stateParams.dbBack;
      $scope.goUserCenter= function () {
        $state.go("tab.usercenter");
      }
      $scope.refuse = function(id,type) {
        var confirmPopup = $ionicPopup.confirm({
          title: '确认退单吗亲?',
          buttons: [
            {text: '取消'},
            {
              text: '<b>确认</b>',
              type: 'button-positive btn-gre',
              onTap: function (e) {
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
                type:type,
                uid: window.localStorage['suid']
              }
            }).success(function (data) {
              console.log(data);
              $state.go('tab.workingw',{},{reload:true})
            })
          } else {
            console.log('not sure');
          }
        });
      }
      $scope.homeurl = homeurl;
      $scope.doRefresh=function () {
        $http({
          url: homeurl + "/App/Order/getOrderList",
          method: 'post',
          params: {
            uid: window.localStorage['suid'],
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



      $http({
        url: homeurl + "/app/order/getOrderList/",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
          status: 1
        }
      }).then(function successCallback(response) {
        console.log(response);
        if (response.data == 'null') {
          console.log("NULL");
        } else {

          $scope.orders = response.data;

        }
        console.log("OK");
      }, function errorCallBack(response) {
        console.log('error');
      });

      $scope.showConfirm = function(id) {
        var confirmPopup = $ionicPopup.confirm({
          title: '确定要提交吗?',
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
          console.log(id);
          if(res) {
            $http({
              url:homeurl+'/App/order/orderAffirm',
              params:{
                oid:id,
                uid:window.localStorage['suid']
              },
              method:'POST',
            }).success(function (data) {
              if(data.code==1){
                console.log('商户已经确认');
                $state.go('tab.working',{},{reload:true})
              }
            })
          } else {
            console.log('not sure');
          }
        });
      };
      })
  .controller('WorkingwCtrl', function ($scope, $http,$ionicPopup,$state) {
    /*删除已完结的订单*/
    $scope.delFinOrder=function(param,type){
      console.log(param);
      console.log(type);
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
              uid: window.localStorage['suid'],
              oid: param,
              type:type
            }
          }).success(function(res){
            console.log(res)
            $state.go('tabs.workingBw',{},{reload: true});
          })
        }
      });
    }

    $scope.refuse = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          {text: '取消'},
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function (e) {
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
              /**add the word of window*/
              uid: window.localStorage['suid']
            }
          }).success(function (data) {
            console.log(data);
            $state.go('tab.workingw',{},{reload:true})
          })
        } else {
          console.log('not sure');
        }
      });
    }
    $scope.homeurl = homeurl;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
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



    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
        status: 0
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {

        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });

    $scope.showConfirm = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要提交吗?',
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
        console.log(id);
        if(res) {
          $http({
            url:homeurl+'/App/order/orderAffirm',
            params:{
              oid:id,
              uid:window.localStorage['suid']
            },
            method:'POST',
          }).success(function (data) {
            if(data.code==1){
              console.log('商户已经确认');
              $state.go('tab.working',{},{reload:true})
            }
          })
        } else {
          console.log('not sure');
        }
      });
    };
  })
  .controller('WorkingiCtrl', function ($scope, $http,$ionicPopup,$state) {
    $scope.refuse = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          {text: '取消'},
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function (e) {
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
              uid: window.localStorage['suid']
            }
          }).success(function (data) {
            console.log(data);
            $state.go('tab.workingw',{},{reload:true})
          })
        } else {
          console.log('not sure');
        }
      });
    }
    $scope.homeurl = homeurl;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
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



    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
        status: 1
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {

        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });

    $scope.showConfirm = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要提交吗?',
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
        console.log(id);
        if(res) {
          $http({
            url:homeurl+'/App/order/orderAffirm',
            params:{
              oid:id,
              uid:window.localStorage['suid']
            },
            method:'POST',
          }).success(function (data) {
            if(data.code==1){
              console.log('商户已经确认');
              $state.go('tab.working',{},{reload:true})
            }
          })
        } else {
          console.log('not sure');
        }
      });
    };
  })
  .controller('WorkingwiCtrl', function ($scope, $http,$ionicPopup,$state) {
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
              uid: window.localStorage['suid'],
              oid: param
            }
          }).success(function(res){
            console.log(res)
            $state.go('tabs.workingBw',{},{reload: true});
          })
        }
      });
    }

    $scope.refuse = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          {text: '取消'},
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function (e) {
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
              /**add the word of window*/
              uid: window.localStorage['suid']
            }
          }).success(function (data) {
            console.log(data);
            $state.go('tab.workingw',{},{reload:true})
          })
        } else {
          console.log('not sure');
        }
      });
    }
    $scope.homeurl = homeurl;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
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



    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
        status: 0
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {
        $scope.orders = response.data;
      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });

    $scope.showConfirm = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要提交吗?',
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
        console.log(id);
        if(res) {
          $http({
            url:homeurl+'/App/order/orderAffirm',
            params:{
              oid:id,
              uid:window.localStorage['suid']
            },
            method:'POST',
          }).success(function (data) {
            if(data.code==1){
              console.log('商户已经确认');
              $state.go('tab.working',{},{reload:true})
            }
          })
        } else {
          console.log('not sure');
        }
      });
    };
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
    .controller('UserCenterCtrl', function ($scope, $state, $http,ajax,$stateParams) {
    $scope.toMine= function () {
      $state.go('tab.usercenter')
    }
    $scope.username = window.localStorage['username'];

        $http({
            url: homeurl + '/App/User/getUserInfo',
            method: 'GET',
            params: {uid: window.localStorage['suid']}
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
            $http({
              method: 'POST',
              url: homeurl + '/app/user/logout'
            }).success(function(res){
              console.log(res)
              $state.go("tab.account", {}, {reload: true});
            }).error(function(res){
              console.log('error');
            })
        };
/**2015-12-18 update**/
        //$scope.goInfo = function () {
        //    $state.go("tab.userinfo", {}, {reload: true})
        //};

        $scope.goOrder = function () {
            $state.go("tab.working",{'dbBack':0})
        };
/**2015-12-18 end**/
        $scope.changeSex = function(val){
            $http({
              method: 'POST',
              url: homeurl + '/app/user/modifySex',
              params: {uid: window.localStorage['suid'],
                  sex:parseInt(val)
              }
            }).success(function (response) {
              if(response.code==1){
                console.log('修改成功');
              }

            }).error(function (response) {
                console.log('error');
            })
        }
        $scope.uid=window.localStorage['suid'];
        $http({
          method: 'GET',
          url: homeurl + '/App/order/stapleOrderList',
          params: {
            uid: $scope.uid
          }
        }).success(function(response){
          $scope.tradeList=response;
        }).error(function(response){
          console.log('error');
        })
    })
    .controller('NickNameEditCtrl', function ($scope, $http, $state ,$ionicPopup) {
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
                var suid = window.localStorage['suid'];

                $http({
                    method: 'POST',
                    url: homeurl + '/App/User/modifyNickname',
                    params: {
                        uid: suid,
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
                        suid: window.localStorage['suid']
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
    .controller('usersetup',function($scope, $http, $state){
      $scope.goUpdatepwd = function(){
        $state.go('tab.updatepwd');
      }

      $http({
        method: 'POST',
        url: homeurl + '/app/user/orderReceivStatus'
      }).success(function(response){
        if(response.accept_order_status=='1'){
          $scope.manager=true;
        }else{
          $scope.manager=false;
        }
      })
      $scope.changeStatus=function(param){
        var statusValue;
        if(param==true){
          statusValue='1';
        }else{
          statusValue='0';
        }
        $http({
          method: 'POST',
          url: homeurl + '/app/user/modifyIsAcceptOrder',
          params: {
            status: statusValue,
            uid: window.localStorage['suid']
          }
        }).success(function(response){
          console.log(response)
        })
      }
    })
    .controller('ProductOtherCtrl',function($scope, $http, $state){
      $scope.downOrder= function (a, b, c) {
        $http({
          url:'',
          method:'post'
        }).success(function (data) {

        })
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
        var suid = window.localStorage['suid'];
        var promoise = ajax.post(homeurl + '/app/user/modifyPassword', {
          uid: suid,
          old_pwd: oldpassword,
          password: newpassword
        });
        promoise.then(function (response) {
          if(response.code=='1'){
            $state.go('tab.usercenter');
          }else{
            $scope.reg_error = true;
            $scope.error_msg = response.message;
            return;
          }

        }, function (response) {
          console.log('error');
        });
      }
    })



/**Start With Individual**/
  .controller('transactionCtrl',function ($scope,$http,$state) {
    $scope.pid=''
    $http({
      method: 'GET',
      url: homeurl + '/App/Category/categorys_app',
    }).success(function(response){
      $scope.proTypeList=response;
    }).error(function(response){
      console.log('error');
    })
    $scope.change=function (optionVal) {
      $http({
        method: 'GET',
        url: homeurl + '/App/Category/categoryList_app',
        params:{pid:optionVal}
      }).success(function(response){
        $scope.listall=response;
      }).error(function(response){
        console.log('error');
      })
    }
    $scope.saveTrade=function(optionVal,brand,guige,num,name,address,remark){
      if (optionVal == '' || optionVal == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请选择产品类型!";
        return;
      }

      if (brand == '' || brand == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请选择品牌!";
        return;
      }

      if (num == '' || num == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请选择数量!";
        return;
      }

      if (name == '' || name == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请输入合法的联系电话!";
        return;
      }else{
        var reg=/^1\d{10}$/;
        if(!name.match(reg)){
          $scope.reg_error = true;
          $scope.error_msg = "请输入合法的联系电话!";
          return;
        }
      }

      if (address == '' || address == null) {
        $scope.reg_error = true;
        $scope.error_msg = "请输入出货地址!";
        return;
      }
      $http({
        method: 'POST',
        url: homeurl + '/App/order/saveStapleOrder',
        params: {
          user_id: window.localStorage['suid'],
          product_type: optionVal,
          brand_id: brand,
          guige: guige,
          num: num,
          name: name,
          address: address,
          remark: remark
        }
      }).success(function(response){
          console.log(response)
          $state.go('tab.commitsucc',{},{reload:true});
      }).error(function(response){
          console.log('error');
      })
    }
    $scope.clear_msg = function () {
      $scope.reg_error = false;
      $scope.error_msg = "";
    };

  })
  .controller('grabCtrl',function ($scope,$ionicPopup,$http,$state) {
    $scope.homeurl = homeurl;
    $http({
      url: homeurl + "/App/order/grabOrderList",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {
        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
    /*首先判断余额是否超过临界的最低值*/
    $http({
      method: 'GET',
      //url: homeurl + '/app/user/amountInfo',
      url: homeurl + '/app/user/showUserAccount',
      params:{
        flag: 1
      }
    }).success(function(res){
      console.log(res)
      if(res.status == 0){
        $ionicPopup.alert({
          title: '商家余额不足,请等待充值!',
          okText: '确认'
        })
      }else{
        $scope.showConfirm = function(id) {
          var confirmPopup = $ionicPopup.confirm({
            title: '确认抢单?',
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
            console.log(res);
            if(res) {
              $http({
                url:homeurl+'/App/order/grabOrder',
                params: {
                  id :id,
                  uid:window.localStorage['suid'],
                  flag:0
                }
              }).then(function (response) {
                console.log(response.data)
                if(!response.data.code){
                  console.log('此订单已经被抢');
                }else{
                  $state.go('tab.working',{'dbBack': 1});
                }
              } )
            } else {
              console.log('not sure');
            }
          });
        };
      }
    })
  })
  .controller('orderProductInfoCtrl', function ($scope,$http,$stateParams) {
    $scope.homeurl= homeurl
    var pid = $stateParams.id;
    var oid = $stateParams.oid;
    console.log(pid)
    console.log(oid)
    $http({
      method: 'GET',
      url:homeurl+'/app/order/showOrderInfo/',
      params:{
        orderid: oid,
        proId: pid
      }
    }).success(function (response) {
      $scope.list= response;
      console.log(response);
    })
  })
  .controller('ProductCtrl', function ($scope, $http, $stateParams, $location, $state, $ionicLoading) {
    //查看当前商品id
    var proId = $stateParams.productId;
    var oid = $stateParams.orderId;
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
      console.log(response.data);
      $http({
        url:homeurl+'/app/order/showOrderInfo/',
        params:{
          orderid:oid,
          proId:proId
        }
      }).success(function (response) {
        var list = [];
        for (var i = 0; i < response.product[0].data.length; i++) {
          var curObj = {};
          $scope.img= $scope.lists.image;
          curObj.title = response.product[0].data[i].ptitle;
          curObj.pid = response.product[0].data[i].pid;
          curObj.t_id = response.product[0].data[i].t_id;
          curObj.t_name = response.product[0].data[i].title;
          list.push(curObj);
        }
        $scope.postMsg = list;
        $scope.hide();
        $scope.chooseNum=response.product[0].data;
      })
    }, function errorCallBack(response) {
      $scope.hide();
      console.log("error");
    });

    $scope.foundPrice = function () {
      /*商户议价选择订单配置*/
      var msg = $scope.postMsg;
      var data = {};
      data.data = msg;
      data["productId"]= $stateParams.productId;
      $http({
        url: homeurl + "/app/order/modifyOrder",
        method: 'post',
        params:{
          data:data,
          oid:oid
        },
      }).then(function successCallback(response) {
        console.log(response);
        $state.go('tab.working',{},{reload:true})
      }, function errorCallBack(response) {
        console.log('error');
      });
    }
  })

  .controller('AccountCtrl', function ($rootScope,$scope, $http, $state,Camera) {
    //判断是否已经登陆
    $rootScope.needPay = true;
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.navbar=true;

      $http({
        method: 'POST',
        url: homeurl + '/app/user/userIsLogin'
      }).success(function(res){
        console.log(res.uid)
        if (res.uid) {
          if (window.localStorage["user_level"] == 1) {
            $state.go("tabs.loginB", {}, {reload: true});
          } else {
            $state.go("tab.login", {}, {reload: true});
          }
        }
      })


/**2015-12-28 Update
      if (window.localStorage['suid']) {
        if(window.localStorage["user_level"]==1){
          $state.go("tabs.loginB", {}, {reload: true});
        }else{
          $state.go("tab.login", {}, {reload: true});
        }
      } else {
        $scope.password = '';
      }

 **/
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
          //商户端user_level=1 , parent_uid =0
          window.localStorage["suid"] = response.data['uid'];
          if ((response.data["user_level"] == 1) && (response.data["parent_uid"] == 0)) {
            window.localStorage["user_level"] = 1;
            $state.go('tabs.loginB');
            //散户user_leve =2 , parent_uid > 0
          } else if ((response.data["user_level"] == 2) && (response.data["parent_uid"] > 0)) {
            window.localStorage["user_level"] = 2;
            $state.go('tab.login');
          } else {
            console.log(response.data)
            $scope.error_msg = response.data;
            $scope.login_error = true;
          }
        }else{
          console.log(response.data.info)
          $scope.error_msg = response.data.info;
          $scope.login_error = true;
        }
      }, function errorCallback(response) {

        console.log("error");
      });
    };

    $scope.clear_msg = function () {
      $scope.login_error = false
      $scope.error_msg = "";
    };
  })


/****************************************************************/

/**Start With Bussiness**/
  .controller('NickNameEditBCtrl', function ($scope, $http, $state,$ionicPopup) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.nickname = window.localStorage['nickname'];
    });

    $scope.nicknameSave = function (nickname) {
      if (nickname == null || nickname == "") {
        //alert("请输入昵称");
        //return;
        $ionicPopup.alert({
          title: '请输入昵称!',
          okText: '确认'
        })
        return;
      } else {
        var suid = window.localStorage['suid'];
        $http({
          method: 'POST',
          url: homeurl + '/App/User/modifyNickname',
          params: {
            uid: suid,
            nickname: nickname
          }
        }).then(function successCallback(response) {
          if (!response.data) {
            $ionicPopup.alert({
              title: '昵称已存在,请重新输入!',
              okText: '确认'
            })
          } else {
            $state.go("tabs.userinfoB", {}, {reload: true});
          }
        }, function errorCallback(response) {
          console.log("Error");
        });
      }
    }
  })

  .controller('MobileEditBCtrl', function ($scope, $http, $state,$ionicPopup) {
    /*
    $scope.msgclear = function () {
        $scope.msgerror = "";
    }
    */
    $scope.sendKey = function (mobile) {

      if (mobile == null || mobile == "") {
        /*$scope.msgerror = "手机号不能为空";*/
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
            /*$scope.msgerror = "手机号错误或已被注册。";*/
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
            uid: window.localStorage['suid']
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
  .controller('managerBCtrl', function ($scope,$http,$ionicPopup,$state,$stateParams,$timeout) {
    $scope.showPopup=function(){
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<div class="list">\
        <label class="item item-input">\
        <span class="input-label">用户名：</span>\
      <input type="text" ng-model="data.name">\
        </label>\
        <label class="item item-input">\
        <span class="input-label">电话号：</span>\
      <input type="tel" ng-model="data.tel">\
        </label>\
        </div>',
        title: '请输入添加的用户名和电话',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<b>确定</b>',
            type: 'button-positive btn-gre',
            onTap: function(e) {
              //if($scope.data.tel){
              //  var reg=/^1\d{10}$/;
              //  if(!$scope.data.tel.match(reg)){
              //    myPopup.close();
              //    /*
              //     * 添加延迟使custAlert对话框关闭(由于在第一个myPopup关闭时会闪一下有延迟)
              //     * */
              //    $timeout(function () {
              //      var custAlert = $ionicPopup.alert({
              //        title: '请输入合法的手机号！',
              //        buttons: [
              //          { text: '确认',
              //            type: 'button-positive btn-gre',
              //          }
              //        ]
              //      })
              //    },400)
              //  }
              //}
              if ($scope.data.tel&&$scope.data.name) {
                // 填写了用户名和 和 手机号,并且符合手机号规则
                var reg=/^1\d{10}$/;
                if($scope.data.tel.match(reg)){


                      $http({
                        url:homeurl+'/App/user/addUser',
                        method:'post',
                        params:{
                          username:$scope.data.name,
                          password:'000000',
                          mobile:$scope.data.tel,
                          uid:localStorage['suid']
                        }
                      }).success(function (response) {
                        console.log(response.info+'||'+response.message)
                        $scope.res = response;
                        if(response.code == 1){
                          myPopup.close();
                          $state.go('tabs.managerB',{},{reload:true})
                        }else{
                          myPopup.close();
            /*
            * 添加延迟使custAlert对话框关闭(由于在第一个myPopup关闭时会闪一下有延迟)
            * */
                          $timeout(function () {
                            var custAlert = $ionicPopup.alert({
                              title: $scope.res.message||$scope.res.info,
                              buttons: [
                                { text: '确认',
                                  type: 'button-positive btn-gre',
                                }
                              ]
                            })
                          },400)
                        }
                      });
                }else{
                  myPopup.close();
                  /*
                   * 添加延迟使custAlert对话框关闭(由于在第一个myPopup关闭时会闪一下有延迟)
                   * */
                  $timeout(function () {
                    var formatAlert = $ionicPopup.alert({
                      title: '请输入合法的手机号！',
                      buttons: [
                        { text: '确认',
                          type: 'button-positive btn-gre',
                        }
                      ]
                    })
                  },400)
                }
                e.preventDefault();
              }
            }
          },
        ]
      })


    }
    $scope.changStatus= function (uid,name) {

      var status =name?1:0;
      console.log(status);


      $http({
        //商户让散户是否能看到抢购订单
        url:homeurl+'/App/user/modifyMerchantStatus',
        method:'post',
        params:{
          parent_uid :localStorage['suid'],
          uid:uid,
          status:status
        }
      }).success(function (response) {
        /*修改查看抢单状况*/
        var alertPopup = $ionicPopup.alert({
          title: '用户的状态以修改',
          buttons: [
            { text: '确认',
              type: 'button-positive btn-gre',},

          ],
          template: name?'已经开启抢单模式':'已经禁用抢单模式'
        });
        console.log(response);

      })
    }
    $http({
      /*读取用户列表*/
      url:homeurl+'/App/user/userList',
      params:{
        uid:localStorage['suid'],
        flag:0
      }
    }).success(function (response) {
      console.log(response);
      $scope.userList = response;
    })

    $scope.status = function(id){
      $http({
        url:homeurl+'/App/user/modifyMerchantStatus',
        params:{
          parent_uid:localStorage['suid'],
          uid:id
        }
      }).success(function (response) {
        $scope.userList = response;
      })
    }
    $scope.removeUser= function (id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认删除?',
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
        console.log(res);
        console.log(localStorage['suid']);
        if(res) {
          $http({
            url:homeurl+'/App/user/deleteUser/',
            method:'post',
            params:{
              parent_uid:localStorage['suid'],
              uid:id
            }
          }).success(function (response) {
            $state.go('tabs.managerB',{},{reload:true})
            console.log('删除用户');
          });
        } else {
          console.log('not sure');
        }
      });
    }
  })
  .controller('DashBCtrl', function ($rootScope,$scope,ajax ,$state ,$http ,$ionicPopup, $stateParams) {
/*2015-12-28 Update*/
    if($rootScope.needPay){
      $http({
        method: 'POST',
        url: homeurl + '/app/user/showUserAccount'
      }).success(function(res){
        console.log(res.status)
        if(res.status=='1'){
          $ionicPopup.alert({
            title: '余额即将接近底线,建议尽快充值!',
            okText: '确认'
          })
        }
        if(res.status=='2' || res.status=='3'){
          $ionicPopup.alert({
            title: '余额接近底线,为避免影响抢单,请尽快充值!',
            okText: '确认'
          })
        }
      });
      $rootScope.needPay=false;
    }
/*End*/
    $scope.homeurl = homeurl;
    var promise = ajax.query(homeurl + '/app/news/showNews');
    var banner = ajax.query(homeurl + '/app/index/bannerList');
    promise.then(function (response) {
      return $scope.objs = response;
    }, function (response) {
      console.log('error');
    })
    banner.then(function (response) {
      $scope.banners = response;
      console.log(response);
    }, function (response) {
      console.log('error');
    });
  })
  .controller('grabBCtrl',function ($scope,$ionicPopup,$http,$state) {
    $scope.homeurl = homeurl;
    $http({
      url: homeurl + "/App/order/grabOrderList",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {

        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
    /*首先判断余额是否超过临界的最低值*/
    $http({
      method: 'GET',
      //url: homeurl + '/app/user/amountInfo'
      url: homeurl + '/app/user/showUserAccount',
      params:{
        flag: 1
      }
    }).success(function(res){
      console.log(res)
      if(res.status == 0){
      //if(res.code == 0){
        console.log(res)
        $ionicPopup.alert({
          title: '余额不足,请尽快充值!',
          okText: '确认'
        })
      }else{
        $scope.showConfirm = function(id) {
          var confirmPopup = $ionicPopup.confirm({
            title: '确认抢单?',
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
            console.log(res);
            if(res) {
              console.log('123123');
              $http({
                url:homeurl+'/App/order/grabOrder',
                params: {
                  id :id,
                  uid:window.localStorage['suid'],
                  flag:0
                }
              }).then(function (response) {
                console.log(response.data);
                if(!response.data.code){
                  console.log('此订单已经被抢');
                }else{
                  $state.go('tabs.workingB',{'dbBack': 1});
                }
              } )
            } else {
              console.log('not sure');
            }
          });
        };
      }
    })
  })
  .controller('UserCenterBCtrl', function ($scope, $state, $http,ajax) {
    $scope.username = window.localStorage['username'];
    $http({
      url: homeurl + '/App/User/getUserInfo',
      method: 'GET',
      params: {uid: window.localStorage['suid']}
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
      $http({
        method: 'POST',
        url: homeurl + '/app/user/logout'
      }).success(function(res){
        $state.go("dash", {}, {reload: true});
      }).error(function(res){
        console.log('error');
      })
    };

    //$scope.goInfo = function () {
    //  $state.go("tabs.userinfoB", {}, {reload: true})
    //};

    $scope.goOrder = function () {
      $state.go("tabs.workingB", {'dbBack': 0}, {reload: true})
    };
    //$scope.goSetup = function(){
    //  $state.go('tabs.setupB')
    //}



    $scope.changeSex = function(val){
      $http({
        method: 'POST',
        url: homeurl + '/app/user/modifySex',
        params: {uid: window.localStorage['suid'],
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
  .controller('WorkingBwCtrl', function ($scope,$ionicPopup, $http,$state) {
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
              uid: window.localStorage['suid'],
              oid: param
            }
          }).success(function(res){
            console.log(res)
            $state.go('tabs.workingBw',{},{reload: true});
          })
        }
      });
    }
    /*分配给 djs吧～～*/
    $scope.share= function (id,type) {
      $http({
        /*读取用户列表*/
        url:homeurl+'/App/user/userList',
        params:{
          uid:localStorage['suid'],
          flag:1
        }
      }).success(function (response) {

        $scope.userList = response;
        console.log(response);
        $scope.userid=$scope.userList[0].id;

        /*selection用户选择*/
        $scope.selection= function (id) {
          $scope.userid=id;
        }
        var confirmPopup = $ionicPopup.confirm({
          title: '请选择要分配的散户!',
          scope:$scope,
          template: '<select ng-model="userid" ng-change="selection(userid)"  style="width: 100%">' +
          '<option ng-repeat="user in userList" value="{{user.id}}">{{user.username}}</option>' +
          '</select>',
          buttons: [
            {text: '取消'},
            {
              text: '<b>确认</b>',
              type: 'button-positive btn-gre',
              onTap: function (e) {
                return '1'
              }
            },
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            $http({
              url:homeurl+'/app/user/allotOrder',
              params:{
                parent_uid:localStorage['suid'],
                uid:$scope.userid,
                type:type,
                oid:id
              }
            }).success(function (data) {
              $state.go('tabs.workingB',{},{reload:true})
            }).error(function () {

            })
          } else {
            console.log('not sure');
          }
        });
      });
    };
    $scope.refuse = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          {text: '取消'},
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function (e) {
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
              uid:localStorage['suid']
            }
          }).success(function (data) {
            console.log(data);
            $state.go('tabs.workingBw',{},{reload:true})
          })
        } else {
          console.log('not sure');
        }
      });
    }
    $scope.homeurl = homeurl;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
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
    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
        status: 0
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {
        $scope.orders = response.data;
      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
    $scope.showConfirm = function(id,type) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要提交吗?',
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
        console.log(id);
        if(res) {
          $http({
            url:homeurl+'/App/order/orderAffirm',
            params:{
              oid:id,
              uid:window.localStorage['suid']
            },
            method:'POST',
          }).success(function (data) {
            if(data.code==1){
              console.log('商户已经确认');
              $state.go('tabs.workingB',{},{reload:true})
            }
          })
        } else {
          console.log('not sure');
        }
      });
    };
  })

  .controller('WorkingBCtrl', function ($scope,$ionicPopup, $http,$state, $stateParams) {
    $scope.dbBack = $stateParams.dbBack;

    $scope.goUserCenter= function () {
      $state.go("tabs.usercenterB");
    }
    /*分配给 djs吧～～*/
    $scope.share= function (id) {
      $http({
        /*读取用户列表*/
        url:homeurl+'/App/user/userList',
        params:{
          uid:localStorage['suid'],
          flag:1
        }
      }).success(function (response) {

        $scope.userList = response;
        console.log(response);
        $scope.userid=$scope.userList[0].id;

        /*selection用户选择*/
        $scope.selection= function (id) {
          $scope.userid=id;
        }
        var confirmPopup = $ionicPopup.confirm({
          title: '请选择要分配的散户!',
          scope:$scope,
          template: '<select ng-model="userid" ng-change="selection(userid)"  style="width: 100%">' +
          '<option ng-repeat="user in userList" value="{{user.id}}">{{user.username}}</option>' +
          '</select>',
          buttons: [
            {text: '取消'},
            {
              text: '<b>确认</b>',
              type: 'button-positive btn-gre',
              onTap: function (e) {
                return '1'
              }
            },
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            $http({
              url:homeurl+'/app/user/allotOrder',
              params:{parent_uid:localStorage['suid'],
                uid:$scope.userid,
                oid:id}
            }).success(function (data) {
              $state.go('tabs.workingB',{},{reload:true})
            }).error(function () {

            })
          } else {
            console.log('not sure');
          }
        });
      });
    };
    $scope.refuse = function(id,type) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认退单吗亲?',
        buttons: [
          {text: '取消'},
          {
            text: '<b>确认</b>',
            type: 'button-positive btn-gre',
            onTap: function (e) {
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
              type:type,
              uid:localStorage['suid']
            }
          }).success(function (data) {
            console.log(data);
            $state.go('tabs.workingBw',{},{reload:true})
          })
        } else {
          console.log('not sure');
        }
      });
    }
    $scope.homeurl = homeurl;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: window.localStorage['suid'],
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
    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: window.localStorage['suid'],
        status: 1
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {
        $scope.orders = response.data;
      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
    $scope.showConfirm = function(id,type) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要提交吗?',
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
        console.log(id);
        if(res) {
          $http({
            url:homeurl+'/App/order/orderAffirm',
            params:{
              oid:id,
              type:type,
              uid:window.localStorage['suid']
            },
            method:'POST',
          }).success(function (data) {
            if(data.code==1){
              console.log('商户已经确认');
              $state.go('tabs.workingB',{},{reload:true})
            }
          })
        } else {
          console.log('not sure');
        }
      });
    };
  })
  .controller('usersetupB',function($scope, $http, $state){
    $scope.goUpdatepwd = function(){
      $state.go('tabs.updatepwdB');
    }
  })
  .controller('ProductBCtrl', function ($scope, $http, $stateParams, $location, $state, $ionicLoading) {
    //查看当前商品id
    var proId = $stateParams.productId;
    var oid = $stateParams.orderId;
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
      console.log(response.data);
      $http({
        url:homeurl+'/app/order/showOrderInfo/',
        params:{
          orderid:oid,
          proId:proId
        }
      }).success(function (response) {
        var list = [];
        for (var i = 0; i < response.product[0].data.length; i++) {
          var curObj = {};
          $scope.img= $scope.lists.image;
          curObj.title = response.product[0].data[i].ptitle;
          curObj.pid = response.product[0].data[i].pid;
          curObj.t_id = response.product[0].data[i].t_id;
          curObj.t_name = response.product[0].data[i].title;
          list.push(curObj);
        }
        $scope.postMsg = list;
        $scope.hide();
        $scope.chooseNum=response.product[0].data;
      })
    }, function errorCallBack(response) {
      $scope.hide();
      console.log("error");
    });

    $scope.foundPrice = function () {
      /*商户议价选择订单配置*/
      var msg = $scope.postMsg;
      var data = {};
      data.data = msg;
      data["productId"]= $stateParams.productId;
      $http({
        url: homeurl + "/app/order/modifyOrder",
        method: 'post',
        params:{
          data:data,
          oid:oid
        },
      }).then(function successCallback(response) {
        console.log(response);
        $state.go('tabs.workingB',{},{reload:true})
      }, function errorCallBack(response) {
        console.log('error');
      });
    }
  })
  .controller('updatepwdB',function($scope, $state,ajax){
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
      var suid = window.localStorage['suid'];
      var promoise = ajax.post(homeurl + '/app/user/modifyPassword', {
        suid: suid,
        old_pwd: oldpassword,
        password: newpassword
      });
      promoise.then(function (response) {
        $state.go('tabs.usercenterB');
      }, function () {
        console.log('error');
      });
    }
  })

  /**2015-12-16 Begin**/
  .controller('WorkingCwCtrl', function ($scope,$ionicPopup, $http,$state,$stateParams) {
    $scope.userID=$stateParams.id;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: $stateParams.id,
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
    $scope.homeurl = homeurl;
    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: $stateParams.id,
        status: 0
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {

        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
  })

  .controller('WorkingCCtrl', function ($scope,$ionicPopup, $http,$state,$stateParams) {
    $scope.userID=$stateParams.id;
    $scope.doRefresh=function () {
      $http({
        url: homeurl + "/App/Order/getOrderList",
        method: 'post',
        params: {
          uid: $stateParams.id,
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
    $scope.homeurl = homeurl;
    $http({
      url: homeurl + "/app/order/getOrderList/",
      method: 'post',
      params: {
        uid: $stateParams.id,
        status: 1
      }
    }).then(function successCallback(response) {
      console.log(response);
      if (response.data == 'null') {
        console.log("NULL");
      } else {

        $scope.orders = response.data;

      }
      console.log("OK");
    }, function errorCallBack(response) {
      console.log('error');
    });
  })
  .controller('orderProductInfoBCtrl', function ($scope,$http,$stateParams) {
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
  .controller('allListBCtrl', function ($scope, $state, $http,ajax,$stateParams) {
    $scope.uid=window.localStorage['suid'];
    $http({
      method: 'GET',
      url: homeurl + '/App/order/stapleOrderList',
      params: {
        uid: $scope.uid
      }
    }).success(function(response){
      $scope.tradeList=response;
    }).error(function(response){
      console.log('error');
    })
  })
  .controller('InfoBCtrl', function ($scope,$http,ajax,$state) {
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
          $state.go('tabs.newsinfoB',{
            title: response.title,
            create_time: response.create_time,
            content: response.content
          })
        },function(response){
          console.log('error');
        });
    }
  })
  .controller('newsInfoBCtrl', function ($scope,$stateParams) {
    $scope.title=$stateParams.title;
    $scope.create_time=$stateParams.create_time;
    $scope.content=$stateParams.content;
  })


/**End With Bussiness**/


  .controller('balanceBCtrl',['$scope','$state','$http', function (scope,state,http) {
    http.get(homeurl+'/app/user/amountInfo/').success(function (data) {
      console.log(data)
      scope.mny=data.user_account;
    })
  }])
  .controller('balanceCtrl',['$scope','$state','$http', function (scope,state,http) {
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
        method: 'GET',
        url: homeurl+"/app/user/billInfo/",
        params: {
          uid: window.localStorage['suid']
        }
    }).then(function successCallback(response) {
        $scope.list = response.data;
    }, function errorCallBack(response) {
        console.log('error')
    });
  })
  .controller('cashCtrl', function ($scope,$http,$ionicPopup) {
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
            template:'稍后查看余额',
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
  .controller('cashdetailCtrl', function ($scope,$http) {

    $http({
      url: homeurl+"/app/user/billInfo/",
    }).then(function successCallback(response) {
      $scope.list = response.data;
      console.log(response);
    }, function errorCallBack(response) {
    });
  })
