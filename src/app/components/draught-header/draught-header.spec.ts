/**
 * draught-header.spec.ts
 *
 * Created by jake
 * Created on 11/15/18
 *
 * Test the DraughtHeaderComponent
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DraughtHeaderComponent } from './draught-header';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProvider } from '../../services/auth/auth';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { HomePage } from '../../pages/home/home';

describe('DraughtHeaderComponent', () => {
  let component: DraughtHeaderComponent;
  let fixture: ComponentFixture<DraughtHeaderComponent>;

  const mockAuthProvider = {
    isLoggedIn: jest.fn(),
    clearToken: jest.fn(),
    provide: jest.fn()
  };

  const mockNavCtrl = {
    setRoot: jest.fn(),
    provide: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DraughtHeaderComponent],
      providers: [
        {provide: AuthProvider, useValue: mockAuthProvider},
        {provide: NavController, useValue: mockNavCtrl}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraughtHeaderComponent);
    component = fixture.debugElement.componentInstance;
    jest.clearAllMocks();
  });

  it('should initialize the DraughtHeaderComponent', () => {
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });

  test('logout() should call authProvider.clearToken and navCtrl.setRoot', () => {
    component.logout();
    expect(mockAuthProvider.clearToken).toHaveBeenCalledTimes(1);
    expect(mockNavCtrl.setRoot).toHaveBeenCalledWith(SignInPage);
  });

  test('home() should call authProvider.isLoggedIn and setRoot with HomePage when a user is logged in', () => {
    mockAuthProvider.isLoggedIn.mockReturnValue(true);
    component.home();
    expect(mockAuthProvider.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(mockNavCtrl.setRoot).toHaveBeenCalledWith(HomePage);
  });

  test('home() should call authProvider.isLoggedIn and setRoot with SignInPage when a user is not logged in', () => {
    mockAuthProvider.isLoggedIn.mockReturnValue(false);
    component.home();
    expect(mockAuthProvider.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(mockNavCtrl.setRoot).toHaveBeenCalledWith(SignInPage);
  });
});
