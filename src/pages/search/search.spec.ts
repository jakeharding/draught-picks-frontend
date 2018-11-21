import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPage } from './search';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfiniteScrollerDirective, LIMIT } from '../../directives/infinite-scroller/infinite-scroller';
import { BeerProvider } from '../../providers/beer/beer';
import { Observable } from 'rxjs';
import Beer from '../../models/Beer';
import mock = jest.mock;

/**
 * search.spec.ts
 *
 * Created by jake
 * Created on 2018-11-20
 * 
 * Test SearchPage.
 */

describe('SearchPage', () => {
  let fixture: ComponentFixture<SearchPage>;
  let component: SearchPage;

  const mockBeerProvider = {
    search: jest.fn(() => Observable.of([]))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SearchPage, InfiniteScrollerDirective],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: NavParams, useValue: {}},
        { provide: BeerProvider, useValue: mockBeerProvider}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the SearchPage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  test('ionViewWillEnter will reset beerResults and message', () => {
    component.ionViewWillEnter();
    expect(component.beerResults).toEqual([]);
    expect(component.message).toEqual('Search for a beer and let us know what you like about it.');
  });

  test('search with call beerProvider.search to search for beers', async () => {
    const search = 'Bud';
    component.beerSearch = search;
    await component.search({} as Event);
    expect(mockBeerProvider.search).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.search).toHaveBeenCalledWith({search});
  });

  test('getBeers calls beerProvider.search when loadMore is true', async () => {
    component.loadMore = true;
    await component.getBeers();
    expect(mockBeerProvider.search).toHaveBeenCalledTimes(1);
  });

  test("getBeers doesn't calls beerProvider.search when loadMore is false", async () => {
    component.loadMore = false;
    const result = await component.getBeers();
    expect(mockBeerProvider.search).not.toHaveBeenCalled();
    expect(result).toEqual(Observable.empty());
  });

  test('processData sets loadMore to false when called with empty list', () => {
    component['processData']([]);
    expect(component.loadMore).toBe(false);
  });

  test('processData sets offset and adds to beerResults', () => {
    const mockBeer = {uuid:'beer'} as Beer;
    const currentOffset = component.offset;
    component.beerResults = [];
    component['processData']([mockBeer]);
    expect(component.loadMore).toBe(true);
    expect(component.offset).toBe(currentOffset + LIMIT);
    expect(component.beerResults).toContain(mockBeer);
  });

  it('should reset the message and beerResults', () => {
    component.clear({} as Event);
    expect(component.message).toEqual('Search for a beer and let us know what you like about it.');
    expect(component.beerResults).toBeNull();
  });
});
