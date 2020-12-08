// @flow
import axios from 'axios';
import qs from 'qs';

import type {
  Routes,
  RouteEndpointParams,
  RouteParams,
  RouteResponse,
} from './routes';

// use the prod API URL for now, but eventually switch to use a local API
const BASE_URL = 'http://api.chatterpy.com';

// NOTE: uncomment this once a local API is available
// const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://127.0.0.1:8000'
//     : 'http://api.chatterpy.com';

const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Ensure an endpoint startts and ends with a slash
 */
function standardizeEndpoint(endpoint: string): string {
  const tempEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return tempEndpoint.endsWith('/') ? tempEndpoint : `${tempEndpoint}/`;
}

/**
 * Interpolate the params in an endpoint. E.g.
 * `api/user/:id:/add` with params { id: 4 } will become `api/user/4/add`
 */
function interpolateEndpoint(endpoint: string, params: { ... } | void): string {
  let finalEndpoint = endpoint;
  if (params && typeof params === 'object') {
    const paramKeys = new Set(Object.keys(params));
    finalEndpoint = endpoint
      .split(':')
      .map(k => (paramKeys.has(k) ? params[k] : k))
      .join('');
  }
  return finalEndpoint;
}

/**
 * Service to handle API calls
 */
class HTTPService {
  // the JWT token - only stored in memory.
  _accessToken: string | void = undefined;

  // the refresh token for when the access token expires. We only store this
  // token in memory. We will persist it to local storage when the tab closes,
  // (so we can persist it across browser sessions), but clear it as soon as
  // it is loaded back into memory.
  // then clear it as soon as it is accessed
  _refreshToken: string | void = undefined;

  constructor() {
    // handle persisting refresh token to local storage when the page unloads
    window.addEventListener('beforeunload', () => {
      if (this._refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, this._refreshToken);
      }
    });
  }

  setAccessToken(token: string): this {
    this._accessToken = token;
    return this;
  }

  setRefreshToken(token: string): this {
    this._refreshToken = token;
    return this;
  }

  getAccessToken(): string | void {
    return this._accessToken;
  }

  getRefreshToken(): string | void {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token) {
      // for security, remove the refresh token from local storage as soon
      // as we access it
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      this._refreshToken = token;
    }
    return this._refreshToken;
  }

  async generateNewAccessToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      try {
        const newAccessToken = await this.post('auth/token/refresh', {
          refresh: refreshToken,
        });
        this._accessToken = newAccessToken.access;
      } catch (err) {
        // error refreshing token, so we need to log in again!
        window.location = '/login';
      }
    } else {
      // there is no refresh token so we need to log in again!
      window.location = '/login';
    }
  }

  async dispatch<T>(request: () => Promise<T>): Promise<T> {
    try {
      const response = await request();
      return response;
    } catch (err) {
      // if this is an auth error, then it's likely our auth token expired,
      // so try again
      if (err.response && err.response.status === 401) {
        await this.generateNewAccessToken();
        const response = await request();
        return response;
      }

      throw err;
    }
  }

  async delete<R: Routes<'DELETE'>>(
    endpoint: R,
    endpointParams: RouteEndpointParams<R, 'DELETE'>,
  ): Promise<RouteResponse<R, 'DELETE'>> {
    return this.dispatch(async () => {
      const accessToken = this.getAccessToken();
      const finalEndpoint = interpolateEndpoint(endpoint, endpointParams);
      const response = await axios({
        method: 'DELETE',
        url: `${BASE_URL}${standardizeEndpoint(finalEndpoint)}`,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      });

      if ('data' in response) {
        return response.data;
      }

      throw new Error('DELETE: no data was found in response');
    });
  }

  async get<R: Routes<'GET'>>(
    endpoint: R,
    endpointParams: RouteEndpointParams<R, 'GET'>,
  ): Promise<RouteResponse<R, 'GET'>> {
    return this.dispatch(async () => {
      const accessToken = this.getAccessToken();
      const finalEndpoint = interpolateEndpoint(endpoint, endpointParams);
      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}${standardizeEndpoint(finalEndpoint)}`,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      });

      if ('data' in response) {
        return response.data;
      }

      throw new Error('GET: no data was found in response');
    });
  }

  async post<R: Routes<'POST'>>(
    endpoint: R,
    params: RouteParams<R, 'POST'>,
    endpointParams: RouteEndpointParams<R, 'POST'>,
  ): Promise<RouteResponse<R, 'POST'>> {
    return this.dispatch(async () => {
      const accessToken = this.getAccessToken();
      const finalEndpoint = interpolateEndpoint(endpoint, endpointParams);
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}${standardizeEndpoint(finalEndpoint)}`,
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(params),
      });

      if ('data' in response) {
        return response.data;
      }

      throw new Error('POST: no data was found in response');
    });
  }
}

export default (new HTTPService(): HTTPService);

// interface to enforce that all other services must hold an HTTPService
// singleton instance
export interface IHTTPService {
  http: HTTPService;
}
