/**
 * beer-item.spec.ts
 *
 * Created by jake
 * Created on 11/15/18
 *
 * Test the beer-item component.
 */
import { BeerItemComponent } from './beer-item';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavPush } from 'ionic-angular';
import { RatingComponent } from '../rating/rating';
import { RatingProvider } from '../../providers/rating/rating';
import { ToastController } from 'ionic-angular';

describe('BeerItemComponent', () => {
  let component: BeerItemComponent;
  let fixture: ComponentFixture<BeerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerItemComponent, NavPush, RatingComponent],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: RatingProvider, useValue: {}},
        { provide: ToastController, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerItemComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the BeerItemComponent and match snapshot', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });
});
