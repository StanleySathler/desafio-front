import React, { PureComponent, Fragment } from 'react';
import Grid from 'styled-components-grid';

import FloatingActionButton from '@app/components/button/floating-action';
import { atRightBottom } from '@app/components/button/floating-action/styled';
import ContentBox from '@app/components/content-box';
import Field from '@app/components/field';
import LoadingSpinner from '@app/components/loading-spinner';
import FloppyDiskIcon from '@app/components/icon/floppy-disk';
import { colors } from '@app/utils/ui';
import { isEmptyOrFalsy } from '@app/utils/helpers';

export default class DocumentStatusEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.renderFAB = this.renderFAB.bind(this);
    this.renderFields = this.renderFields.bind(this);
  }

  componentDidMount() {
    const { match, fetchDocumentStatusById } = this.props;
    const { id } = match.params;
    fetchDocumentStatusById(id);
  }

  handleBackClick() {
    const { history: routerHistory } = this.props;
    routerHistory.goBack();
  }

  renderFAB() {
    const Action = atRightBottom(
      FloatingActionButton,
      '20px',
      '20px',
    );

    return (
      <Action>
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
    const { documentStatus } = this.props;

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
            defaultValue={(documentStatus || {}).name}
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
            defaultValue={(documentStatus || {}).description}
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
