(function(){
  function CollectionCtrl(Fixtures){
    this.albums = Fixtures.getCollection(12);
  }

  angular
    .module('rockJams')
    .controller('CollectionCtrl', ["Fixtures", CollectionCtrl]);
})();
