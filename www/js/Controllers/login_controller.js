angular.module('starter')
//http://ec2-52-25-59-45.us-west-2.compute.amazonaws.com/
.controller('LoginController', function($scope,$http,$rootScope,$state,$ionicHistory) {
    $scope.data = {};
    //$rootScope.url= "ec2-52-25-59-45.us-west-2.compute.amazonaws.com";
    $rootScope.url= "ucscisg.info";
    //$rootScope.url= "localhost";
    
    $scope.user_state="";
    $scope.login = function(){
  
        var link = 'http://'+$rootScope.url+'/my_project/login.php';
        $http.post(link, {username : $scope.data.username,
                          password: md5($scope.data.pass)}).then(function (res){
        $scope.response = res.data;
        //console.log(res.data);
        
        $rootScope.emailAddress = $scope.data.username;
        
        if(res.data.stat=="login successful"){
             $rootScope.firstName=res.data.firstName;
             $rootScope.lastName=res.data.lastName;
             $rootScope.fullName=res.data.firstName+" "+res.data.lastName;
             $rootScope.userID=res.data.userID;
             $rootScope.userType=res.data.userType;
             $rootScope.gravatarLink=res.data.gravatarLink;
             console.log("user"+ $rootScope.userType);
             $state.go('tabs.calendar');
        }
        else{
             $scope.user_state=res.data.stat;
             $state.go('home');   
        }
        })
    }
});
        
 


