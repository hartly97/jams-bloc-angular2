(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

    /**
    * @desc Container of songs
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
          stopSong();

          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
            });
         });

         SongPlayer.currentSong = song;
};

        /**
        *@function stopSong
        *@desc Stops currently
        */

     var stopSong = function(){
       if(currentBuzzObject){
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
         /**
         *@desc Current playback time (in secs) of current play song
         *@type{Number}
         */
         SongPlayer.currentTime = null;
      }
};

        /**
        * @function getSongIndex
        * @desc Ret the index of song passed in as arg in album
        * @param {Number}
        * @return the index of a given song in the song container
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc Current song loaded
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        //=== chkpt10 ===//
        /**
        * @desc Current playback time of curr play song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

       /**
       * @function playSong
       * @desc Plays song passed in & sets it's playing attr to true
       * @param {Object} song
       */
       var playSong = function(song){
         currentBuzzObject.play();
         song.playing = true;
      };


      /**
       * @function songPlayer play
       * @desc Play current or new song
       * @param {Object} song
       */
       SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;

           if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
           } else if (SongPlayer.currentSong === song) {
              // if (currentBuzzObject.isPaused()) {
                 if(currentBuzzObject && currentBuzzObject.isPaused()){
                   playSong(song);
               }
          }
       };


       /**
       * @function song play pause
       * @desc Pause current song
       * @param {Object} song
       */
        SongPlayer.pause = function(song) {
           song = song || SongPlayer.currentSong;
           currentBuzzObject.pause();
           song.playing = false;
       };


       /**
       * @function SongPlayer.previous
       * @desc Dec currentSongIndex one
       */
       SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
            stopSong;

          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };


      /**
      * @function SongPlayer.next
      * @desc Incr currentSongIndex +1
      */
      SongPlayer.next = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if(currentSongIndex > currentAlbum.songs.length - 1){
          stopSong();

          } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
        }
      };

//===chkpt10===//
      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
    SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
     }
 };
    return SongPlayer;
}

     angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
