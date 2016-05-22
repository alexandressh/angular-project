angular.module('app')
       .config(homeRouteConfig);

function homeRouteConfig($stateProvider, $urlRouterProvider) {
     $stateProvider
     .state('home', {
            url: '/home',
            templateUrl: './scripts/home/home.html',
            controller: 'HomeController'
        })
        .state('home.pictures', {
            url: '/pic',
            templateUrl: './scripts/home/partial-home-list.html',
        })
}