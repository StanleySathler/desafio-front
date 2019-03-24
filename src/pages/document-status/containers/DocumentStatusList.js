import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@app/pages/document-status/components/DocumentStatusList';
import {
  fetch as fetchDocumentStatuses,
  fetchMore as fetchMoreDocumentStatuses,
} from '@app/actions/document-status';

const mapStateToProps = (state) => ({
  totalStatuses: state.documentStatuses.totalRecords,
  documentStatuses: state.documentStatuses.records,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchDocumentStatuses,
    fetchMoreDocumentStatuses,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
