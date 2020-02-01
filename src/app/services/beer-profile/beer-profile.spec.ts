/**
 * beer-profile.spec.ts
 *
 * Created by jake
 * Created on 11/11/18
 *
 * Test BeerProfileProvider.
 */
import { BeerProfileProvider } from './beer-profile';
import UserPreferences from '../../models/BeerProfile';
import { httpClient, provide } from '../../../../setup-jest';

describe('Test beer-profile provider', () => {
  let prefsProvider: BeerProfileProvider;
  const mockPrefs = {
    uuid: 'prefID'
  } as UserPreferences;

  beforeEach(() => {
    jest.clearAllMocks();
    prefsProvider = new BeerProfileProvider(provide(httpClient));
  });

  it('should call http.get and return the first result in the response', async () => {
    httpClient.get.mockImplementation(() => ({toPromise: () => Promise.resolve({results: [mockPrefs]})}));
    const result = await prefsProvider.retrieve();
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/\/beer-profiles$/));
    expect(result).toBe(mockPrefs);
  });

  it('should call http.put when updating an existing beerProfile object', () => {
    prefsProvider.save(mockPrefs);
    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(expect.stringMatching(/\/beer-profiles\/prefID$/), mockPrefs);
  });

  it('should call http.post when creating a new beerProfile object', () => {
    const newMockPrefs = {} as UserPreferences;
    prefsProvider.save(newMockPrefs);
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/\/beer-profiles$/), newMockPrefs);
  });
});
