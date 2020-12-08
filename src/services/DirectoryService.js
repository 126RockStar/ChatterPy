// @flow
import HTTPService from './HTTPService';
import type { IHTTPService } from './HTTPService';
import type { User, SerializedUser } from '../components/ChatterPyApp/types';

const ACTIVE_USER_KEY = 'activeUser';

function serializeUser(user: User): SerializedUser {
  return {
    account: user.account,
    email: user.email,
    username: user.email,
    file: user.file,
    first_name: user.firstName,
    last_name: user.lastName,
    is_account_manager: user.isAccountManager,
    id: user.id,
    phone_number: user.phoneNumber,
  };
}

export function deserializeUser(serializedUser: SerializedUser): User {
  let fullDisplayName = serializedUser.email;
  if (serializedUser.first_name || serializedUser.last_name) {
    fullDisplayName = [
      serializedUser.first_name,
      serializedUser.last_name,
    ].join(' ');
  }

  return {
    fullDisplayName,
    account: serializedUser.account,
    email: serializedUser.email,
    firstName: serializedUser.first_name,
    lastName: serializedUser.last_name,
    id: serializedUser.id,
    isAccountManager: serializedUser.is_account_manager,
    phoneNumber: serializedUser.phone_number,
    file: serializedUser.file,
    username: serializedUser.username,
  };
}

/**
 * Service to interact with the user directory
 */
class DirectoryService implements IHTTPService {
  http: typeof HTTPService;
  _activeUser: User | void = undefined;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;

    // handle persisting the active user to local storage when the page unloads
    window.addEventListener('beforeunload', () => {
      if (this._activeUser) {
        localStorage.setItem(
          ACTIVE_USER_KEY,
          JSON.stringify(serializeUser(this._activeUser)),
        );
      }
    });
  }

  setActiveUser(user: User): this {
    this._activeUser = user;
    return this;
  }

  getActiveUser(): User {
    const serializedUser = localStorage.getItem(ACTIVE_USER_KEY);
    if (serializedUser) {
      localStorage.removeItem(ACTIVE_USER_KEY);
      this.setActiveUser(deserializeUser(JSON.parse(serializedUser)));
    }

    if (this._activeUser === undefined) {
      // if there is no active user ask them to log in again
      window.location = '/login';
      throw new Error('Unreachable code');
    }

    return this._activeUser;
  }

  async getAllUsers(): Promise<Array<User>> {
    const data = await this.http.get('v1/users');
    return data.results.map(deserializeUser);
  }
}

export default (new DirectoryService(HTTPService): DirectoryService);
