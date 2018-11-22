import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPage } from './sign-in';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavPush, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { mockNavController, mockToast, mockToastController } from '../../jestGlobalMocks';
import { TabsPage } from '../tabs/tabs';

/**
 * sign-in.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 * 
 * Test SignInPage.
 */

describe('SignInPage', ()=> {
  let fixture: ComponentFixture<SignInPage>;
  let component: SignInPage;

  const mockAuthProvider = {
    isLoggedIn: jest.fn().mockReturnValue(true),
    signIn: jest.fn().mockReturnValue(Promise.resolve({token: 'token'})),
    setToken: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SignInPage, FormGroupDirective, NavPush],
      providers: [
        { provide: ToastController, useValue: mockToastController},
        { provide: AuthProvider, useValue: mockAuthProvider},
        { provide: NavController, useValue: mockNavController},
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the SignInPage and set root to TabsPage if logged in', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    expect(mockNavController.setRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.setRoot).toHaveBeenCalledWith(TabsPage);
  });

  test('signIn should call authProvider.setToken and navCtrl.setRoot when promise resolves', async () => {
    jest.clearAllMocks();
    await component.signIn();
    expect(mockAuthProvider.setToken).toHaveBeenCalledTimes(1);
    expect(mockAuthProvider.setToken).toHaveBeenCalledWith('token');
    expect(mockNavController.setRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.setRoot).toHaveBeenCalledWith(TabsPage);
  });

  test('signIn should show error toast when promise is rejected', async () => {
    mockAuthProvider.signIn.mockReturnValue(Promise.reject('error'));
    await component.signIn();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'An error occurred please check your connection and try again.',
      duration: 3000,
      position: 'top',
      cssClass: 'error-toast'
    });
    expect(mockToast.present).toHaveBeenCalledTimes(1);
  });
});
