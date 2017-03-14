import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectItems = () => createSelector(
  selectHome,
  (home) => home.get('items').toJS(),
);

const selectCurIndex = () => (state, ownProps) => ownProps.params.id ? Number(ownProps.params.id) : -1;

export {
  selectItems,
  selectCurIndex,
};
