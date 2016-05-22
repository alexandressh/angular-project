angular.module('app')
       .config(basicRouteConfig);
    
function basicRouteConfig($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.otherwise('/home');
}