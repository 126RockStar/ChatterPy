// @flow
import * as React from 'react';

import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ChatsAppDispatch from '../ChatsAppDispatch';
import ChatterPyContext from '../../ChatterPyContext';
import ChatterPyDispatch from '../../ChatterPyDispatch';
import ChatService from '../../../../services/ChatService';
import DropdownSelection from '../../ui/DropdownSelection';
import infoIcon from '../../../../assets/images/temp/info-icon.png';
import type { Contact, ConversationDetails } from '../../types';

const UNASSIGNED_KEY = -1;
const UNASSIGNED = 'Unassigned';
const STATUS_OPTIONS = ['New', 'Open', 'Pending', 'Closed'];

type Props = {
  conversationDetails: ConversationDetails,
  selectedContactForChat: Contact,
};

export default function ChatConversationHeader({
  conversationDetails,
  selectedContactForChat,
}: Props): React.Node {
  const { allUsers } = React.useContext(ChatterPyContext);
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const localDispatch = React.useContext(ChatsAppDispatch);
  const [status, setStatus] = React.useState<string>(() => {
    const numStatusUpdates = conversationDetails.statusUpdates.length;
    if (numStatusUpdates > 0) {
      return conversationDetails.statusUpdates[numStatusUpdates - 1].status;
    }
    return STATUS_OPTIONS[0];
  });

  const [owner, setOwner] = React.useState<number>(() => {
    const numAssignments = conversationDetails.assignments.length;
    if (numAssignments > 0) {
      return (
        conversationDetails.assignments[numAssignments - 1].owner ||
        UNASSIGNED_KEY
      );
    }
    return UNASSIGNED_KEY;
  });

  const assigneeOptionIds = React.useMemo(
    () => [UNASSIGNED_KEY].concat(allUsers.map(u => u.id)),
    [allUsers],
  );

  const idsToUsers = React.useMemo(
    () =>
      allUsers.reduce((map, user) => {
        const userName =
          user.firstName || user.lastName
            ? [user.firstName, user.lastName].join(' ')
            : user.email;
        return map.set(user.id, userName);
      }, new Map().set(UNASSIGNED_KEY, UNASSIGNED)),
    [allUsers],
  );

  const onInfoPanelToggle = (event: SyntheticMouseEvent<HTMLElement>) => {
    event.preventDefault();
    localDispatch({ type: 'CONTACT_INFO_PANEL_TOGGLE' });
  };

  const onOwnerChange = newOwner => {
    setOwner(newOwner);

    const assignedId = newOwner === UNASSIGNED_KEY ? undefined : newOwner;
    ChatService.updateConversationAssignment(
      conversationDetails.id,
      assignedId,
    ).then(ownerAssignment => {
      globalDispatch({
        type: 'CHAT_ASSIGNMENT_CHANGE',
        ownerAssignment: ownerAssignment,
        contactId: selectedContactForChat.id,
      });
    });
  };

  const onStatusChange = newStatus => {
    setStatus(newStatus);
    ChatService.updateConversationStatus(
      conversationDetails.id,
      newStatus,
    ).then(statusEvent => {
      globalDispatch({
        type: 'CHAT_STATUS_CHANGE',
        statusUpdate: statusEvent,
        contactId: selectedContactForChat.id,
      });
    });
  };

  const desktopView = (
    <div className="chats__head-contact hidden-xs">
      <div className="chat chat--single">
        <div className="chat__inner">
          <div className="chat__content">
            <div className="chat__image">
              <img
                src={ChatterPyImages.Icons.profile}
                alt=""
                width="56"
                height="56"
              />
            </div>

            <div className="chat__content-inner">
              <h4>
                {selectedContactForChat.firstName}{' '}
                {selectedContactForChat.lastName}
              </h4>
              <a href={`tel:${selectedContactForChat.phoneNumber}`}>
                {selectedContactForChat.phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="chats__utilities">
        <div className="chats__dropdowns">
          <DropdownSelection
            className="chats__dropdown"
            options={STATUS_OPTIONS}
            selectedOption={status}
            label="Status:"
            onSelectionChange={onStatusChange}
          />

          <DropdownSelection
            className="chats__dropdown"
            options={assigneeOptionIds}
            selectedOption={owner}
            label="Assignee:"
            onSelectionChange={onOwnerChange}
            renderOptionDisplayName={id => idsToUsers.get(id) || ''}
          />
        </div>

        <div
          role="button"
          onClick={onInfoPanelToggle}
          className="link-info js-info-trigger"
        >
          <img src={infoIcon} alt="" width="33" height="33" />
        </div>
      </div>
    </div>
  );

  const mobileView = (
    <div className="hidden visible-xs-block">
      <div className="chats__head-contact visible-xs-block hidden">
        <a
          href="/#"
          className="chats__previous js-chat-close"
          onClick={e => {
            e.preventDefault();
            localDispatch({ type: 'CHAT_USER_DESELECT' });
          }}
        >
          <img src={ChatterPyImages.Icons.left} alt="" width="18" height="15" />
        </a>

        <div className="chat chat--single">
          <div className="chat__inner">
            <div className="chat__content">
              <div className="chat__image">
                <img
                  src={ChatterPyImages.Icons.profile}
                  alt=""
                  width="88"
                  height="87"
                />
              </div>

              <div className="chat__content-inner">
                <h4>
                  {selectedContactForChat.firstName}{' '}
                  {selectedContactForChat.lastName}
                </h4>
                <a href={`tel:${selectedContactForChat.phoneNumber}`}>
                  {selectedContactForChat.phoneNumber}
                </a>

                <div className="chats__utilities">
                  <div className="chats__dropdowns">
                    <DropdownSelection
                      className="chats__dropdown dropdown-select--size1"
                      options={STATUS_OPTIONS}
                      selectedOption={status}
                      label="Status:"
                      onSelectionChange={onStatusChange}
                    />
                    <DropdownSelection
                      className="chats__dropdown dropdown-select--size1 dropdown-select--blue"
                      options={assigneeOptionIds}
                      selectedOption={owner}
                      label="Assignee:"
                      onSelectionChange={onOwnerChange}
                    />
                  </div>
                  <a
                    href="/#"
                    className="link-info js-info-trigger"
                    onClick={onInfoPanelToggle}
                  >
                    <img
                      src={ChatterPyImages.Icons.info}
                      alt=""
                      width="20"
                      height="20"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
}
