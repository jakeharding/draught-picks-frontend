import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResendEmailPage } from './resend-email';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { ToastProvider } from '../../services/toast/toast';
import { UserProvider } from '../../services/user/user';

/**
 * resend-email.spec.ts
 *
 * Created by jake
 * Created on 2018-11-20
 *
 * Test ResendEmailPage.
 */

describe('ResendEmailPage', () => {
  let fixture: ComponentFixture<ResendEmailPage>;
  let component: ResendEmailPage;

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
      declarations: [ResendEmailPage, FormGroupDirective],
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
    fixture = TestBed.createComponent(ResendEmailPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the ResendEmailPage', () => {
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
