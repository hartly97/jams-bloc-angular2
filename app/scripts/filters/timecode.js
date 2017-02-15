(function(){
  function timecode(){
//input seconds//
    return function(seconds){

      var seconds = seconds;

//Checks for NaN//
      if (seconds === "NaN"){
        return '-:--';
      } else {

      //var wholeSeconds = Math.floor(seconds);
      //var minutes = Math.floor(wholeSeconds / 60);
      //var remainingSeconds = wholeSeconds % 60;
      //var output = minutes + ':';
      //if (remainingSeconds < 10) {
         //output += '0';
      //}
      //output += remainingSeconds;
      var output = buzz.toTimer(seconds);

      return output;
      }
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
