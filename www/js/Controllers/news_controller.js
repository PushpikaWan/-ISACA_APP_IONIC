angular.module('starter')
.controller('ListController', ['$scope', '$http', '$state','$rootScope',
    function($scope, $http, $state,$rootScope) {      
        
        $scope.image_url= 'http://'+$rootScope.url+'/my_project/img/event_img/';
        var link = 'http://'+$rootScope.url+'/my_project/events.php';
                $http.post(link, {
                                userID : $rootScope.userID
                                }).then(function (res){
                
                $scope.records = res.data.records;
                $scope.likes = res.data.liked;
                
                //set local variable from stored values in root scope
                 $scope.eventID=$rootScope.eventID;
                 $scope.eventName=$rootScope.eventName;
                 $scope.startingDate=$rootScope.startingDate;
                 $scope.startingTime=$rootScope.startingTime;
                 $scope.EndingingDate=$rootScope.EndingingDate;
                 $scope.endingTime =$rootScope.endingTime;
                 $scope.eventDesc=$rootScope.eventDesc;
                 $scope.venue = $rootScope.venue;
                 //console.log("page loaded");
                 //console.log(res.data);
                
      

      $scope.doRefresh =function() {
      $http.get('http://'+$rootScope.url+'/my_project/data_json.php').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }


         $scope.postClick = function (event_id) {
             
              for (var j = 0, len1 = $scope.records.length; j < len1; j++) {
                 if($scope.records[j].eventID==event_id){
                        $rootScope.eventID=$scope.records[j].eventID;
                        $rootScope.eventName=$scope.records[j].eventName;
                        $rootScope.startingDate=$scope.records[j].startingDate;
                        $rootScope.startingTime=$scope.records[j].startingTime;
                        $rootScope.EndingingDate=$scope.records[j].EndingingDate;
                        $rootScope.endingTime=$scope.records[j].endingTime;
                        $rootScope.eventDesc=$scope.records[j].eventDesc;
                        $rootScope.venue = $scope.records[j].venue;
                    //console.log("event set"+$rootScope.eventName);
                   
                 }
                 
                 
             }
             //console.log("event set"+$rootScope.eventName+" "+$rootScope.startingDate);
             $state.go('tabs.detail'); 
         }
        
    });
    
}]);
