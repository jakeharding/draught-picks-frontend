import { UserProvider } from './user';
import User from '../../models/User';
import { httpClient, provide } from '../../../../setup-jest';

/**
 * user.spec.ts
 *
 * Created by jake
 * Created on 10/28/18
 *
 * Test the user provider.
 */

describe('UserProvider', () => {

  let userProvider: UserProvider;
  const mockUser = {
    uuid: 'A unique id'
  } as User;

  beforeEach(() => {
    jest.clearAllMocks();
    userProvider = new UserProvider(provide(httpClient));
  });

  it('should call the httpClient.post', () => {
    userProvider.create(mockUser);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/users/), mockUser);
  });

  it('should call http.get when retrieving a user', async () => {
    httpClient.get.mockImplementation(() => ({toPromise: () => Promise.resolve({results: [mockUser]})}));
    const result = await userProvider.retrieve();
    expect(httpClient.get).toHaveBeenCalled();
    expect(result).toBe(mockUser);
  });

  it('should call http.put when updating a user', () => {
    userProvider.update(mockUser);
    expect(httpClient.put).toHaveBeenCalledWith(expect.stringMatching(/\/users\/A unique id$/), mockUser);
  });

  it('should call http.post with th resend url', () => {
    const email = 'fake email';
    userProvider.resendConfirmEmail({email});
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/users\/resend-confirm-email$/), {email});
  });

  test('confirmEmail should call http.put with the confirm email url', () => {
    userProvider.confirmEmail({key : 'aKey'});
    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(expect.stringMatching(/confirm-email/), {confirm_key: 'aKey'});
  });

});
