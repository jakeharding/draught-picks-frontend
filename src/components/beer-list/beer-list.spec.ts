/**
 * beer-list.spec.ts
 *
 * Created by jake
 * Created on 11/15/18
 *
 * Test the beer list component.
 */
import { BeerListComponent } from './beer-list';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BeerItemComponent } from '../beer-item/beer-item';
import { NavPush } from 'ionic-angular';
import { RatingComponent } from '../rating/rating';

describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerListComponent, BeerItemComponent, NavPush, RatingComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the BeerListComponent', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });
});

