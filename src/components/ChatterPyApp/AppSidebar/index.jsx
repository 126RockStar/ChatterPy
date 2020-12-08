// @flow
import * as React from 'react';

import '../../../assets/scss/style.scss';
import SidebarAppLink from './SidebarAppLink';
import icoChatImage from '../../../assets/images/temp/ico-chat.png';
import icoEmail from '../../../assets/images/temp/ico-email.png';
import icoContacts from '../../../assets/images/temp/ico-contacts.png';
import icoTemplate from '../../../assets/images/temp/ico-template.png';
import icoAutomation from '../../../assets/images/temp/ico-automations.png';
import icoReport from '../../../assets/images/temp/ico-report.png';
import icoHelp from '../../../assets/images/temp/ico-help.png';

/**
 * This is the main sidebar for users when they are using the app.
 * This is different from the AdminSidebar, which is only visible when
 * in `app/admin/*` routes
 */
export default function AppSidebar(): React.Element<'div'> {
  return (
    <div className="section__aside section__aside--alt">
      <div className="section__nav">
        <nav className="nav-secondary">
          <a href="/#" className="nav-close js-nav-close">
            x
          </a>
          <ul>
            <SidebarAppLink
              label="chats"
              to="/app/chat"
              imgSrc={icoChatImage}
              imgWidth={30}
              imgHeight={25}
            />
            <SidebarAppLink
              label="emails"
              to="/app/#"
              imgSrc={icoEmail}
              imgWidth={30}
              imgHeight={26}
            />
            <SidebarAppLink
              label="contacts"
              to="/app/contacts"
              imgSrc={icoContacts}
              imgWidth={30}
              imgHeight={29}
            />
            <SidebarAppLink
              label="templates"
              to="/app/template-list"
              imgSrc={icoTemplate}
              imgWidth={25}
              imgHeight={34}
            />
            <SidebarAppLink
              label="automations"
              to="/app/automation-list"
              imgSrc={icoAutomation}
              imgWidth={30}
              imgHeight={30}
            />
            <SidebarAppLink
              label="reports"
              to="/app/#"
              imgSrc={icoReport}
              imgWidth={20}
              imgHeight={20}
            />
          </ul>
        </nav>
      </div>

      <a href="/#" className="link-help hidden-xs">
        <img src={icoHelp} alt="" width="25" height="25" />

        <span>help</span>
      </a>
    </div>
  );
}
