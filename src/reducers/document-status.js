import { createReducer } from '@app/utils/helpers';
import ACTION_TYPES from '@app/actions/document-status/types';

const initialState = {};

function setDocumentStatus(prevState, { payload }) {
  return { ...payload };
}

const handlers = {
  [ACTION_TYPES.fetchSingleDocumentStatusSuccess]: setDocumentStatus,
};

export default createReducer(initialState, handlers);
