/**
 * auth.spec.ts
 *
 * Created by jake
 * Created on 11/14/18
 *
 * Test the AuthProvider
 */
import { AuthProvider, LoginRequired, TOKEN_STO_KEY } from './auth';
import { httpClient, provide } from '../../jestGlobalMocks';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('AuthProvider', () => {

  let authProvider: AuthProvider;

  beforeEach(() => {
    jest.clearAllMocks();
    authProvider = new AuthProvider(provide(httpClient));
    localStorage.setItem(TOKEN_STO_KEY, 'auth');
  });

  it('should set the auth token on the headers', () => {
    const mockHandler = {
      handle: jest.fn(() => Observable.empty()),
    } as HttpHandler;
    const mockRequest = new HttpRequest('POST', 'url', {});
    mockRequest.clone = jest.fn();
    authProvider.intercept(mockRequest, mockHandler);
    expect(mockHandler.handle).toHaveBeenCalled();
    expect(mockRequest.clone).toHaveBeenCalledWith({ setHeaders: { Authorization: 'Token auth'}});
    localStorage.clear();
  });

  it('should return the token from local storage', () => {
    const token = authProvider.getToken();
    expect(token).toEqual('auth');
  });

  it('should set the token in local storage', () => {
    authProvider.setToken('newToken');
    expect(localStorage.getItem(TOKEN_STO_KEY)).toBe('newToken');
  });

  it('should call http.post with the sign in url', async () => {
    httpClient.post.mockImplementation(() => ({ map: () => ({toPromise: () => Promise.resolve()})}));
    await authProvider.signIn({});
    expect(httpClient.post).toHaveBeenCalledTimes(1);
  });

  it('should remove the token from local storage', () => {
    authProvider.clearToken();
    expect(localStorage.getItem(TOKEN_STO_KEY)).toBeNull();
  });

  test('isLoggedIn', () => {
    expect(authProvider.isLoggedIn()).toBe(true);
    localStorage.clear();
    expect(authProvider.isLoggedIn()).toBe(false);
  });
});

describe('LoginRequired', () => {
  it('should set the ionViewCanEnter on the target', () => {
    const target = new Function();
    location.assign = jest.fn();
    LoginRequired(target);
    expect(target.prototype.ionViewCanEnter()).toBe(false);
    expect(location.assign).toHaveBeenCalledTimes(1);
    expect(location.assign).toHaveBeenCalledWith('sign-in');
  });
});
