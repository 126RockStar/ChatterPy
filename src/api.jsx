const basURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'http://api.chatterpy.com';

export const api = {
  chatterpy: {
    list: `${basURL}/api/v1/conversation/`,
    retrieve: slug => `${basURL}/api/v1/conversations/${slug}`,
    create_conversation: `${basURL}/api/v1/conversation/`,
    create_message: slug => `${basURL}/api/v1/conversation/${slug}/message/`,
    register: `${basURL}/auth/registration/`,
    login: `${basURL}/auth/login/`,
    logout: `${basURL}/auth/logout/`,
    users: `${basURL}/v1/users/`,
    accounts: `${basURL}/v1/accounts/`,
    contacts: `${basURL}/v1/contacts/`
  },
};
