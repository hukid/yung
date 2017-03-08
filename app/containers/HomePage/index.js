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
import { selectItems } from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <VideoList items={this.props.items} />
        <span> {this.props.curIndex} </span>
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
  curIndex: (state, ownProps) => ownProps.params.id,
});

export default connect(mapStateToProps)(HomePage);

