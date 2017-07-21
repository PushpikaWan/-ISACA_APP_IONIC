angular.module('starter')

.controller('QuestionController', ['$scope', '$http', '$state','$rootScope','$ionicPopup','$timeout',
    function($scope, $http, $state,$rootScope,$ionicPopup,$timeout) {
               var is_check_password=0; // 0 for no
               $scope.back_color="white"; 
               $scope.data = {};
               $scope.counter = 120;
               var question_1=0,question_2=0,question_3=0,question_4=0,question_5=0; // init all question values are false(0)
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="password" ng-model="data.wifi">',
                    title: 'Enter Password',
                    scope: $scope,
                    buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Ok</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                            //console.log("prevent default");
                            console.log("no password entered");
                        }
                    
                         else {
                                            //question numbers are hard coded
                                var link = 'http://'+$rootScope.url+'/my_project/question_load.php';
                                $http.post(link, {
                                                userID : $rootScope.userID,
                                                password : $scope.data.wifi
                                                //password
                                                }).then(function (res){
                                
                                $scope.records = res.data.records;
                                $scope.get_mk= res.data.mark_check;
                                console.log("first then fired");
                                is_check_password=1;
                                if(!$scope.records[0]){
                                    console.log("wrong password");
                                     $state.go('tabs.others');  
                                }
                                else{ 
                                     console.log("correct password");
                                    if($scope.get_mk[0].getMark!="NONE"){ //already did
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Report',
                                        template: 'Your attempts are over.Your final mark is '+ $scope.get_mk[0].getMark +'%'
                                        });
                                        alertPopup.then(function(res) {
                                        console.log('report shown here');
                                        });
                                        $state.go('tabs.others');
                                    }
                                    else{
                                        $scope.$broadcast('scroll.refreshComplete');
                                        $scope.startTimer();
                                    }
                                }
                                
                                //console.log(res.data.records);
                                })
                            return $scope.data.wifi;
                            
                        }
                        }
                    },
                    ]
                });
                myPopup.then(function(res) {
                    console.log('Tapped!', res);
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 80000);
                
                
                var marks=0;               
                //timer implementation
 
                var mytimeout = null; // the current timeoutID
            
                    $scope.myGoBack = function() {
                        //confirm back
                        if(is_check_password==1){
                                var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete post',
                        template: 'Are you sure you want to end this quiz?'
                        });
                        confirmPopup.then(function(res) {
                        if(res) {
                            //console.log('You are sure');
                            $scope.submit_answer();
                            $state.go('tabs.others');
                        } else {
                            //console.log('You are not sure');
                            
                        }
                        });
                        }
                    else{
                        $state.go('tabs.others');
                    }
                        //console.log('Back button action');
                        
                    }
                // actual timer method, counts down every second, stops on zero
                $scope.onTimeout = function() {
                    if($scope.counter ===  0) {
                        $scope.$broadcast('timer-stopped', 0);
                        $timeout.cancel(mytimeout);
                        return;
                    }
                    else if($scope.counter ==10 || $scope.counter==8 || $scope.counter==6 || $scope.counter== 4 || $scope.counter==2){
                       $scope.back_color="red";   
                    }
                    else if($scope.counter ==9 || $scope.counter==7 || $scope.counter==5 || $scope.counter== 3 || $scope.counter==1){
                       $scope.back_color="white";   
                    }
                    
                    $scope.counter--;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                };
            
                $scope.startTimer = function() {
                    mytimeout = $timeout($scope.onTimeout, 1000);
                };
            
                // stops and resets the current timer
                $scope.stopTimer = function() {
                    $scope.$broadcast('timer-stopped', $scope.counter);
                    $scope.counter = 120;
                    $timeout.cancel(mytimeout);
                };
            
                // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
                $scope.$on('timer-stopped', function(event, remaining) {
                    if(remaining === 0) {
                        $scope.back_color="white";
                        //console.log('your time ran out!');
                        $scope.submit_answer();
                    }
                    
                    
                });
                
                  // An alert dialog
                $scope.showAlert = function() {
                    var alertPopup = $ionicPopup.alert({
                    title: 'Report',
                    template: 'You got '+ marks +'% marks'
                    });
                    alertPopup.then(function(res) {
                    //console.log('report shown here');
                    });
                };
                
                
                $scope.get_answer = function(id,choise,answer) {
                    var is_visible=0;   //0 for false and 1 for true
                    //check like status
                    
                    if(choise==answer){
                     //   console.log(id+"correct answer"+choise+" "+ answer);
                        if(id==1){ question_1=1;}
                        else if(id==2){ question_2=1;}
                        else if(id==3){ question_3=1;}
                        else if(id==4){ question_4=1;}
                        else if(id==5){ question_5=1;}
                    }
                    else if(choise==1 || choise ==2 || choise ==3 || choise ==4 || choise==5) {
                       // console.log(id+"wrong answer"+choise+" "+ answer)
                        if(id==1){ question_1=0;}
                        else if(id==2){ question_2=0;}
                        else if(id==3){ question_3=0;}
                        else if(id==4){ question_4=0;}
                        else if(id==5){ question_5=0;}
                    }
                        return is_visible===1; //always return false
                };
                
                $scope.submit_answer = function(){
                    if(question_1==1){marks=marks+10;console.log("question 1 answer is correct");}
                        else{console.log("question 1 answer is wrong");}
                    if(question_2==1){marks=marks+10;console.log("question 2 answer is correct");}
                         else{console.log("question 2 answer is wrong");}
                    if(question_3==1){marks=marks+10;console.log("question 3 answer is correct");}
                         else{console.log("question 3 answer is wrong");}
                    if(question_4==1){marks=marks+10;console.log("question 4 answer is correct");}
                         else{console.log("question 4 answer is wrong");}
                    if(question_5==1){marks=marks+10;console.log("question 5 answer is correct");}
                         else{console.log("question 5 answer is wrong");}
                    
                    marks=marks*2;
                    //console.log("final mark is : "+marks);
                    
                    var link = 'http://'+$rootScope.url+'/my_project/question_marks.php';
                    $http.post(link, {
                                    userID : $rootScope.userID,
                                    questionSetID :"1",
                                    finalMarks : marks,
                                    RemainingSeconds : $scope.counter
                                    //password
                                    }).then(function (res){
                    
                      //console.log("data is sent");
                    })
                      $scope.showAlert();
                      $state.go('tabs.others');   
                    
                }
                
                 
    }]);
        
              