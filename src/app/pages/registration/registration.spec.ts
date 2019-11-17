import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPage } from './registration';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { UserProvider } from '../../services/user/user';
import { ToastProvider } from '../../services/toast/toast';
import { mockNavController, mockToastProvider } from '../../../../setup-jest';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RegistrationPage, FormGroupDirective],
      providers: [
        { provide: NavController, useValue: mockNavController},
        FormBuilder,
        { provide: ToastProvider, useValue: mockToastProvider},
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
    expect(mockNavController.navigateRoot).toHaveBeenCalledTimes(1);
    expect(mockNavController.navigateRoot).toHaveBeenCalledWith('/email-sent');
  });

  test('createUser displays a toast when userProvider.create fails', async () => {
    mockUserProvider.create.mockReturnValue(Promise.reject('error'));
    await component.createUser();
    expect(mockNavController.navigateRoot).not.toHaveBeenCalled();
    expect(mockToastProvider.errorToast).toHaveBeenCalledTimes(1);
  });
});
