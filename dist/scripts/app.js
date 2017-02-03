//angular.module('blocJams', []);
//angular.module('blocJams', ['ui.router']);
(function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
       })
       .state('album', {
           url: '/album',
           templateUrl: '/templates/album.html'
       });
     }
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();
