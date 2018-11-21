import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPage } from './registration';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { mockToast, mockToastController } from '../../jestGlobalMocks';
import { EmailSentPage } from '../email-sent/email-sent';

/**
 * registration.spec.ts
 *
 * Created by jake
 * Created on 2018-11-20
 *
 * Test the RegistrationPage.
 */

describe('RegistrationPage', () => {
  let fixture: ComponentFixture<RegistrationPage>;
  let component: RegistrationPage;

  const mockUserProvider = {
    create: jest.fn(() => Promise.resolve())
  };

  const mockNavController = {
    setRoot: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RegistrationPage, FormGroupDirective],
      providers: [
        { provide: NavController, useValue: mockNavController},
        { provide: NavParams, useValue: {}},
        FormBuilder,
        { provide: ToastController, useValue: mockToastController},
        { provide: UserProvider, useValue: mockUserProvider},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the RegistrationPage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should set registerForm.controls.verify_age.value to true', () => {
    component.dateSelected();
    expect(component.registerForm.controls.verify_age.value).toBe(true);
  });

  test('createUser calls navCtrl.setRoot when userProvider.create succeeds', async () => {
    await component.createUser();
    expect(mockUserProvider.create).toHaveBeenCalledTimes(1);
    expect(mockUserProvider.create).toHaveBeenCalledWith(component.registerForm.value);
    expect(mockNavController.setRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.setRoot).toHaveBeenCalledWith(EmailSentPage);
  });

  test('createUser displays a toast when userProvider.create fails', async () => {
    mockUserProvider.create.mockReturnValue(Promise.reject('error'));
    await component.createUser();
    expect(mockNavController.setRoot).not.toHaveBeenCalled();
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    expect(mockToast.present).toHaveBeenCalled();
  });
});
