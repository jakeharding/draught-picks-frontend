import { UserProvider } from "./user";
import User from "../../models/User";

/**
 * user.spec.ts.ts
 *
 * Created by jake
 * Created on 10/28/18
 *
 * Test the user provider.
 */

const provide = (mock: any): any => mock;
describe('UserProvider', () => {

  const toPromise = { toPromise: () => Promise.resolve() };
  const httpClient = {
      get: jest.fn(),
      put: jest.fn(() => toPromise),
      post: jest.fn(() => toPromise),
  };

  let userProvider: UserProvider;
  const mockUser = {
    uuid: 'A unique id'
  } as User;

  beforeEach(() => {
    userProvider = new UserProvider(provide(httpClient));
  });

  it('should call the httpClient.post', () => {
    userProvider.create(mockUser);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/users/), mockUser);
  });

  it('should call http.get when retrieving a user', async () => {
    httpClient.get.mockImplementation(() => ({toPromise: () => Promise.resolve({results:[mockUser]})}));
    const result = await userProvider.retrieve();
    expect(httpClient.get).toHaveBeenCalled();
    expect(result).toBe(mockUser);
  });

  it('should call http.put when updating a user', () => {
    userProvider.update(mockUser);
    expect(httpClient.put).toHaveBeenCalledWith(expect.stringMatching(/\/users\/A unique id$/), mockUser);
  });

  it('should call http.post with the confirm url', () => {
    const email = 'fake email';
    userProvider.resendConfirmEmail({email});
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/users\/resend-confirm-email$/), {email});
  });

});
