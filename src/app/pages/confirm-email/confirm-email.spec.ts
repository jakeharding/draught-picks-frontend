/**
 * confirm-email.spec.ts
 *
 * Created by jake
 * Created on 10/21/18
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmEmailPage } from './confirm-email';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { UserProvider } from '../../services/user/user';
import { ToastProvider } from '../../services/toast/toast';
import { 'sign-in' } from '../sign-in/sign-in';
import { ResendEmailPage } from '../resend-email/resend-email';
import { mockNavController } from '../../../../setup-jest';

describe('ConfirmEmailPage', () => {

  let fixture: ComponentFixture<ConfirmEmailPage>;
  let component: ConfirmEmailPage;
  const navParams = new NavParams({ key: 'key'});
  const mockUserProvider = {
    confirmEmail: jest.fn(() => Promise.resolve()),
  };

  const mockToastProvider = {
    errorToast: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ConfirmEmailPage],
      providers: [
        { provide: NavController, useValue: mockNavController},
        { provide: UserProvider, useValue: mockUserProvider },
        { provide: NavParams, useValue: navParams },
        { provide: ToastProvider, useValue: mockToastProvider}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the ConfirmEmailPage', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  test('ionViewWillEnter on failed promise with non client error', () => {
    mockUserProvider.confirmEmail.mockReturnValue(Promise.reject('error'));
    component.ionViewDidEnter();
    expect(mockUserProvider.confirmEmail).toHaveBeenCalledTimes(1);
    expect(mockUserProvider.confirmEmail).toHaveBeenCalledWith({key: 'key'});
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  test('ionViewWillEnter on failed promise with client error', () => {
    const rejectedPromise = Promise.reject({
      status: 400,
      error: {
        confirm_key: 'BOOM!'
      }
    });
    mockUserProvider.confirmEmail.mockReturnValue(rejectedPromise);
    component.ionViewDidEnter();
    expect(mockUserProvider.confirmEmail).toHaveBeenCalledTimes(1);
    expect(mockUserProvider.confirmEmail).toHaveBeenCalledWith({key: 'key'});
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  test('goToLink will go to sign-in when showResendLink is false', () => {
    component.goToLink();
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('sign-in');
  });

  test('goToLink will go to ResendEmailPage when showResendLink is true', () => {
    component.showResendLink = true;
    component.goToLink();
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('resend-email');
  });
});
