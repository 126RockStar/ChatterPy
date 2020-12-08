// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminSidebar from './AdminSidebar';
import InviteUserPage from './UserAdminApp/InviteUserPage';
import UserAdminApp from './UserAdminApp';
import BillingApp from './BillingApp';

export default function AdminRoutes(): React.Node {
  return (
    <div className="main">
      <div className="section-alt">
        <div className="section__inner">
          <AdminSidebar />
          <Switch>
            <Route
              exact
              path="/app/admin/user-list-view"
              component={UserAdminApp}
            />
            <Route
              exact
              path="/app/admin/invite-user"
              component={InviteUserPage}
            />
            <Route
              exact
              path="/app/admin/plans-and-pricing"
              component={BillingApp}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
