import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Edit from '@app/pages/document-status/components/DocumentStatusEdit';
import {
  fetchById as fetchDocumentStatusById,
  updateById as updateDocumentStatusById,
} from '@app/actions/document-status';

const mapStateToProps = (state) => ({
  documentStatus: state.documentStatus,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchDocumentStatusById,
    updateDocumentStatusById,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
