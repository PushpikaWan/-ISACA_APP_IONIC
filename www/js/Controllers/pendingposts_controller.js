angular.module('starter')

.controller('PendingPostsController', ['$scope', '$http', '$state','$rootScope','$ionicPopup',
     function($scope, $http, $state,$rootScope,$ionicPopup) {
     
    $scope.image_url= 'http://'+$rootScope.url+'/my_project/img/tweet_img/';
    var link = 'http://'+$rootScope.url+'/my_project/pending_posts.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                $scope.likes = res.data.liked;
                //console.log("page loaded");
                //console.log(res.data);
     
      $scope.doRefresh =function() {
          var link = 'http://'+$rootScope.url+'/my_project/pending_posts.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                $scope.likes = res.data.liked;
                $scope.$broadcast('scroll.refreshComplete');
                //console.log("page refreshed");
                //console.log(res.data);
                })
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
    
    $scope.myColor = function(tweet_id_col) {
    return white;
    };
    
    $scope.is_image_avilable= function(twtID){
        var swt = 0;
        for (var k = 0, len_1 = $scope.records.length; k < len_1; k++) {
             if($scope.records[k].tweetID==twtID){
                 if($scope.records[k].image=="YES"){
                      swt=1; 
                 }
               
             }
        }
        return swt===1;
    }
   
    $scope.delete_post = function (tweet_id) {
        var link = 'http://'+$rootScope.url+'/my_project/delete_post.php';
                $http.post(link, {
                                userID : $rootScope.userID,
                                tweetID :tweet_id
                                }).then(function (res){
                
               // console.log(tweet_id+"post are deleted");
                $scope.doRefresh();
                });
    }
   
            // A confirm delete dialog
    $scope.showConfirm = function(twt_id) {
        var confirmPopup = $ionicPopup.confirm({
        title: 'Delete post',
        template: 'Are you sure you want to delete this post?'
        });
        confirmPopup.then(function(res) {
        if(res) {
            $scope.delete_post(twt_id);
            //console.log('You are sure');
        } else {
            //console.log('You are not sure');
        }
        });
    };
   
}])