/**
 * beer.spec.ts
 *
 * Created by jake
 * Created on 11/11/18
 *
 * Test BeerProvider
 */
import { BeerProvider } from "./beer";
import Beer from "../../models/Beer";
import { LIMIT } from "../../directives/infinite-scroller/infinite-scroller";
import { httpClient, provide } from "../../jestGlobalMocks";

describe('Test beer provider', () => {
  let beerProvider: BeerProvider;
  const mockBeer = {
    uuid: 'beerId'
  } as Beer;

  beforeEach(() => {
    jest.clearAllMocks();
    beerProvider = new BeerProvider(provide(httpClient));
  });

  it('should call http.get with the default params and the beer name', () => {
    const mockResults = [];
    httpClient.get.mockImplementation(() => ({map: () => ({results: mockResults})}));
    const params = {
      search: 'beerName',
      limit: LIMIT,
      offset: 0
    };

    beerProvider.getResults('beerName');
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/\/beers$/), {params});
  });

  it('should call http.get with the recent beers url', () => {
    const mockResults = [];
    httpClient.get.mockImplementation(() => ({map: () => (mockResults)}));

    const params = {
      limit: LIMIT,
      offset: 0
    };
    const results = beerProvider.recents({});
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/\/recent-beers$/), {params});
    expect(results).toBe(mockResults);
  });

  it('should call http.get with the recommended url', async () => {
    const mockResults = [];
    httpClient.get.mockImplementation(() => ({map: () => mockResults}));

    const params = {
      limit: LIMIT,
      offset: 0
    };
    const results = await beerProvider.recommended({});
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/\/recommended-beers$/), {params});
    expect(results).toBe(mockResults);
  });

  it('should call http.post with the create recent url', () => {
    beerProvider.createRecent(mockBeer);
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/\/recent-beers$/), {beer: mockBeer.uuid});
  });

  it('should call http.get with the beers url and a uuid', () => {
    httpClient.get.mockImplementation(() => ({toPromise: () => Promise.resolve()}));
    beerProvider.retrieve('uuid');
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringMatching(/beers\/uuid$/));
  });
});
