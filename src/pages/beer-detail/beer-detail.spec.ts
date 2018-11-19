import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BeerDetailPage } from "./beer-detail";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { RatingComponent } from "../../components/rating/rating";
import { BeerProvider } from "../../providers/beer/beer";
import { RatingProvider } from "../../providers/rating/rating";
import { mockToastController, mockToast } from "../../jestGlobalMocks";
import Beer from "../../models/Beer";
import BeerRating from "../../models/BeerRating";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerDetailPage, RatingComponent],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: ToastController, useValue: mockToastController},
        { provide: BeerProvider, useValue: mockBeerProvider},
        { provide: RatingProvider, useValue: mockRatingProvider},
        { provide: NavParams, useValue: { data: mockBeer }},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the BeerDetailPage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  test('properties are set correctly on initialization with a beer that has ratings', () => {
    expect(component.beer).toEqual(mockBeer);
    expect(component.beerRating).toBeDefined();
    expect(mockBeerProvider.retrieve).toHaveBeenCalledTimes(1);
    expect(component.hasRating).toBe(true);
    expect(component.beerRating).toEqual(mockRating);
  });

  test('createRecent to create error toast', async () => {
    mockBeerProvider.createRecent.mockReturnValue(Promise.reject('error'));
    await component.createRecent();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: "Oops! Something is not right!.",
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.createRecent).toHaveBeenCalledWith(component.beer);
  });

  test('createRecent to create success toast', async () => {
    mockBeerProvider.createRecent.mockReturnValue(Promise.resolve('success'));
    await component.createRecent();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: "We saved a record of this you! Tell us what you think!",
      duration: 3000,
      position: "top",
      cssClass: "success-toast"
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.createRecent).toHaveBeenCalledWith(component.beer);
  });

  test('saveRatingDescription should call ratingProvider.partialUpdate and display a success toast', async () => {
    await component.saveRatingDescription();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: "Your description has been saved!",
      duration: 3000,
      position: "top",
      cssClass: "success-toast"
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
    expect(mockRatingProvider.partialUpdate).toHaveBeenCalledWith(mockRating);
  });

  test('saveRatingDescription should call ratingProvider.create and display a error toast', async () => {
    component.hasRating = false;
    await component.saveRatingDescription();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: "Having trouble saving your description.",
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
    expect(mockRatingProvider.create).toHaveBeenCalledWith(mockRating);
  });

  it('should set the rating', () => {
    const rating = {} as BeerRating;
    component.setRating(rating);
    expect(component.beerRating).toEqual(rating);
  });
});
