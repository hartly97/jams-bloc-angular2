(function(){
  function timecode(){
<<<<<<< HEAD
=======
//input seconds//
>>>>>>> 11directives
    return function(seconds){

      var seconds = Number.parseFloat(seconds);

<<<<<<< HEAD
      if (Number.isNaN(seconds)) {
        return '-:--';
      }
=======
//Checks for NaN//
      if (Number.isNaN(seconds)) {
        return '-:--';
      }

>>>>>>> 11directives
      var wholeSeconds = Math.floor(seconds);
      var minutes = Math.floor(wholeSeconds / 60);
      var remainingSeconds = wholeSeconds % 60;

      var output = minutes + ':';

      if (remainingSeconds < 10) {
         output += '0';
      }

      output += remainingSeconds;
<<<<<<< HEAD
=======

>>>>>>> 11directives
      return output;
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
