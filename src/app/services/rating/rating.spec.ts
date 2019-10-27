/**
 * rating.spec.ts
 *
 * Created by jake
 * Created on 11/11/18
 *
 * Test the RatingProvider.
 */
import { RatingProvider } from './rating';
import { httpClient, provide } from '../../jestGlobalMocks';
import BeerRating from '../../models/BeerRating';

describe('Test Rating Provider', () => {

  let ratingProvider: RatingProvider;
  const mockRating = {
    uuid: 'rating id'
  } as BeerRating;

  beforeEach(() => {
    jest.clearAllMocks();
    ratingProvider = new RatingProvider(provide(httpClient));
  });

  it('should call http.post with the create url and the rating object', () => {
    ratingProvider.create(mockRating);
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(expect.stringMatching(/\/beer-ratings$/), mockRating);
  });

  it('should call http.patch with the update url and rating object', () => {
    ratingProvider.partialUpdate(mockRating);
    expect(httpClient.patch).toHaveBeenCalledTimes(1);
    expect(httpClient.patch).toHaveBeenCalledWith(expect.stringMatching(/\/beer-ratings\/rating id/), mockRating);
  });

});

