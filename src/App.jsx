import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Header from '@app/components/header';
import Content from '@app/components/content';
import DocumentStatusCreatePage from '@app/pages/document-status/containers/DocumentStatusCreate';
import DocumentStatusListPage from '@app/pages/document-status/containers/DocumentStatusList';
import DocumentStatusEditPage from '@app/pages/document-status/containers/DocumentStatusEdit';
import appStateStore from '@app/store';

const EntryApp = () => (
  <Provider store={appStateStore}>
    <Router>
      <Fragment>
        <Header />

        <Content>
          <Route exact path="/" component={DocumentStatusListPage} />
          <Route exact path="/edit/:id" component={DocumentStatusEditPage} />
          <Route exact path="/new" component={DocumentStatusCreatePage} />
        </Content>
      </Fragment>
    </Router>
  </Provider>
);

export default EntryApp;
