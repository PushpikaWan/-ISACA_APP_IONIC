angular.module('starter')
.controller('ProfileController', function($scope,$http,$rootScope,$state,$ionicPopup) {
    $scope.data = {};
           $scope.image_gravatar='http://www.gravatar.com/avatar/'+md5($rootScope.emailAddress)+'?s=240'; 
           $scope.cur_password="Enter your current password";
           $scope.type_field="none";
           var pass="NONE";
          var link = 'http://'+$rootScope.url+'/my_project/profile.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data;
                pass=$scope.records.password;
                console.log(res.data);
                console.log($scope.records.password);
                //console.log(res.data.firstName);
        })
   
   $scope.change_password = function(){
       console.log("button clicked");
       console.log("pass"+pass);
       console.log("entered"+md5($scope.data.password));
        if(pass==md5($scope.data.password)){
            console.log("password matched");
            $scope.type_field="true";
        }
        else{
            $scope.showAlert();
        }
        
   }
   
   $scope.update_profile = function(){
            
         if($scope.data.newpassword==$scope.data.confirmpassword){
            var link = 'http://'+$rootScope.url+'/my_project/update_profile.php';
                    $http.post(link, {
                                    userID : $rootScope.userID,
                                    password:md5($scope.data.newpassword)
                                    }).then(function (res){
                    
                    $scope.records = res.data;
                    console.log("updated");
                    //console.log(res.data.firstName);
                    //if it's success
                    
            })
            $state.go('tabs.others'); 
         }
         else{
             $scope.showAlert();
         }    
   }   
   
   // An alert dialog
   $scope.showAlert = function() {
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'password mismatch'
                    });
                    alertPopup.then(function(res) {
                    //console.log('report shown here');
                    });
   };
   
   $scope.cancel_update = function(){
       $state.go('tabs.others'); 
   } 
    
});
        
 


