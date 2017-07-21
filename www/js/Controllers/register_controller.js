angular.module('starter')

.controller('RegisterController', function($scope,$http,$state,$rootScope) {
    $scope.data = {};
    $scope.user_state="";
    $scope.image_gravatar='http://www.gravatar.com/avatar/'+md5($scope.data.emailAddress)+'?s=240';
    $scope.image_url= 'http://'+$rootScope.url+'/my_project/img/user_img/';
    
    $scope.register = function(){
        
        $scope.image_gravatar='http://www.gravatar.com/avatar/'+md5($scope.data.emailAddress)+'?s=240';
        var link = 'http://'+$rootScope.url+'/my_project/register.php';
        
        if($scope.data.password==$scope.data.confirmPassword){
            $scope.user_state="";
            $http.post(link, {firstName : $scope.data.firstName,
                            lastName : $scope.data.lastName,
                            emailAddress: $scope.data.emailAddress,
                            password :  md5($scope.data.password)
                            }).then(function (res){
            $scope.response = res.data;
            //console.log(res.data);
            $state.go('home');
            })
            
        }
       else{
           $scope.user_state="password mismatch";
           //console.log("password mismatch");
       }
    }
    
    $scope.load_image = function(){
         $scope.image_gravatar='http://www.gravatar.com/avatar/'+md5($scope.data.emailAddress)+'?s=240';
    }
    
  //password=password_123   
});
        
 


