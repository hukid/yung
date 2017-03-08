import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  items: [
    '1',
    '2',
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
