import { combineReducers } from 'redux';
import documentStatuses from './document-statuses';
import documentStatus from './document-status';

export default combineReducers({
  documentStatuses,
  documentStatus,
});
