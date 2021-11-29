import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Url from './url';
import UrlDetail from './url-detail';
import UrlUpdate from './url-update';
import UrlDeleteDialog from './url-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UrlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UrlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UrlDetail} />
      <ErrorBoundaryRoute path={match.url} component={Url} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UrlDeleteDialog} />
  </>
);

export default Routes;
