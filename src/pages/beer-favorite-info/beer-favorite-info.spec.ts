import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerFavoriteInfoPage } from './beer-favorite-info';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * beer-favorite-info.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 * 
 * Test the BeerFavoriteInfoPage.
 */

describe('BeerFavoriteInfoPage', () => {
  let fixture: ComponentFixture<BeerFavoriteInfoPage>;
  let instance: BeerFavoriteInfoPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerFavoriteInfoPage],
      providers: [
        { provide: NavController, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFavoriteInfoPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the BeerFavoriteInfoPage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
