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
      put: jest.fn(),
      post: jest.fn(() => toPromise),
  };

  let userProvider: UserProvider;

  beforeEach(() => {
    userProvider = new UserProvider(provide(httpClient));
  });

  it('should call the httpClient.post', () => {
    userProvider.create({} as User);
    expect(httpClient.post).toHaveBeenCalled();
  });


});
