angular.module('starter')

.controller('OthersController', function($scope,$http,$rootScope,$state,$ionicHistory) {
    $scope.data = {}; 
    $scope.image_gravatar='http://www.gravatar.com/avatar/'+md5($rootScope.emailAddress)+'?s=240';  
    $scope.user_name=$rootScope.fullName;
    var link = 'http://'+$rootScope.url+'/my_project/count_other.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                                    
                
                $scope.records = res.data;
                //console.log("page loaded");
                //console.log(res.data);
                //console.log("my count"+res.data.myPosts_count);
                //console.log("pending count"+res.data.pendingPosts_count);
                //console.log("notification count"+res.data.notification_count);
                                })
    $scope.logout = function(){
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('home');
    }
    
    
    $scope.is_admin= function(twtID){
       admin_is=0;
       if($rootScope.userType=="ADMIN"){
           admin_is=1;
       }
        return admin_is===1;
    }
   
    $scope.doRefresh =function() {
        var link = 'http://'+$rootScope.url+'/my_project/count_other.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                                    
                
                $scope.records = res.data;
                //console.log("page loaded");
                //console.log(res.data);
                //console.log("my count"+res.data.myPosts_count);
                //console.log("pending count"+res.data.pendingPosts_count);
                //console.log("notification count"+res.data.notification_count);
                                })
                $scope.$broadcast('scroll.refreshComplete');
                //console.log("page refreshed");
               
      } 
    
});