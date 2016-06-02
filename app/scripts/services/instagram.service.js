angular.module('app')
       .factory('instagramFactory', InstagramFactory);

InstagramFactory.$inject = ['Restangular']


function InstagramFactory(Restangular) {
    var CLIENT_ID = "6d1c302f1060454095aa003e8553e999",
    service = {
        getTags: getTags,
        getUser: getUser
    };

    function getTags(tagName){
        return Restangular.one('v1').one('tags').one(tagName).one('media').doGET('recent', {client_id: CLIENT_ID});
    }
    
    function getUser(userId) {
        return Restangular.one('v1').one('users').one(userId).one('media').doGET('recent', {client_id: CLIENT_ID});
    }

    return service;
}