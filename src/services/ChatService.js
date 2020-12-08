// @flow
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import HTTPService from './HTTPService';
import DirectoryService from './DirectoryService';
import type { IHTTPService } from './HTTPService';
import type {
  ChatMessage,
  ChatOwnerAssignment,
  ChatStatusUpdate,
  ContactId,
  Conversation,
  ConversationId,
  ConversationDetails,
  SerializedChatOwnerAssignment,
  SerializedChatMessage,
  SerializedChatStatusUpdate,
} from '../components/ChatterPyApp/types';

function deserializeChatOwnerAssignment(
  serializedChatOwnerAssignment: SerializedChatOwnerAssignment,
): ChatOwnerAssignment {
  return {
    type: 'OWNER_CHANGE',
    active: serializedChatOwnerAssignment.active,
    changedBy: serializedChatOwnerAssignment.assigned_by,
    owner:
      serializedChatOwnerAssignment.assigned_to === null
        ? undefined
        : serializedChatOwnerAssignment.assigned_to,
    timestamp: moment(serializedChatOwnerAssignment.created),
  };
}

function deserializeStatusUpdate(
  serializedStatusUpdate: SerializedChatStatusUpdate,
): ChatStatusUpdate {
  return {
    type: 'STATUS_CHANGE',
    active: serializedStatusUpdate.active,
    changedBy: serializedStatusUpdate.assigned_by,
    status: serializedStatusUpdate.state,
    timestamp: moment(serializedStatusUpdate.created),
  };
}

function deserializeChatMessage(
  serializedMsg: $ReadOnly<{
    ...SerializedChatMessage,
    ...
  }>,
): ChatMessage {
  return {
    id: serializedMsg.id, // message db id
    type: 'MESSAGE',
    messageType:
      serializedMsg.sent_from === DirectoryService.getActiveUser().id
        ? 'SENT'
        : 'RECEIVED',
    contents: serializedMsg.message,
    sender: serializedMsg.originator, // phone number
    recipient: serializedMsg.recipient, // phone number
    sentFromUserId: serializedMsg.sent_from, // user id (not contact id)
    timestamp: moment(serializedMsg.created),
    messageId: serializedMsg.message_id, // uuid
  };
}

function generateUUID(): string {
  return uuid().slice(0, 15);
}

/**
 * Service to interact with messages and conversations
 */
class ChatService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  async getConversationDetails(
    conversationId: ConversationId,
  ): Promise<ConversationDetails> {
    const data = await this.http.get(`api/v1/conversation/:id:`, {
      id: conversationId,
    });

    return {
      assignments: data.assignments.map(deserializeChatOwnerAssignment),
      contactId: data.contact,
      created: moment(data.created),
      id: data.id,
      messages: data.messages.map(deserializeChatMessage),
      statusUpdates: data.status.map(deserializeStatusUpdate),
    };
  }

  async sendMessage(
    conversationId: ConversationId,
    senderPhoneNumber: string,
    recipientPhoneNumber: string,
    message: string,
  ): Promise<ChatMessage> {
    const data = await this.http.post(
      `api/v1/conversation/:id:/message`,
      {
        message,
        originator: senderPhoneNumber,
        recipient: recipientPhoneNumber,
        message_id: generateUUID(),
      },
      {
        id: conversationId,
      },
    );

    return deserializeChatMessage(data);
  }

  async getAllConversations(): Promise<Array<Conversation>> {
    const data = await this.http.get('api/v1/conversation/');
    return data.results.map(
      ({
        account,
        contact,
        conversation_id,
        created,
        id,
        updated,
        newest_message,
        newest_time,
      }) => ({
        account,
        id,
        contactId: contact,
        conversationId: conversation_id,
        created: moment(created),
        updated,
        newestMessage: newest_message,
        newestTime: moment(newest_time),
      }),
    );
  }

  async createConversation(
    contactId: ContactId,
  ): Promise<
    $Diff<
      Conversation,
      {
        newestMessage: mixed,
        newestTime: mixed,
      },
    >,
  > {
    const {
      account,
      contact,
      conversation_id,
      created,
      id,
      updated,
    } = await this.http.post('api/v1/conversation', {
      contact: contactId,
      conversation_id: generateUUID(),
    });

    return {
      account,
      id,
      updated,
      created: moment(created),
      contactId: contact,
      conversationId: conversation_id,
    };
  }

  async updateConversationStatus(
    conversationId: number,
    status: string,
  ): Promise<ChatStatusUpdate> {
    console.log(status);
    const data = await this.http.post(
      'api/v1/conversation/:id:/status',
      { state: status },
      {
        id: conversationId,
      },
    );
    return deserializeStatusUpdate(data);
  }

  async updateConversationAssignment(
    conversationId: number,
    assignedToUserId?: number | void = undefined,
  ): Promise<ChatOwnerAssignment> {
    const data = await this.http.post(
      'api/v1/conversation/:id:/assignment',
      { assigned_to: assignedToUserId },
      {
        id: conversationId,
      },
    );

    return deserializeChatOwnerAssignment(data);
  }
}

export default (new ChatService(HTTPService): ChatService);
