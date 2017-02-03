(function() {
     function CollectionCtrl(fixtures) {
         this.albums = [];
         for (var i=0; i < 12; i++) {
            this.albums.push(fixtures.getAlbum());
         }
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
