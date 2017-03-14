import { fromJS } from 'immutable';
import { sermon20140209 } from './sermons/20140209/data';
import { sermon20140331 } from './sermons/20140331/data';

// The initial state of the App
const initialState = fromJS({
  items: [
    sermon20140209,
    sermon20140331,
  ],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export {
  homeReducer,
};
