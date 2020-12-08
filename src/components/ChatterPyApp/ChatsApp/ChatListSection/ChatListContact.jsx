// @flow
import * as React from 'react';
import classNames from 'classnames';

import ChatsAppDispatch from '../ChatsAppDispatch';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import type { Contact } from '../../types';

type Props = {
  isActiveChat: boolean,
  lastMessageTime: ?moment$Moment,
  lastMessageContents: string,
  contact: Contact,
  conversationId: number,
};

export default function ChatListContact({
  isActiveChat,
  contact,
  conversationId,
  lastMessageContents,
  lastMessageTime,
}: Props): React.Node {
  const dispatch = React.useContext(ChatsAppDispatch);
  const msgPreview = lastMessageContents.substr(0, 10);
  const msgElipsis =
    msgPreview.length < lastMessageContents.length ? '...' : '';

  const msgDate = lastMessageTime ? (
    <span>{lastMessageTime.format('h:mm A')}</span>
  ) : null;

  const onChatClick = () => dispatch({ contact, type: 'CHAT_CONTACT_SELECT' });
  const className = classNames('chat', { 'chat--active': isActiveChat });
  const { firstName, lastName } = contact;

  const mobileView = (
    <div className="hidden visible-xs-block">
      <div className="chat chat--size1 js-chat-trigger" onClick={onChatClick}>
        <div className="chat__inner">
          <div className="chat__image">
            <img
              src={ChatterPyImages.Icons.profile}
              alt=""
              width="58"
              height="58"
            />
          </div>

          <div className="chat__content">
            <h4>
              {firstName} {lastName}
            </h4>

            <p>
              {msgPreview}
              {msgElipsis}
            </p>
          </div>

          <div className="chat__info">
            {msgDate}
            <span>Last Reply by TODO</span>
          </div>
        </div>
      </div>
    </div>
  );

  const desktopView = (
    <div className="hidden-xs">
      <div className={className} onClick={onChatClick}>
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
                {contact.firstName} {contact.lastName}
              </h4>
              <p>
                {msgPreview}
                {msgElipsis}
              </p>
              <em>Last Reply by TODO</em>
            </div>
          </div>
          <div className="chat__outro">
            <em>{msgDate}</em>
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
