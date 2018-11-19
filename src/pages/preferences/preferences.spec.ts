/**
 * preferences.spec.ts
 *
 * Created by jake
 * Created on 11/16/18
 *
 * Test the PreferencesPage.
 */
import { PreferencesPage } from "./preferences";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavController, NavParams, NavPush, ToastController } from "ionic-angular";
import { BeerProvider } from "../../providers/beer/beer";
import { UserProvider } from "../../providers/user/user";
import { PreferencesProvider } from "../../providers/preferences/preferences";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { mockToast, mockToastController } from '../../jestGlobalMocks';
import User from "../../models/User";
import UserPreferences from "../../models/UserPreferences";
import Beer from "../../models/Beer";
import { Observable } from "rxjs";

describe('PreferencesPage', () => {
  let component: PreferencesPage;
  let fixture: ComponentFixture<PreferencesPage>;

  const mockBeer = {uuid: 'beerId'} as Beer;
  const mockUser = {favorite_beers: [mockBeer]} as User;
  const mockUserProvider = {
    retrieve: jest.fn(() => Promise.resolve({} as User)),
    update: jest.fn(() => Promise.resolve(mockUser))
  };
  const mockPrefsProvider = {
    retrieve: jest.fn(() => Promise.resolve({} as UserPreferences)),
    save: jest.fn(() => Promise.resolve())
  };

  const mockBeerProvider = {
    search: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PreferencesPage, NavPush, FormGroupDirective],
      providers: [
        {provide: BeerProvider, useValue: mockBeerProvider},
        {provide: UserProvider, useValue: mockUserProvider},
        {provide: PreferencesProvider, useValue: mockPrefsProvider},
        {provide: NavController, useValue: {}},
        {provide: NavParams, useValue: {}},
        {provide: ToastController, useValue: mockToastController},
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the PreferencesPage', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });

  test('properties are set during initialization of component', () => {
    expect(mockUserProvider.retrieve).toHaveBeenCalledTimes(1);
    expect(mockPrefsProvider.retrieve).toHaveBeenCalledTimes(1);
    expect(component.user).toBeDefined();
    expect(component.prefs).toBeDefined();
    expect(component.prefsForm).toBeDefined();
  });

  test('savePrefs should call the toastController.create, prefsProvider.save, and set the prefsForm values to null',
    async () => {
    await component.savePrefs();
    expect(mockToastController.create).toHaveBeenCalledTimes(2);
    expect(mockToast.present).toHaveBeenCalledTimes(2);
    expect(mockPrefsProvider.save).toHaveBeenCalledTimes(1);
    expect(component.prefsForm.value.abv_low).toBeNull();
    expect(component.prefsForm.value.abv_hi).toBeNull();
    expect(component.prefsForm.value.ibu_low).toBeNull();
    expect(component.prefsForm.value.ibu_hi).toBeNull();
  });

  test('savePrefs should call the toastController.create, prefsProvider.save, and not change the prefsForm values',
    async () => {
    component.prefsForm.value.abv_low = '1';
    component.prefsForm.value.abv_hi = '10';
    component.prefsForm.value.ibu_low = '10';
    component.prefsForm.value.ibu_hi = '10';
    await component.savePrefs();
    expect(mockToastController.create).toHaveBeenCalledTimes(2);
    expect(mockToast.present).toHaveBeenCalledTimes(2);
    expect(mockPrefsProvider.save).toHaveBeenCalledTimes(1);
    expect(component.prefsForm.value.abv_low).toBe('1');
    expect(component.prefsForm.value.abv_hi).toBe('10');
    expect(component.prefsForm.value.ibu_low).toBe('10');
    expect(component.prefsForm.value.ibu_hi).toBe('10');
  });

  test('savePrefs should display an error toast when prefsProvider.save is rejected', async () => {
    mockPrefsProvider.save.mockImplementation(() => Promise.reject('error'));
    await component.savePrefs();
    expect(mockToastController.create).toHaveBeenCalledTimes(2);
    expect(mockToast.present).toHaveBeenCalledTimes(2);
    expect(mockPrefsProvider.save).toHaveBeenCalledTimes(1);
  });

  test("favoriteSelected should call userProvider.update with the new beer in the user's favorite", async () => {
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
    const mockSearchResult = Observable.of([mockBeer]);
    mockBeerProvider.search.mockReturnValue(mockSearchResult);
    component.beerSearch = 'aBeer';
    await component.search({} as Event);
    expect(mockBeerProvider.search).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.search).toHaveBeenCalledWith(component.beerSearch);

  });
});
