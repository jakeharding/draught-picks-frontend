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
import { HomePage } from '../../pages/home/home';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute, mockNavController } from '../../../../setup-jest';

describe('DraughtHeaderComponent', () => {
  let component: DraughtHeaderComponent;
  let fixture: ComponentFixture<DraughtHeaderComponent>;

  const mockAuthProvider = {
    isLoggedIn: jest.fn(),
    clearToken: jest.fn(),
    provide: jest.fn()
  };

  // const mockNavCtrl = {
  //   setRoot: jest.fn(),
  //   provide: jest.fn()
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DraughtHeaderComponent],
      providers: [
        {provide: AuthProvider, useValue: mockAuthProvider},
        {provide: NavController, useValue: mockNavController},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},

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
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('sign-in');
  });

  test('home() should call authProvider.isLoggedIn and setRoot with HomePage when a user is logged in', () => {
    mockAuthProvider.isLoggedIn.mockReturnValue(true);
    component.home();
    expect(mockAuthProvider.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('/tabs/home');
  });

  test('home() should call authProvider.isLoggedIn and navigateRoot with sign-in when a user is not logged in', () => {
    mockAuthProvider.isLoggedIn.mockReturnValue(false);
    component.home();
    expect(mockAuthProvider.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('sign-in');
  });
});
