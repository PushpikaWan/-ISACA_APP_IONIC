angular.module('starter')

.controller('MyPostsController', ['$scope', '$http', '$state','$rootScope','$ionicPopup',
     function($scope, $http, $state,$rootScope,$ionicPopup) {
     //tempory like store
    var tempArr = new Array();
    
    $scope.image_url= 'http://'+$rootScope.url+'/my_project/img/tweet_img/';
    var link = 'http://'+$rootScope.url+'/my_project/my_posts.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                $scope.likes = res.data.liked;
                //console.log("page loaded");
                //console.log(res.data);
                
                 for (var j = 0, len1 = $scope.records.length; j < len1; j++) {
                        var temp_name= "tempStore"+$scope.records[j].tweetID;
                        tempArr[temp_name] = 0; //0 for unlike 1 for like
                        
                        for (var i = 0, len2 = $scope.likes.length; i < len2; i++) {
                            if($scope.likes[i].tweetID==$scope.records[j].tweetID){
                                tempArr[temp_name] = 1;
                                }
                        }
                        //console.log(temp_name+" like or unlike : "+ tempArr[temp_name]);
                 }
                
     
      $scope.check_like_zero = function(x) {
          return x==0;
      }
      $scope.check_like_notzero = function(x) {
          return x!=0;
      }
      $scope.display_like = function(x) {
            var is_liked=0;   //0 for false and 1 for true
            //check like status
          var temp_name_1= "tempStore"+x; 
           if(tempArr[temp_name_1] ==1){
                    is_liked=1;
           }      
                return is_liked===1;
        };
        
         $scope.display_unlike = function(x) {
            var is_unliked=0;   //0 for false and 1 for true
            //check like status
            var temp_name_2= "tempStore"+x; 
            if(tempArr[temp_name_2] ==1){
                    is_unliked=1;
            }      
                
                
                return is_unliked===0;
        };
    

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
    
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
   
         $scope.doRefresh =function() {
          var link = 'http://'+$rootScope.url+'/my_project/my_posts.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                $scope.likes = res.data.liked;
                $scope.$broadcast('scroll.refreshComplete');
                //console.log("page refreshed");
                //console.log(res.data);
                })
                
                     for (var j = 0, len1 = $scope.records.length; j < len1; j++) {
                        var temp_name= "tempStore"+$scope.records[j].tweetID;
                        tempArr[temp_name] = 0; //0 for unlike 1 for like
                        
                        for (var i = 0, len2 = $scope.likes.length; i < len2; i++) {
                            if($scope.likes[i].tweetID==$scope.records[j].tweetID){
                                tempArr[temp_name] = 1;
                                }
                        }
                        //console.log(temp_name+" like or unlike : "+ tempArr[temp_name]);
                 }
                
      }
      
    $scope.likeClick = function (tweet_id) {
         var temp_name_sp= "tempStore"+tweet_id; 
         //console.log("like button clicked");
         //console.log(tweet_id);
        if (tempArr[temp_name_sp]==0) {
             //send likes
                var link = 'http://'+$rootScope.url+'/my_project/like_increment.php';
                $http.post(link, {
                                userID : $rootScope.userID,
                                userName : $rootScope.fullName,
                                emailAddress: $rootScope.emailAddress,
                                tweetID :tweet_id
                                }).then(function (res){
                //console.log("liked");
                });
            //change state color and temp varible reuslt
            var temp_name_3= "tempStore"+tweet_id; 
            tempArr[temp_name_3] =1;
            
            //like count increment tempory
            
             for (var j = 0, len1 = $scope.records.length; j < len1; j++) {
                 if($scope.records[j].tweetID==tweet_id){
                     $scope.records[j].likes=parseInt($scope.records[j].likes)+1;
                 }
             }
            
             //console.log(temp_name_3+" like or unlike : "+ tempArr[temp_name_3]);
        } else {
            //send unlikes
            var link = 'http://'+$rootScope.url+'/my_project/like_decrement.php';
            $http.post(link, {
                                userID : $rootScope.userID,
                                tweetID :tweet_id
                                }).then(function (res){
                //console.log("unliked");
                });
            //change state color and temp varible reuslt
            var temp_name_4= "tempStore"+tweet_id; 
            tempArr[temp_name_4] =0; 
            
             for (var j = 0, len1 = $scope.records.length; j < len1; j++) {
                 if($scope.records[j].tweetID==tweet_id){
                     if($scope.records[j].likes>0){ $scope.records[j].likes=parseInt($scope.records[j].likes)-1; }
                 }
             }
            
            //console.log(temp_name_4+" like or unlike : "+ tempArr[temp_name_4]);
            
        }
        
    };
    
    $scope.myColor = function(tweet_id_col) {
    return white;
    };
    
    
    
    $scope.delete_post = function (tweet_id) {
        var link = 'http://'+$rootScope.url+'/my_project/delete_post.php';
                $http.post(link, {
                                userID : $rootScope.userID,
                                tweetID :tweet_id
                                }).then(function (res){
                
                //console.log(tweet_id+"post are deleted");
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