import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Create from '@app/pages/document-status/components/DocumentStatusCreate';
import { create as createDocumentStatus } from '@app/actions/document-status';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    createDocumentStatus,
  }, dispatch)
);

export default connect(
  undefined,
  mapDispatchToProps,
)(Create);
