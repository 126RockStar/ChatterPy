// @flow

export type AppType = 'CHATS' | 'AUTOMATION' | 'TEMPLATES';

export opaque type UserId: number = number;
export opaque type ContactId: number = number;
export opaque type ConversationId: number = number;
export opaque type MessageId: number = number;
export opaque type OwnerAssignmentId: number = number;
export opaque type PhoneNumberId: number = number;
export opaque type AutomationId: number = number;
export opaque type TemplateId: number = number;
export opaque type DatasourceId: number = number;

export type User = {
  +account: string, // account id
  +email: string,
  +username: string, // same as email
  +file: null,
  +id: UserId,
  +isAccountManager: boolean,
  +phoneNumber: string | null,
  +firstName: string | null,
  +lastName: string | null,
  +fullDisplayName: string,
};

export type SerializedUser = {
  +account: string, // account id
  +email: string,
  +username: string, // same as email
  +file: null,
  +id: UserId, // user id,
  +is_account_manager: boolean,
  +phone_number: string | null,
  +first_name: string | null,
  +last_name: string | null,
};

export type Contact = {
  +account: string,
  +collection: [],
  +created: moment$Moment,
  +email: string | null,
  +id: ContactId,
  +firstName: string,
  +lastName: string,
  +phone_number: string,
  +tags: [],
  +updated: string,
};

export type SerializedContact = {
  +account: string,
  +collection: [],
  +created: string,
  +email: string | null,
  +id: ContactId,
  +first_name: string,
  +last_name: string,
  +phone_number: string,
  +tags: [],
  +updated: string,
};

export type Conversation = {
  +account: string,
  +contactId: ContactId,
  +conversationId: string, // a hashed string id
  +created: moment$Moment,
  +id: ConversationId, // db id for this conversation
  +updated: string,
  +newestMessage: string | null,
  +newestTime: moment$Moment | null,
};

export type SerializedConversation = {
  +account: string,
  +contact: ContactId,
  +conversation_id: string,
  +created: string,
  +id: ConversationId,
  +updated: string,
  +newest_message: string | null,
  +newest_time: string | null,
};

export type ChatMessage = {
  +type: 'MESSAGE',
  +id: MessageId,
  +messageType: 'SENT' | 'RECEIVED' | 'PRIVATE',
  +contents: string,
  +sender: string, // phone number
  +recipient: string, // phone number
  +sentFromUserId: UserId, // user id (not contact id)
  +timestamp: moment$Moment,
  +messageId: string, // uuid
};

export type SerializedChatMessage = {
  +created: string,
  +id: MessageId, // message db id
  +message: string,
  +message_id: string, // uuid
  +originator: string, // phone number
  +recipient: string, // phone number
  +sent_from: UserId, // user id (not contact id)
};

export type SerializedChatStatusUpdate = {
  +active: boolean,
  +assigned_by: UserId, // user id
  +created: string, // timestamp
  +state: string, // status
};

export type ChatStatusUpdate = {
  +type: 'STATUS_CHANGE',
  +active: boolean,
  +changedBy: UserId, // user id
  +timestamp: moment$Moment,
  +status: string,
};

export type ChatOwnerAssignment = {
  +type: 'OWNER_CHANGE',
  +active: boolean,
  +timestamp: moment$Moment,

  // the new chat owner's user id, or void if owner was unassigned
  +owner: UserId | void,

  // the user id of who changed the owner
  +changedBy: number, // user id
};

export type SerializedChatOwnerAssignment = {
  +id: number,
  +assigned_by: UserId, // user id
  +assigned_to: UserId, // user id
  +active: boolean,
  +created: string, // timestamp
};

export type ConversationDetails = {
  +assignments: $ReadOnlyArray<ChatOwnerAssignment>,
  +contactId: ContactId, // contact db id
  +created: moment$Moment,
  +id: ConversationId, // conversation db id
  +statusUpdates: $ReadOnlyArray<ChatStatusUpdate>,
  +messages: $ReadOnlyArray<ChatMessage>,
};

export type SerializedConversationDetails = {
  +assignments: $ReadOnlyArray<SerializedChatOwnerAssignment>,
  +contact: ContactId, // contact db id
  +created: string,
  +id: ConversationId, // conversation db id
  +status: $ReadOnlyArray<SerializedChatStatusUpdate>,
  +messages: $ReadOnlyArray<SerializedChatMessage>,
};

export type ChatEvent = ChatMessage | ChatStatusUpdate | ChatOwnerAssignment;

export type PhoneNumber = {
  +account: string,
  +created: moment$Moment,
  +id: PhoneNumberId,
  +phoneNumber: string,
};

export type SerializedPhoneNumber = {
  +account: string,
  +created: string,
  +id: PhoneNumberId,
  +phone_number: string,
};

export type Automation = {
  +account: string,
  +actions: [],
  +active: boolean,
  +created: moment$Moment,
  +creatorUserId: UserId, // user id
  +id: AutomationId,
  +name: string,
  +number: PhoneNumberId,
  +trigger: string,
  +updated: moment$Moment,
};

export type SerializedAutomation = {
  +account: string,
  +actions: [],
  +active: boolean,
  +created: string,
  +creator: UserId, // user id
  +id: AutomationId,
  +name: string,
  +number: PhoneNumberId,
  +trigger: string,
  +updated: string,
};

export type Template = {
  +account: string,
  +created: moment$Moment,
  +contents: string,
  +datasource: null,
  +id: TemplateId,
  +name: string,
  +number: PhoneNumberId,
  +updated: moment$Moment,
};

export type SerializedTemplate = {
  +account: string,
  +created: string,
  +data: string,
  +datasource: null,
  +id: TemplateId,
  +name: string,
  +number: PhoneNumberId,
  +updated: string,
};

export type Datasource = {
  account: string,
  created: moment$Moment,
  fields: Array<string>,
  id: DatasourceId,
  name: string,
  updated: moment$Moment,
};

export type SerializedDatasource = {
  account: string,
  created: string,
  fields: Array<string>,
  id: DatasourceId,
  name: string,
  updated: string,
};

/**
 * =====================================
 * ========== Legacy types =============
 * =====================================
 */

export type LegacyUser = {
  +id: string,
  +firstName: string,
  +lastName: string,
  +fullName: string,
  +phoneNumber: string,
  +email: string,
  +role: string,
};

export type LegacyContactGroup = {
  +id: string,
  +groupName: string,
  +members: $ReadOnlyArray<LegacyUser>,
};

export type BillingHistoryItem = {
  +id: string,
  +date: moment$Moment,
  +amount: number,
};
