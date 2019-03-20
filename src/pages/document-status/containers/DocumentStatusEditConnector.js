import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchById as fetchDocumentStatusById } from '@app/actions/document-status';
import Edit from '@app/pages/document-status/components/DocumentStatusEdit';

const mapStateToProps = (state) => ({
  documentStatus: state.documentStatus,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchDocumentStatusById,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
