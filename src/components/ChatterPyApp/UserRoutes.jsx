// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AutomationApp from './AutomationApp';
import ChatsApp from './ChatsApp';
import ContactsApp from './ContactsApp';
import CreateAutomationPage from './AutomationApp/CreateAutomationPage';
import CreateTemplatePage from './TemplateApp/CreateTemplatePage';
import TemplateApp from './TemplateApp';
import AppSidebar from './AppSidebar';
import TemplateList from './TemplateApp/TemplateList'

export default function UserRoutes(): React.Node {
  return (
    <div className="main">
      <div className="section">
        <div className="section__inner section__inner--alt section__inner--size1">
          <AppSidebar />
          <Switch>
            <Route exact path="/app/chat" component={ChatsApp} />
            <Route exact path="/app/contacts" component={ContactsApp} />
            <Route
              exact
              path="/app/automation-list"
              component={AutomationApp}
            />
            <Route
              exact
              path="/app/create-automation"
              component={CreateAutomationPage}
            />
            <Route
              exact
              path="/app/create-template"
              component={CreateTemplatePage}
            />
            <Route exact path="/app/template-list" component={TemplateList} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
