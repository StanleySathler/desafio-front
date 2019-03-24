import React, { PureComponent, Fragment } from 'react';
import { pick } from 'ramda';
import Grid from 'styled-components-grid';

import FloatingActionButton from '@app/components/button/floating-action';
import { atRightBottom } from '@app/components/button/floating-action/styled';
import ContentBox from '@app/components/content-box';
import Field from '@app/components/field';
import LoadingSpinner from '@app/components/loading-spinner';
import FloppyDiskIcon from '@app/components/icon/floppy-disk';
import { colors } from '@app/utils/ui';
import { isEmptyOrFalsy } from '@app/utils/helpers';

const FIELDS = {
  name: 'name',
  description: 'description',
};

export default class DocumentStatusEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.renderFAB = this.renderFAB.bind(this);
    this.renderFields = this.renderFields.bind(this);

    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    const { match, fetchDocumentStatusById } = this.props;
    const { id } = match.params;
    fetchDocumentStatusById(id);
  }

  componentDidUpdate(prevProps) {
    const prevDocumentStatus = prevProps.documentStatus;
    const currDocumentStatus = this.props.documentStatus;
    const didDocumentStatusChange = prevDocumentStatus !== currDocumentStatus;

    if (didDocumentStatusChange) {
      const fieldNames = [FIELDS.name, FIELDS.description];
      const formData = pick(fieldNames, currDocumentStatus);
      this.setState({ formData });
    }
  }

  updateFormField(fieldName, value) {
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [fieldName]: value },
    });
  }

  handleBackClick() {
    const { history: routerHistory } = this.props;
    routerHistory.goBack();
  }

  handleSaveClick() {
    const { match, updateDocumentStatusById, history } = this.props;
    const { id } = match.params;
    const { formData } = this.state;
    const payload = {
      documentStatus: formData,
      routerHistory: history,
    };

    updateDocumentStatusById(id, payload);
  }

  handleNameChange(event) {
    const { value } = event.target;
    this.updateFormField(FIELDS.name, value);
  }

  handleDescriptionChange(event) {
    const { value } = event.target;
    this.updateFormField(FIELDS.description, value);
  }

  renderFAB() {
    const Action = atRightBottom(
      FloatingActionButton,
      '20px',
      '20px',
    );

    return (
      <Action onClick={this.handleSaveClick}>
        <FloppyDiskIcon
          fill={colors.white}
          height="17"
        />
      </Action>
    );
  }

  renderSpinner() {
    return (<LoadingSpinner />);
  }

  renderFields() {
    const { formData } = this.state;

    return (
      <Grid>
        <Grid.Unit
          size={(4 / 12)}
          style={{ paddingRight: '15px' }}
        >
          <Field
            label="Nome"
            id="name"
            isRequired
            value={formData.name || ''}
            onChange={this.handleNameChange}
          />
        </Grid.Unit>

        <Grid.Unit
          size={(8 / 12)}
          style={{ paddingLeft: '15px' }}
        >
          <Field
            label="Descrição"
            id="description"
            isRequired
            value={formData.description || ''}
            onChange={this.handleDescriptionChange}
          />
        </Grid.Unit>
      </Grid>
    );
  }

  render() {
    const { documentStatus } = this.props;
    const hasDocumentStatusLoaded = !isEmptyOrFalsy(documentStatus);

    return (
      <Fragment>
        <ContentBox
          title="Situação"
          hasBackAction
          onBackActionClick={this.handleBackClick}
          style={{ display: 'flex' }}
        >
          { !hasDocumentStatusLoaded && this.renderSpinner() }
          { hasDocumentStatusLoaded && this.renderFields() }
        </ContentBox>

        { this.renderFAB() }
      </Fragment>
    );
  }
}
