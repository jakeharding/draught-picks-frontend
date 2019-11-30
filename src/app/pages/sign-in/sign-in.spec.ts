import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPage } from './sign-in';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { AuthProvider } from '../../services/auth/auth';
import { mockNavController, mockToastProvider } from '../../../../setup-jest';
import { ToastProvider } from '../../services/toast/toast';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * sign-in.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 *
 * Test SignInPage.
 */

describe('SignInPage', () => {
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
      declarations: [SignInPage, FormGroupDirective],
      imports: [RouterTestingModule],
      providers: [
        { provide: ToastProvider, useValue: mockToastProvider},
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
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('tabs');
  });

  test('signIn should call authProvider.setToken and navCtrl.navigateRoot when promise resolves', async () => {
    jest.clearAllMocks();
    await component.signIn();
    expect(mockAuthProvider.setToken).toHaveBeenCalledTimes(1);
    expect(mockAuthProvider.setToken).toHaveBeenCalledWith('token');
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('/tabs/home');
  });

  test('signIn should show error toast when promise is rejected', async () => {
    mockAuthProvider.signIn.mockReturnValue(Promise.reject('error'));
    await component.signIn();
    expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
    expect(mockToastProvider.errorToast).toHaveBeenCalledWith('Unable to sign you in. Have you verified your email address?');
  });
});
