import { fromJS } from 'immutable';
import { sermon20140209 } from 'sermons/20140209/data';
import { sermon20140331 } from 'sermons/20140331/data';
import { sermon20140511 } from 'sermons/20140511/data';
import { sermon20141123 } from 'sermons/20141123/data';
import { sermon20150118 } from 'sermons/20150118/data';
import { sermon20150920 } from 'sermons/20150920/data';
import { sermon20151115 } from 'sermons/20151115/data';

// The initial state of the App
const initialState = fromJS({
  items: [
    sermon20140209,
    sermon20140331,
    sermon20140511,
    sermon20141123,
    sermon20150118,
    sermon20150920,
    sermon20151115,
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
