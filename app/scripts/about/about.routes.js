angular.module('app')
       .config(aboutRouteConfig);
       
function aboutRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: './scripts/about/about.html' },
    
                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },
    
                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: './scripts/partials/table-data.html',
                    controller: 'scotchController'
                }
            }
        });
}