import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailPage } from './send-email.page';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';
import { UserProvider } from '../../services/user/user';

describe('SendEmailPage', () => {
  let component: SendEmailPage;
  let fixture: ComponentFixture<SendEmailPage>;

  const mockUserProvider = {
    resendConfirmEmail: jest.fn(() => Promise.resolve())
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
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the SendEmailPage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
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
});
