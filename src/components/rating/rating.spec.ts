import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RatingComponent } from "./rating";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ToastController } from "ionic-angular";
import { RatingProvider } from "../../providers/rating/rating";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RatingComponent],
      providers: [
        {provide: RatingProvider, useValue: {}},
        {provide: ToastController, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.debugElement.componentInstance;
    // jest.clearAllMocks();
  });

  it('should initialize the RatingComponent', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });


});
