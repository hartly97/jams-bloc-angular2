(function(){
  function SongPlayer($rootScope, Fixtures){
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
    var setSong = function(song){
      stopSong();

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function(){
        $rootScope.$apply(function(){
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song
    };

    /**
    * @function stopSong
    * @desc Stops currently playing song
    */
    var stopSong = function(){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
    };

    /**
    * @function getSongIndex
    * @desc Returns the index of the song passed in as argument in the album
    * @param {Number}
    * @return the index of a given song in the song container
    */
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Current song loaded
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Current volume
    * @type {Number}
    */
    SongPlayer.currentVolume = 70;

    /**
    * @function playSong
    * @desc Plays song passed in and sets it's playing attribute to true
    * @param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function SongPlayer.play
    * @desc Plays a song
    * @param {Object} song
    */
    SongPlayer.play = function(song){
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
      } else if(SongPlayer.currentSong === song){
          if(currentBuzzObject && currentBuzzObject.isPaused()){
            playSong(song);
          }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc Pauses currently playing song
    * @param {Object} song
    */
    SongPlayer.pause = function(song){
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc Decrements the currentSongIndex by one
    */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0){
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.next
    * @desc Increments the currentSongIndex by one
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

    /**
    * @function SongPlayer.setCurrentTime
    * @desc Sets the song's current time to the argument
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time){
      if(currentBuzzObject){
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function SongPlayer.setVolume
    * @desc Sets the volume of the player
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(newValue){
      if(currentBuzzObject){
        currentBuzzObject.setVolume(newValue);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
