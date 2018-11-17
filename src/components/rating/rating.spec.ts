import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RatingComponent } from "./rating";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ToastController } from "ionic-angular";
import { RatingProvider } from "../../providers/rating/rating";
import BeerRating from "../../models/BeerRating";

/**
 * rating.spec.ts
 *
 * Created by jake
 * Created on 11/15/18
 *
 * Test the RatingComponent.
 */

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  const mockToast = {
    present: jest.fn()
  };
  const mockRatingProvider = {
    partialUpdate: jest.fn(() => Promise.resolve()),
    create: jest.fn(() => Promise.resolve())
  };
  const mockToastController = {
    create: jest.fn(()=> mockToast)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RatingComponent],
      providers: [
        {provide: RatingProvider, useValue: mockRatingProvider},
        {provide: ToastController, useValue: mockToastController}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.debugElement.componentInstance;
    component.size = 'large';
  });

  it('should initialize the RatingComponent', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });

  test('updateRating should call ratingProvider.partialUpdate when a rating exists', async () => {
    component.rating = { uuid: 'beerRating' } as BeerRating;
    await component.updateRating(1);
    expect(mockRatingProvider.partialUpdate).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });

  test("updateRating should call ratingProvider.create when a rating doesn't exist", async () => {
    // Implicitly tests the createRating method.
    component.rating = { beer: 'beerId'} as BeerRating;
    await component.updateRating(2);
    expect(mockRatingProvider.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });
});
