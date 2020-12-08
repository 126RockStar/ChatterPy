// @flow
import type {
  ContactId,
  ConversationId,
  MessageId,
  PhoneNumberId,
  SerializedAutomation,
  SerializedChatOwnerAssignment,
  SerializedChatStatusUpdate,
  SerializedContact,
  SerializedConversation,
  SerializedConversationDetails,
  SerializedDatasource,
  SerializedPhoneNumber,
  SerializedTemplate,
  SerializedUser,
  UserId,
} from '../components/ChatterPyApp/types';

type TokenInfo = {
  access_token: string,
  refresh_token: string,
};

type PaginatedResponse<T> = {
  count: number,
  next: null,
  previous: null,
  results: Array<T>,
};

type RoutesMap = {
  GET: {
    'v1/users': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedUser>,
    },

    'v1/numbers': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedPhoneNumber>,
    },

    'api/v1/conversation': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedConversation>,
    },

    // 'api/v1/conversation/?page=val': {
    //   params: void,
    //   endpointParams: void,
    //   response: PaginatedResponse<SerializedConversation>,
    // },

    'api/v1/conversation/:id:': {
      params: void,
      endpointParams: { id: ConversationId },
      response: SerializedConversationDetails,
    },

    'v1/contacts': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedContact>,
    },

    'v1/accounts': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<{ ... }>,
    },

    'v1/automations': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedAutomation>,
    },

    'v1/datasources': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedDatasource>,
    },

    'v1/templates': {
      params: void,
      endpointParams: void,
      response: PaginatedResponse<SerializedTemplate>,
    },
  },

  POST: {
    'auth/registration': {
      params: {
        username: string,
        email: string,
        password1: string,
        password2: string,
        first_name: string,
        last_name: string,
      },
      endpointParams: void,
      response: {
        ...TokenInfo,
        user: SerializedUser,
      },
    },

    'auth/login': {
      params: { email: string, password: string, username: string },
      endpointParams: void,
      response: {
        ...TokenInfo,
        user: SerializedUser,
      },
    },

    'auth/token/refresh': {
      params: { refresh: string },
      endpointParams: void,
      response: {
        access: string,
      },
    },

    'v1/numbers': {
      params: {
        phone_number: string,
      },
      endpointParams: void,
      response: SerializedPhoneNumber,
    },

    'v1/contacts': {
      params: {
        first_name: string,
        phone_number: string,
        last_name: string,
      },
      endpointParams: void,
      response: SerializedContact,
    },

    'api/v1/conversation': {
      params: {
        contact: ContactId,
        conversation_id: string,
      },
      endpointParams: void,
      response: {
        account: string,
        contact: ContactId,
        conversation_id: string,
        created: string,
        id: ConversationId,
        updated: string,
      },
    },

    'api/v1/conversation/:id:/message': {
      params: {
        message_id: string,
        originator: string, // phone number
        recipient: string, // phone number
        message: string,
      },
      endpointParams: {
        id: ConversationId, // conversation id
      },
      response: {
        id: MessageId,
        created: string,
        media: null,
        message: string,
        message_id: string,
        originator: string,
        recipient: string,
        scheduled: null,
        sent_from: UserId, // user id
      },
    },

    'api/v1/conversation/:id:/status': {
      params: { state: string },
      endpointParams: {
        id: number, // conversation id
      },
      response: SerializedChatStatusUpdate,
    },

    'api/v1/conversation/:id:/assignment': {
      params: {
        assigned_to?: number,
      },
      endpointParams: {
        id: number, // conversation id
      },
      response: SerializedChatOwnerAssignment,
    },

    'v1/accounts': {
      params: {
        company_name: string,
        company_size: number,
      },
      endpointParams: void,
      response: {
        company_name: string,
        company_size: number,
        created: string,
        credits: number,
        enterprise_credits: 0,
        enterprise_price: 0,
        id: string,
      },
    },

    'v1/automations': {
      params: {
        name: string,
        trigger: string,
        number: PhoneNumberId,
      },
      endpointParams: void,
      response: SerializedAutomation,
    },

    'v1/datasources': {
      params: {
        name: string,
        fields: $ReadOnlyArray<string>,
      },
      endpointParams: void,
      response: SerializedDatasource,
    },

    'v1/templates': {
      params: {
        name: string,
        data: string,
        number: PhoneNumberId,
      },
      endpointParams: void,
      response: SerializedTemplate,
    },
  },

  DELETE: {
    'v1/contacts/:id:': {
      params: void,
      endpointParams: { id: number },
      response: void,
    },
  },
};

export type HTTPRequestType = 'POST' | 'GET' | 'DELETE';

export type Routes<RequestType: HTTPRequestType> = $Keys<
  $ElementType<RoutesMap, RequestType>,
>;

export type RouteEndpointParams<
  Route,
  RequestType: HTTPRequestType,
> = $PropertyType<
  $ElementType<$ElementType<RoutesMap, RequestType>, Route>,
  'endpointParams',
>;

export type RouteParams<Route, RequestType: HTTPRequestType> = $PropertyType<
  $ElementType<$ElementType<RoutesMap, RequestType>, Route>,
  'params',
>;

export type RouteResponse<Route, RequestType: HTTPRequestType> = $PropertyType<
  $ElementType<$ElementType<RoutesMap, RequestType>, Route>,
  'response',
>;
