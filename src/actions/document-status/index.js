import { compose, filter, includes, nth, splitEvery, where } from 'ramda';
import api from '@app/api';
import { isEmptyOrFalsy } from '@app/utils/helpers';
import {
  createActionAppend,
  createActionSet,
  fetchSingleDocumentStatusSuccess,
} from '@app/actions/document-status/creators';

/**
 * PoC for a future redesign
 *
 * fetch()
 * withFilter('name', 'contains')
 * withPagination(page, itemsPerPage)
 *
 * compose(
 *   fetch,
 *   withPagination(page, itemsPerPage),
 *   withFilter('name', 'contains'),
 * )(params);
 */

const buildPaginatedPayload = (totalRecords, records) => ({
  totalRecords,
  records,
});

function standardizeRecord(docSnapshot) {
  return {
    id: docSnapshot.id,
    ...docSnapshot.data(),
  };
}

const standardizeRecords = (querySnapshot) => {
  let allRecords = [];

  querySnapshot.forEach((docSnapshot) => {
    allRecords.push(standardizeRecord(docSnapshot));
  });

  return allRecords;
}

export const fetch = (params) => (dispatch) => {
  const handleSuccess = (querySnapshot) => {
    const { pagination, filter: dataFilter } = params;
    let allRecords = standardizeRecords(querySnapshot);

    if (!isEmptyOrFalsy(filter))
      allRecords = filter(where({
        name: includes(dataFilter.name),
      }))(allRecords);

    const paginatedRecords = compose(
      nth(pagination.page - 1),
      splitEvery(pagination.itemsPerPage),
    )(allRecords);

    const payload = buildPaginatedPayload(
      allRecords.length,
      paginatedRecords || [],
    );

    dispatch(createActionSet(payload));
  };

  return api
    .get('document-statuses')
    .then(handleSuccess);
};

export const fetchMore = (params) => (dispatch) => {
  const handleSuccess = (querySnapshot) => {
    const { pagination } = params;
    const allRecords = standardizeRecords(querySnapshot);

    const paginatedRecords = compose(
      nth(pagination.page - 1),
      splitEvery(pagination.itemsPerPage),
    )(allRecords);

    const payload = buildPaginatedPayload(
      allRecords.length,
      paginatedRecords || [],
    );

    dispatch(createActionAppend(payload));
  };

  return api
    .get('document-statuses')
    .then(handleSuccess);
};

export function fetchById(id) {
  return function(dispatch) {
    dispatch(fetchSingleDocumentStatusSuccess(null));

    const handleSuccess = (querySnapshot) => {
      const documentStatus = standardizeRecord(querySnapshot);
      dispatch(fetchSingleDocumentStatusSuccess(documentStatus));
    };

    return api
      .getById('document-statuses', id)
      .then(handleSuccess);
  }
}
