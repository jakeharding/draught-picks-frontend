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
import { mockActivatedRoute, mockNavController } from '../../../../setup-jest';
import { ActivatedRoute } from '@angular/router';

describe('ConfirmEmailPage', () => {

  let fixture: ComponentFixture<ConfirmEmailPage>;
  let component: ConfirmEmailPage;

  const mockUserProvider = {
    confirmEmail: jest.fn(() => Promise.resolve()),
  };

  const mockToastProvider = {
    errorToast: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ConfirmEmailPage],
      providers: [
        { provide: NavController, useValue: mockNavController},
        { provide: UserProvider, useValue: mockUserProvider },
        { provide: ToastProvider, useValue: mockToastProvider},
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

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
    component.confirmKey = 'key';
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
    component.confirmKey = 'key';
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

  test('goToLink will go to sendEmailPage when showResendLink is true', () => {
    component.showResendLink = true;
    component.goToLink();
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('send-email/confirm');
  });
});
