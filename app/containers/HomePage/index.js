/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VideoList from 'components/VideoList';
import { selectItems, selectCurIndex } from './selectors';
// import { loadYoutubePlayer } from './loadYoutubePlayer';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.player = null;
    this.slideImages = {};
    this.watcherId = null;
    this.watcherStarted = false;
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  componentDidMount() {
    this.loadVideo();
    this.loadSlides();
  }

  shouldComponentUpdate(nextPros) {
    if (nextPros.curIndex === this.props.curIndex) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this.loadVideo();
    this.loadSlides();
  }

  onPlayerReady(event) {
    event.target.playVideo();
    this.player = event.target;
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING
      || event.data === YT.PlayerState.PAUSED
      || event.data === YT.PlayerState.BUFFERING) {
      this.startProgressWatcher();
    } else {
      this.stopProgressWatcher();
      // console.log(player.getCurrentTime());
    }
  }

  getCurrentSermon() {
    return this.props.items[this.props.curIndex];
  }

  loadSlides() {
    if (this.props.curIndex >= 0) {
      const curSermon = this.getCurrentSermon();
      if (!this.slideImages[curSermon.id]) {
        this.slideImages[curSermon.id] = [];
        for (let i = 1; i <= curSermon.slidesTimings.length; i += 1) {
          this.slideImages[curSermon.id][i - 1] = new Image();
          const img = require(`./sermons/${curSermon.id}/slides/Slide${i}.JPG`);
          this.slideImages[curSermon.id][i - 1].src = img;
          // this.slideImages[curSermon.id][i - 1].src = `./img/${curSermon.id}/Slide${i}.jpg`;
        }

        const slideObj = document.getElementById('slide');
        slideObj.src = this.slideImages[curSermon.id][0].src;
      }
    }
  }

  loadVideo() {
    if (this.props.curIndex >= 0) {
      const curSermon = this.getCurrentSermon();
      if (this.player) {
        this.player.loadVideoById(curSermon.videoId, 0, 'large');
      } else {
        this.loadYoutubePlayer(curSermon);
      }
    }
  }

  loadYoutubePlayer(sermon) {
    new YT.Player('player', {
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
      this.watcherId = setInterval(
        () => {
          const curProgressTime = this.player.getCurrentTime();
          const slideObj = document.getElementById('slide');
          const curSermon = this.getCurrentSermon();

          for (let i = curSermon.slidesTimings.length - 1; i >= 0; i -= 1) {
            if (curProgressTime > curSermon.slidesTimings[i]) {
              slideObj.src = this.slideImages[curSermon.id][i].src;
              break;
            }
          }
        },
        2000);
    }
  }

  stopProgressWatcher() {
    if (this.watcherId) {
      clearInterval(this.watcherId);
    }
  }

  render() {
    const curSermon = this.getCurrentSermon();
    return (
      <div>
        <VideoList items={this.props.items} />
        {this.props.curIndex >= 0 ? (
          <div>
            <h3>{curSermon.title}</h3>
            <div id="player" />
            <img id="slide" src={this.slide1} alt="#" />
          </div>
        ) : (
            ''
          )}
      </div>
    );
  }
}

HomePage.propTypes = {
  items: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  curIndex: React.PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  items: selectItems(),
  curIndex: selectCurIndex(),
});

export default connect(mapStateToProps)(HomePage);

