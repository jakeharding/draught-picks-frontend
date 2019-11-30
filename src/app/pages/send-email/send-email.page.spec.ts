import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailReason, SendEmailPage } from './send-email.page';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';
import { UserProvider } from '../../services/user/user';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../../../setup-jest';
import { By } from '@angular/platform-browser';
import User from '../../models/User';

describe('SendEmailPage', () => {
  let component: SendEmailPage;
  let fixture: ComponentFixture<SendEmailPage>;

  const mockUserProvider = {
    resendConfirmEmail: jest.fn(() => Promise.resolve()),
    sendPasswordResetEmail: jest.fn()
  };

  const mockToastProvider = {
    successToast: jest.fn(),
    errorToast: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SendEmailPage, FormGroupDirective],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: NavParams, useValue: {}},
        { provide: ToastProvider, useValue: mockToastProvider},
        { provide: UserProvider, useValue: mockUserProvider},
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the SendEmailPage with reason undefined', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('a.pointer'))).toHaveLength(2);
  });

  test('setReason', () => {
    component.setReason(EmailReason.CONFIRM);
    expect(component.reason).toBeDefined();
    expect(component.reason.message).toBe('confirm your email.');
  });

  test('sendConfirmEmail successToast is called on promise resolve', async () => {
    await component.sendConfirmEmail();
    expect(mockUserProvider.resendConfirmEmail).toHaveBeenCalledTimes(1);
    expect(mockToastProvider.successToast).toHaveBeenCalledTimes(1);
  });

  test('sendConfirmEmail successToast is called on promise reject', async () => {
    mockUserProvider.resendConfirmEmail.mockReturnValue(Promise.reject('error'));
    await component.sendConfirmEmail();
    expect(mockUserProvider.resendConfirmEmail).toHaveBeenCalledTimes(1);
    expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
  });

  test('sendResetEmail calls userProvider.sendPasswordResetEmail', async () => {
    mockUserProvider.sendPasswordResetEmail.mockResolvedValue('');
    component.emailForm.value.email = 't@t.com';
    await component.sendResetEmail();
    expect(mockUserProvider.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(mockUserProvider.sendPasswordResetEmail).toHaveBeenCalledWith('t@t.com');
    expect(mockToastProvider.successToast).toHaveBeenCalledTimes(1);
  });

  test('sendResetEmail calls errorToast when not successful', async () => {
    mockUserProvider.sendPasswordResetEmail.mockRejectedValue('BOOM');
    component.emailForm.value.email = 't@t.com';
    await component.sendResetEmail();
    expect(mockUserProvider.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(mockUserProvider.sendPasswordResetEmail).toHaveBeenCalledWith('t@t.com');
    expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
  });
});
