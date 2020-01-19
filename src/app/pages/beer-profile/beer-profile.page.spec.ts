/**
 * preferences.spec.ts
 *
 * Created by jake
 * Created on 11/16/18
 *
 * Test the BeerProfilePage.
 */
import { BeerProfilePage } from './beer-profile.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import { UserProvider } from '../../services/user/user';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import User from '../../models/User';
import BeerProfile from '../../models/BeerProfile';
import Beer from '../../models/Beer';
import { of } from 'rxjs';
import { mockToastProvider } from '../../../../setup-jest';
import { ToastProvider } from '../../services/toast/toast';
import { BeerProfileProvider } from '../../services/beer-profile/beer-profile';

describe('BeerProfilePage', () => {
  let component: BeerProfilePage;
  let fixture: ComponentFixture<BeerProfilePage>;

  const mockBeer = {uuid: 'beerId'} as Beer;
  const mockUser = {favorite_beers: [mockBeer]} as User;
  const mockUserProvider = {
    retrieve: jest.fn(() => Promise.resolve({} as User)),
    update: jest.fn(() => Promise.resolve(mockUser))
  };
  const mockProfileProvider = {
    retrieve: jest.fn(() => Promise.resolve({} as BeerProfile)),
    save: jest.fn(() => Promise.resolve())
  };

  const mockBeerProvider = {
    search: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BeerProfilePage, FormGroupDirective],
      providers: [
        {provide: BeerProvider, useValue: mockBeerProvider},
        {provide: UserProvider, useValue: mockUserProvider},
        {provide: BeerProfileProvider, useValue: mockProfileProvider},
        {provide: NavController, useValue: {}},
        {provide: ToastProvider, useValue: mockToastProvider},
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerProfilePage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the BeerProfilePage', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });

  test('properties are set during initialization of component', () => {
    expect(mockUserProvider.retrieve).toHaveBeenCalledTimes(1);
    expect(mockProfileProvider.retrieve).toHaveBeenCalledTimes(1);
    expect(component.user).toBeDefined();
    expect(component.beerProfileForm).toBeDefined();
  });

  test('savePrefs should call the toastController.create, prefsProvider.save, and set the prefsForm values to null',
    async () => {
      await component.saveProfile();
      expect(mockToastProvider.successToast).toHaveBeenCalledTimes(2);
      expect(mockProfileProvider.save).toHaveBeenCalledTimes(1);
      expect(component.beerProfileForm.value.abv_low).toBeNull();
      expect(component.beerProfileForm.value.abv_hi).toBeNull();
      expect(component.beerProfileForm.value.ibu_low).toBeNull();
      expect(component.beerProfileForm.value.ibu_hi).toBeNull();
    });

  test('savePrefs should call the mockToastProvider.successToast, prefsProvider.save, and not change the prefsForm values',
    async () => {
      component.beerProfileForm.value.abv_low = '1';
      component.beerProfileForm.value.abv_hi = '10';
      component.beerProfileForm.value.ibu_low = '10';
      component.beerProfileForm.value.ibu_hi = '10';
      await component.saveProfile();
      expect(mockToastProvider.successToast).toHaveBeenCalledTimes(2);
      expect(mockProfileProvider.save).toHaveBeenCalledTimes(1);
      expect(component.beerProfileForm.value.abv_low).toBe('1');
      expect(component.beerProfileForm.value.abv_hi).toBe('10');
      expect(component.beerProfileForm.value.ibu_low).toBe('10');
      expect(component.beerProfileForm.value.ibu_hi).toBe('10');
    });

  test('savePrefs should display an error toast when prefsProvider.save is rejected', async () => {
    mockProfileProvider.save.mockImplementation(() => Promise.reject('error'));
    await component.saveProfile();
    expect(mockToastProvider.successToast).toHaveBeenCalledTimes(1);
    expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
    expect(mockProfileProvider.save).toHaveBeenCalledTimes(1);
  });

  test('favoriteSelected should call userProvider.update with the new beer in the user\'s favorite', async () => {
    component.user = {favorite_beers: [] as Array<Beer>} as User;
    await component.favoriteSelected(mockBeer);
    expect(mockUserProvider.update).toHaveBeenCalledTimes(1);
    expect(component.user.favorite_beers).toContain(mockBeer);
    expect(component.beerSearch).toBe('');
  });

  test('favoriteSelected should only reset the beerSearch if the beer is already a favorite', () => {
    component.user = mockUser;
    component.favoriteSelected(mockBeer);
    expect(mockUserProvider.update).not.toHaveBeenCalled();
    expect(component.beerSearch).toBe('');
  });

  test('removeFavorite should call remove the beer from favorite beers and call userProvider.update', () => {
    component.user.favorite_beers = [mockBeer];
    component.removeFavorite(mockBeer);
    expect(component.user.favorite_beers).not.toContain(mockBeer);
    expect(mockUserProvider.update).toHaveBeenCalledTimes(1);
  });

  test('search should call beerProvider.search when a value is entered', async () => {
    const mockSearchResult = of([mockBeer]);
    mockBeerProvider.search.mockReturnValue(mockSearchResult);
    component.beerSearch = 'aBeer';
    await component.search({} as Event);
    expect(mockBeerProvider.search).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.search).toHaveBeenCalledWith(component.beerSearch);

  });
});
