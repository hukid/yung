/**
*
* VideoImagePlayer
*
*/

/*eslint-disable*/
import React from 'react';

import PlayerWrapper from './PlayerWrapper';
import ImageSlides from './ImageSlides';

class VideoImagePlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.player = null;
    this.slideImages = {};
    this.watcherId = null;
    this.watcherStarted = false;
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.monitorSlides = this.monitorSlides.bind(this);
  }

  componentDidMount() {
    this.slideObj = document.getElementById('slide');

    if (this.props.curSermon) {
      this.loadVideo();
      this.loadSlides();
    }
  }

  shouldComponentUpdate(prevProps) {
    if (!prevProps.curSermon && !this.props.curSermon && prevProps.curSermon.id === this.props.curSermon.id) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    if (this.props.curSermon) {
      this.loadVideo();
      this.loadSlides();
    }
  }

  onPlayerReady(event) {
    // event.target.playVideo();
    // console.log('player is ready');
    // this.player = event.target;
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING
      || event.data === YT.PlayerState.PAUSED
      || event.data === YT.PlayerState.BUFFERING) {
      this.startProgressWatcher();
      // console.log(`started watcher`);
    } else {
      this.stopProgressWatcher();
      // console.log(`stoppped watcher`);
    }
  }

  loadSlides() {
    if (this.props.curSermon.slidesTimings) {
      this.loadImageSlides();
    } else {

    }
  }

  loadImageSlides() {
    const id = this.props.curSermon.id;
    if (!this.slideImages[id]) {
      this.slideImages[id] = [];
      for (let i = 1; i <= this.props.curSermon.slidesTimings.length; i += 1) {
        this.slideImages[id][i - 1] = new Image();
        const img = require(`sermons/${id}/slides/Slide${i}.JPG`);
        this.slideImages[id][i - 1].src = img;
        // this.slideImages[curSermon.id][i - 1].src = `./img/${curSermon.id}/Slide${i}.jpg`;
      }
    }

    //const slideObj = document.getElementById('slide');
    this.slideObj.src = this.slideImages[id][0].src;
  }

  loadVideo() {
    if (this.player) {
      this.player.loadVideoById(this.props.curSermon.videoId, 0, 'large');
    } else {
      this.loadYoutubePlayer(this.props.curSermon);
    }
  }

  loadYoutubePlayer(sermon) {
    this.player = new YT.Player('player', {
      height: '400',
      width: '49%',
      videoId: sermon.videoId,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  startProgressWatcher() {
    if (!this.watcherStarted) {
      // console.log("starting watcher");
      this.watcherStarted = true;
      this.watcherId = setInterval(this.monitorSlides, 2000);
    }
  }

  stopProgressWatcher() {
    // console.log("stopping watcher");
    if (this.watcherId) {
      clearInterval(this.watcherId);
    }

    this.watcherStarted = false;
  }

  monitorSlides() {
    // console.log("monitoring player");
    if (this.props.curSermon.slidesTimings) {
      // console.log("monitoring updating slides");
      const curProgressTime = this.player.getCurrentTime();
      // const slideObj = document.getElementById('slide');
      const curSermon = this.props.curSermon;
      // console.log(curProgressTime);
      for (let i = curSermon.slidesTimings.length - 1; i >= 0; i -= 1) {
        if (curProgressTime > curSermon.slidesTimings[i]) {
          // console.log("switching slides");
          this.slideObj.src = this.slideImages[curSermon.id][i].src;
          break;
        }
      }
    }
  }

  render() {
    if (!this.props.curSermon) {
      return null;
    }

    return (
      <PlayerWrapper>
        <h3>{this.props.curSermon.title}</h3>
        <div id="player" />
        <ImageSlides hidden={!this.props.curSermon.slidesTimings} id="slide" alt="" />
        <iframe hidden={!this.props.curSermon.iframeSrc} id="slideFrame" width="49%" height="400" src={this.props.curSermon.iframeSrc} frameBorder="0" scrolling="no"></iframe>
      </PlayerWrapper>
    );
  }
}

VideoImagePlayer.propTypes = {
  curSermon: React.PropTypes.object,
};

export default VideoImagePlayer;
