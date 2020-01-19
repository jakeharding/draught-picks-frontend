import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerDetailPage } from './beer-detail';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RatingComponent } from '../../components/rating/rating';
import { BeerProvider } from '../../services/beer/beer';
import { RatingProvider } from '../../services/rating/rating';
import Beer from '../../models/Beer';
import BeerRating from '../../models/BeerRating';
import { ActivatedRoute, Router } from '@angular/router';
import { mockActivatedRoute, mockRouter, mockToast, mockToastProvider } from '../../../../setup-jest';
import { ToastProvider } from '../../services/toast/toast';

/**
 * beer-detail.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 *
 * Test the BeerDetailPage.
 */

describe('BeerDetailPage', () => {
  let fixture: ComponentFixture<BeerDetailPage>;
  let component: BeerDetailPage;

  const mockRating = { uuid: 'aRating'} as BeerRating;
  const mockBeer = { uuid: 'beerId', name: 'BEER', description: 'GOOD', ibu: null, rating: [mockRating] } as Beer;
  const mockBeerProvider = {
    retrieve: jest.fn(() => Promise.resolve(mockBeer)),
    createRecent: jest.fn()
  };

  const mockRatingProvider = {
    partialUpdate: jest.fn(() => Promise.resolve()),
    create: jest.fn(() => Promise.reject('BOOM'))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerDetailPage, RatingComponent],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: BeerProvider, useValue: mockBeerProvider},
        { provide: RatingProvider, useValue: mockRatingProvider},
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: Router, useValue: mockRouter},
        { provide: ToastProvider, useValue: mockToastProvider}
      ]
    }).compileComponents();
  });

  describe('page init', () => {
    it('should initialize the BeerDetailPage using the extras state', () => {
      mockRouter.getCurrentNavigation.mockReturnValue({extras: {state: {beer: mockBeer}}});
      fixture = TestBed.createComponent(BeerDetailPage);
      component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
      expect(fixture).toMatchSnapshot();
      expect(component.beer).toBe(mockBeer);
      // Assert properties are set correctly for a beer with ratings
      expect(component.beerRating).toBeDefined();
      expect(mockBeerProvider.retrieve).toHaveBeenCalledTimes(1);
      expect(component.beerRating).toEqual(mockRating);
    });

    it('should initialize the BeerDetailPage with the uuid only', () => {
      mockRouter.getCurrentNavigation.mockReturnValue({extras: {}});
      const uuidOnly = {uuid: 'test uuid'};
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue(uuidOnly.uuid);
      fixture = TestBed.createComponent(BeerDetailPage);
      component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
      expect(fixture).toMatchSnapshot();
      expect(component.beer).toEqual(uuidOnly);
    });
  });

  describe('test methods', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BeerDetailPage);
      component = fixture.debugElement.componentInstance;
    });
    test('createRecent to create error toast', async () => {
      mockBeerProvider.createRecent.mockReturnValue(Promise.reject('error'));
      await component.createRecent();
      expect(mockToastProvider.errorToast).toHaveBeenCalledWith();
      expect(mockBeerProvider.createRecent).toHaveBeenCalledWith(component.beer);
    });

    test('createRecent to create success toast', async () => {
      mockBeerProvider.createRecent.mockReturnValue(Promise.resolve('success'));
      await component.createRecent();
      expect(mockToastProvider.successToast).toHaveBeenCalledTimes(1);
      expect(mockToastProvider.successToast).toHaveBeenCalledWith('We saved a record of this you! Tell us what you think!');
      expect(mockBeerProvider.createRecent).toHaveBeenCalledWith(component.beer);
    });

    test('saveRatingDescription should call ratingProvider.partialUpdate and display a success toast', async () => {
      mockRatingProvider.partialUpdate.mockResolvedValue();
      await component.saveRatingDescription();
      expect(mockToastProvider.successToast).toHaveBeenCalledTimes(1);
      expect(mockRatingProvider.partialUpdate).toHaveBeenCalledWith(mockRating);
    });

    test('saveRatingDescription should display a error toast', async () => {
      await component.saveRatingDescription();
      expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
      expect(mockToastProvider.errorToast).toHaveBeenCalledWith('Having trouble saving your description.');
      expect(mockRatingProvider.create).toHaveBeenCalledWith(mockRating);
    });

    it('should set the rating', () => {
      const rating = {} as BeerRating;
      component.setRating(rating);
      expect(component.beerRating).toEqual(rating);
    });
  });
});
