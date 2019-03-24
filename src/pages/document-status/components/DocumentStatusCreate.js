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

export default class DocumentStatusCreate extends PureComponent {
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
    const { createDocumentStatus, history } = this.props;
    const { formData } = this.state;

    createDocumentStatus({
      documentStatus: formData,
      routerHistory: history,
    });
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
    return (
      <Fragment>
        <ContentBox
          title="Situação"
          hasBackAction
          onBackActionClick={this.handleBackClick}
          style={{ display: 'flex' }}
        >
          { this.renderFields() }
        </ContentBox>

        { this.renderFAB() }
      </Fragment>
    );
  }
}
