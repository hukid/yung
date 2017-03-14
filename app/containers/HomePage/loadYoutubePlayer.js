
export function loadYoutubePlayer(sermon) {
  window.player = new YT.Player('player', {
    height: '400',
    width: '49%',
    videoId: sermon.videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING
    || event.data === YT.PlayerState.PAUSED
    || event.data === YT.PlayerState.BUFFERING) {
    // startProgressWatcher();
  } else {
    // stopProgressWatcher();
    // console.log(player.getCurrentTime());
  }
}
