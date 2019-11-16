/**
 * preferences.spec.ts
 *
 * Created by jake
 * Created on 11/11/18
 *
 * Test PreferencesProvider.
 */
import { PreferencesProvider } from './preferences';
import UserPreferences from '../../models/UserPreferences';
import { httpClient, provide } from '../../../../setup-jest';

describe('Test preferences provider', () => {
  let prefsProvider: PreferencesProvider;
  const mockPrefs = {
    uuid: 'prefID'
  } as UserPreferences;

  beforeEach(() => {
    jest.clearAllMocks();
    prefsProvider = new PreferencesProvider(provide(httpClient));
  });

  it('should call http.get and return the first result in the response', async () => {
    httpClient.get.mockImplementation(() => ({toPromise: () => Promise.resolve({results: [mockPrefs]})}));
    const result = await prefsProvider.retrieve();
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/\/preferences$/));
    expect(result).toBe(mockPrefs);
  });

  it('should call http.put when updating an existing prefs object', () => {
    prefsProvider.save(mockPrefs);
    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith(expect.stringMatching(/\/preferences\/prefID$/), mockPrefs);
  });

  it('should call http.post when creating a new prefs object', () => {
    const newMockPrefs = {} as UserPreferences;
    prefsProvider.save(newMockPrefs);
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/\/preferences$/), newMockPrefs);
  });
});
