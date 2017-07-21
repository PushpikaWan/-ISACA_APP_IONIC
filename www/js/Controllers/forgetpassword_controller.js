angular.module('starter')

.controller('ForgetPasswordController', function($scope,$http,$rootScope,$state) {
    $scope.data = {};
    $scope.mail_state="";
    $scope.sendRequest = function(){
  
        var link = 'http://'+$rootScope.url+'/my_project/forgetpw/forgot_password.php';
        $http.post(link, {emailAddress : $scope.data.emailAddress }).then(function (res){
        $scope.response = res.data;
        //console.log(res.data);
        $scope.mail_state=$scope.response;
        if(res.data=="Password reset email have been sent."){
            //$state.go('home'); 
            $scope.data.emailAddress="";
        }
        else{
             //$state.go('home');   
        }
        })
    }
});
        
 


