// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider
  
    
  
    
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'LoginController'
        
    })
    
      .state('forms', {
      url: '/home/forms',
      templateUrl: 'templates/forms.html',
      controller: 'RegisterController'
        
    })
    
     .state('forgetpassword', {
      url: '/home/forgetpassword',
      templateUrl: 'templates/forgetpassword.html',
      controller: 'ForgetPasswordController'
        
    })


    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    
    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    
    .state('tabs.others', {
      url: '/others',
      views: {
        'others-tab' : {
          templateUrl: 'templates/others.html',
          controller: 'OthersController'
        }
      }
    })
    
     .state('tabs.myPosts', {
      url: '/others/myposts',
      views: {
        'others-tab' : {
          templateUrl: 'templates/myposts.html',
          controller: 'MyPostsController'
        }
      }
    })
    
      .state('tabs.pendingposts', {
      url: '/others/pendingposts',
      views: {
        'others-tab' : {
          templateUrl: 'templates/pendingposts.html',
          controller: 'PendingPostsController'
        }
      }
    })
    
    .state('tabs.allpendingposts', {
      url: '/others/allpendingposts',
      views: {
        'others-tab' : {
          templateUrl: 'templates/allpendingposts.html',
          controller: 'AllPendingPostsController'
        }
      }
    })
    
    .state('tabs.Notification', {
      url: '/others/notification',
      views: {
        'others-tab' : {
          templateUrl: 'templates/notification.html',
          controller: 'NotificationController'
        }
      }
    })
    
     .state('tabs.Profile', {
      url: '/others/profile',
      views: {
        'others-tab' : {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileController'
        }
      }
    })
    
    
     .state('tabs.question', {
      url: '/others/question',
      views: {
        'others-tab' : {
          templateUrl: 'templates/question.html',
          controller: 'QuestionController'
        }
      }
    })
    
     

  //$urlRouterProvider.otherwise('/tab/list');
  $urlRouterProvider.otherwise('/home');

});