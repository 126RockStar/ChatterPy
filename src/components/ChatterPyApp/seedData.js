// @flow
/**
 * This file holds hardcoded data to initialize the app
 */
import moment from 'moment';

import uniqueId from '../../utils/uniqueId';
import type {
  BillingHistoryItem,
  LegacyContactGroup,
  LegacyUser,
} from './types';

/**
 * The info of the logged-in user
 */
export const ACTIVE_USER: LegacyUser = {
  id: uniqueId(),
  fullName: 'Alberto Aguilera',
  firstName: 'Alberto',
  lastName: 'Aguilera',
  phoneNumber: '(123) 456-7890',
  email: '123456@mail.com',
  role: 'Manager',
};

/**
 * All users registered for the app
 */
export const ALL_USERS: $ReadOnlyArray<LegacyUser> = [
  ACTIVE_USER,
  {
    id: uniqueId(),
    fullName: 'Damien Johnson',
    firstName: 'Damien',
    lastName: 'Johnson',
    phoneNumber: '(456) 456-7890',
    role: 'Manager',
    email: '12345678@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '(455) 454-7892',
    role: 'User',
    email: 'user@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Aldo Moreno',
    firstName: 'Aldo',
    lastName: 'Moreno',
    phoneNumber: '(253) 456-7891',
    role: 'User',
    email: '124@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'John Smith',
    firstName: 'John',
    lastName: 'Smith',
    phoneNumber: '(258) 454-3494',
    role: 'User',
    email: '125@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Jane Doe',
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '(255) 856-3489',
    role: 'User',
    email: '126@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Mary Robertson',
    firstName: 'Mary',
    lastName: 'Robertson',
    phoneNumber: '(155) 354-3491',
    role: 'User',
    email: '127@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Rosa García',
    firstName: 'Rosa',
    lastName: 'García',
    phoneNumber: '(186) 356-3791',
    role: 'User',
    email: '128@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'James Whitmore',
    firstName: 'James',
    lastName: 'Whitmore',
    phoneNumber: '(189) 352-1191',
    role: 'User',
    email: '129@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'William Brooke',
    firstName: 'William',
    lastName: 'Brooke',
    phoneNumber: '(195) 451-8191',
    role: 'User',
    email: '130@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Colin Robinson',
    firstName: 'Colin',
    lastName: 'Robinson',
    phoneNumber: '(111) 390-7323',
    role: 'User',
    email: '131@mail.com',
  },
];

export const PENDING_USERS: $ReadOnlyArray<LegacyUser> = [
  {
    id: uniqueId(),
    fullName: 'Lorem Ipsum',
    firstName: 'Lorem',
    lastName: 'Ipsum',
    phoneNumber: '(222) 390-7323',
    role: 'User',
    email: '132@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Jake Taylor',
    firstName: 'Jake',
    lastName: 'Taylor',
    phoneNumber: '(333) 392-2811',
    role: 'User',
    email: '133@mail.com',
  },
  {
    id: uniqueId(),
    fullName: 'Ellen Goldstein',
    firstName: 'Ellen',
    lastName: 'Goldstein',
    phoneNumber: '(183) 356-7393',
    role: 'User',
    email: '134@mail.com',
  },
];

const NUMBER_OF_INITIAL_CHATS = 9;

/**
 * An initial list of users who the active user has ongoing chats with
 */
export const INITIAL_USERS_WITH_MESSAGES: $ReadOnlyArray<LegacyUser> = ALL_USERS.filter(
  u => u.id !== ACTIVE_USER.id,
).slice(0, NUMBER_OF_INITIAL_CHATS);

/**
 * All contact groups for the ContactsApp
 */
export const ALL_CONTACT_GROUPS: $ReadOnlyArray<LegacyContactGroup> = [
  {
    id: uniqueId(),
    groupName: 'Chatterpy',
    members: ALL_USERS.slice(1, 4),
  },
  {
    id: uniqueId(),
    groupName: 'Another Group',
    members: ALL_USERS.slice(5, 7),
  },
  {
    id: uniqueId(),
    groupName: 'My favorite group',
    members: ALL_USERS.slice(3, 8),
  },
  {
    id: uniqueId(),
    groupName: 'Test users',
    members: ALL_USERS.slice(4, 8),
  },
  {
    id: uniqueId(),
    groupName: 'Beta users',
    members: ALL_USERS.slice(7, 10),
  },
  {
    id: uniqueId(),
    groupName: 'MVPs',
    members: ALL_USERS.slice(1, 3),
  },
  {
    id: uniqueId(),
    groupName: 'A test group',
    members: ALL_USERS.slice(3, 6),
  },
  {
    id: uniqueId(),
    groupName: 'Yet another group',
    members: ALL_USERS.slice(2, 4),
  },
  {
    id: uniqueId(),
    groupName: 'The Last Group',
    members: ALL_USERS.slice(4, 7),
  },
];

export const ALL_BILLING_HISTORY: $ReadOnlyArray<BillingHistoryItem> = [
  {
    id: uniqueId(),
    date: moment('2019-06-09', 'YYYY-MM-DD'),
    amount: 199,
  },
  {
    id: uniqueId(),
    date: moment('2019-05-09', 'YYYY-MM-DD'),
    amount: 99,
  },
  {
    id: uniqueId(),
    date: moment('2019-04-09', 'YYYY-MM-DD'),
    amount: 299,
  },
  {
    id: uniqueId(),
    date: moment('2019-03-09', 'YYYY-MM-DD'),
    amount: 50,
  },
  {
    id: uniqueId(),
    date: moment('2019-02-09', 'YYYY-MM-DD'),
    amount: 20,
  },
  {
    id: uniqueId(),
    date: moment('2019-01-09', 'YYYY-MM-DD'),
    amount: 59,
  },
  {
    id: uniqueId(),
    date: moment('2018-12-09', 'YYYY-MM-DD'),
    amount: 100,
  },
];
