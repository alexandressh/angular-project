angular.module('app')
       .controller('HomeController', HomeController);
       
HomeController.$inject = ['$scope', 'instagramFactory'];

function HomeController($scope, instagramFactory) {
    $scope.pictures = null;
    
    $scope.fetchPicturesTag = fetchPicturesTag;
    
    function fetchPicturesTag(tag) {
        $scope.pictures = [];
        instagramFactory.getTags(tag).then(showData, showError);
        
         function showData(result) {
            var index = 0;
            for(index in result.data) {
                
                $scope.pictures.push(result.data[index]);
            }
        }
        
        function showError(error) {
            console.log(error);   
        }
    }
}