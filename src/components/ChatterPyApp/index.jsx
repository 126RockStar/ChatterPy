// @flow
import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import AuthorizationService from '../../services/AuthorizationService';
import AutomationsService from '../../services/AutomationsService';
import ChatterPyContext from './ChatterPyContext';
import ChatterPyDispatch, {
  INITIAL_STATE,
  chatterpyReducer,
} from './ChatterPyDispatch';
import ChatService from '../../services/ChatService';
import ContactsService from '../../services/ContactsService';
import DatasourcesService from '../../services/DatasourcesService';
import DirectoryService from '../../services/DirectoryService';
import NumbersService from '../../services/NumbersService';
import TemplatesService from '../../services/TemplatesService';
import Header from './Header';
import UserRoutes from './UserRoutes';
import { history } from '../../helpers/history';

export default function ChatterPyApp(): React.Node {
  const [globalState, globalDispatch] = React.useReducer(
    chatterpyReducer,
    INITIAL_STATE,
  );

  // load all the app data on mount
  React.useEffect(() => {
    DirectoryService.getAllUsers().then(allUsers => {
      console.log('Loaded all users:', allUsers);
      globalDispatch({
        allUsers,
        type: 'USERS_SET',
      });
    });

    ContactsService.getAllContacts().then(allContacts => {
      console.log('Loaded all contacts', allContacts);
      globalDispatch({
        allContacts,
        type: 'CONTACTS_SET',
      });
    });

    ChatService.getAllConversations().then(allConversations => {
      console.log('Loaded all conversations: ', allConversations);
      globalDispatch({
        allConversations,
        type: 'CONVERSATIONS_SET',
      });
    });

    NumbersService.getAllNumbers().then(allPhoneNumbers => {
      console.log('Loaded all phone numbers', allPhoneNumbers);
      globalDispatch({
        allPhoneNumbers,
        type: 'PHONE_NUMBERS_SET',
      });
    });

    AutomationsService.getAllAutomations().then(allAutomations => {
      console.log('Loaded all automations', allAutomations);
      globalDispatch({
        allAutomations,
        type: 'AUTOMATIONS_SET',
      });
    });

    TemplatesService.getAllTemplates().then(allTemplates => {
      console.log('Loaded all templates', allTemplates);
      globalDispatch({
        allTemplates,
        type: 'TEMPLATES_SET',
      });
    });

    DatasourcesService.getAllDatasources().then(allDatasources => {
      console.log('Loaded all datasources', allDatasources);
      globalDispatch({
        allDatasources,
        type: 'DATASOURCES_SET',
      });
    });

    console.log('Active user: ', DirectoryService.getActiveUser());
  }, []);

  React.useLayoutEffect(() => {
    if (!AuthorizationService.isLoggedIn()) {
      window.location = '/login';
    }
  }, []);

  return (
    <>
      <ChatterPyContext.Provider value={globalState}>
        <ChatterPyDispatch.Provider value={globalDispatch}>
          <Header phoneNumbers={globalState.allPhoneNumbers} />
          <Router history={history}>
            <Switch>
              <Route path="/app/admin" component={AdminRoutes} />
              <Route path="/app" component={UserRoutes} />
            </Switch>
          </Router>
        </ChatterPyDispatch.Provider>
      </ChatterPyContext.Provider>
    </>
  );
}
