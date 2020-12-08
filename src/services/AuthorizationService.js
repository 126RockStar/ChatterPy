// @flow
import AccountService from './AccountsService';
import DirectoryService, { deserializeUser } from './DirectoryService';
import HTTPService from './HTTPService';
import type { User } from '../components/ChatterPyApp/types';
import type { IHTTPService } from './HTTPService';

type RegistrationParams = {
  email: string,
  password1: string,
  password2: string,
  firstName: string,
  lastName: string,
  phone_number: string,
};

const DEFAULT_ACCOUNT_COMPANY_NAME = 'Default Company';
const DEFAULT_ACCOUNT_COMPANY_SIZE = 5;

/**
 * Service to handle authorization
 */
class AuthorizationService implements IHTTPService {
  http: typeof HTTPService;

  constructor(httpService: typeof HTTPService) {
    this.http = httpService;
  }

  /**
   * Check if the user is logged in. A user is logged in if we have a valid
   * refresh token available.
   */
  isLoggedIn(): boolean {
    return !!this.http.getRefreshToken();
  }

  /**
   * Register a new user
   */
  async register({
    email,
    password1,
    firstName,
    lastName,
    phone_number,
  }: RegistrationParams): Promise<void> {
    const response = await this.http.post('/v1/users/', {
      email,
      phone_number,
      password: password1,
      username: email,
    });
    const { access_token: accessToken, refresh_token: refreshToken } = response;
    this.http.setAccessToken(accessToken).setRefreshToken(refreshToken);

    // connect an account to the user we just registered
    await AccountService.addAccount(
      DEFAULT_ACCOUNT_COMPANY_NAME,
      DEFAULT_ACCOUNT_COMPANY_SIZE,
    );
  }

  async login(email: string, password: string): Promise<User> {
    const loginResponse = await this.http.post('auth/login', {
      email,
      password,
      username: email,
    });
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: serializedUser,
    } = loginResponse;
    this.http.setAccessToken(accessToken).setRefreshToken(refreshToken);

    const user = deserializeUser(serializedUser);
    DirectoryService.setActiveUser(user);
    return user;
  }
  async logout() {
    localStorage.clear();
    window.location = '/login';
  }
}

export default (new AuthorizationService(HTTPService): AuthorizationService);
