angular.module('starter')

.controller('NotificationController', ['$scope', '$http', '$state','$rootScope',
     function($scope, $http, $state,$rootScope) {
          var link = 'http://'+$rootScope.url+'/my_project/my_notifications.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                console.log("page loaded");
                console.log(res.data);
     })
     
     
     $scope.like_seen= function(x) {
     var seen=0;    
                for (var i = 0, len = $scope.records.length; i < len; i++) {
                    if($scope.records[i].tweetID==x){
                         if($scope.records[i].seenStatus=="YES"){
                              seen=1;
                             //console.log("1 like ditected"+x+"  "+$scope.records[i].likes);
                         }
                        
                    }
            }
            return  seen===1;
         
     }
     
     $scope.like_notseen= function(x) {
     var seen2=0;    
                for (var i = 0, len = $scope.records.length; i < len; i++) {
                    if($scope.records[i].tweetID==x){
                         if($scope.records[i].seenStatus=="NO"){
                              seen2=1;
                             //console.log("1 like ditected"+x+"  "+$scope.records[i].likes);
                         }
                        
                    }
            }
            return  seen2===1;
         
     }
     
      $scope.like_display_1 = function(x) {
            var is_liked_1=0;   //0 for false and 1 for true
            //check like status
            for (var i = 0, len = $scope.records.length; i < len; i++) {
                    if($scope.records[i].tweetID==x){
                         if($scope.records[i].likes==1){
                             is_liked_1=1;
                             //console.log("1 like ditected"+x+"  "+$scope.records[i].likes);
                         }
                        
                    }
            }
                
                return is_liked_1===1;
        };
    $scope.correct_likes=0;
    $scope.like_display_other = function(x) {
            var is_liked=0;   //0 for false and 1 for true
            //check like status
            for (var i = 0, len = $scope.records.length; i < len; i++) {
                    if($scope.records[i].tweetID==x){
                         if($scope.records[i].likes > 2){
                             is_liked=1;
                             $scope.correct_likes=$scope.records[i].likes - 1;
                            // console.log("0 like ditected"+x+"  "+$scope.records[i].likes);
                         }
                        
                    }
            }
                
                return is_liked===1;
        };
        //dispaly one and other person like
   $scope.like_display_one = function(x) {
            var is_liked_2=0;   //0 for false and 1 for true
            //check like status
            for (var i = 0, len = $scope.records.length; i < len; i++) {
                    if($scope.records[i].tweetID==x){
                         if($scope.records[i].likes == 2){
                             is_liked_2=1;
                             $scope.correct_likes=$scope.records[i].likes - 1;
                            // console.log("0 like ditected"+x+"  "+$scope.records[i].likes);
                         }
                        
                    }
            }
                
                return is_liked_2===1;
        };
  
    }    


    
]);