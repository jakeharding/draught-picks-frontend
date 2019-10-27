/**
 * PasswordValidator.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 *
 * Test PasswordValidator.
 */
import PasswordValidator from './PasswordValidator';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

describe('PasswordValidator', () => {
  const builder = new FormBuilder();

  const mockFormGroup = builder.group({
      password: 'newPassword',
      confirm_password: 'newPassword'
  });
  mockFormGroup.controls.password.setErrors = jest.fn();
  mockFormGroup.controls.confirm_password.setErrors = jest.fn();

  it('should return null and set errors as null when valid', () => {
    const mockFormGroup = builder.group({
      password: 'newPassword',
      confirm_password: 'newPassword'
    });
    mockFormGroup.controls.password.setErrors = jest.fn();
    mockFormGroup.controls.confirm_password.setErrors = jest.fn();

    const result = PasswordValidator.matches(mockFormGroup);
    expect(result).toBeNull();
    expect(mockFormGroup.controls.password.setErrors).toHaveBeenCalledTimes(1);
    expect(mockFormGroup.controls.password.setErrors).toHaveBeenCalledWith(null);
    expect(mockFormGroup.controls.confirm_password.setErrors).toHaveBeenCalledTimes(1);
    expect(mockFormGroup.controls.confirm_password.setErrors).toHaveBeenCalledWith(null);
  });

  it('should return invalid and set errors when invalid', () => {
    const mockFormGroup = builder.group({
      password: 'newPassword',
      confirm_password: 'Password'
    });
    mockFormGroup.controls.password.setErrors = jest.fn();
    mockFormGroup.controls.confirm_password.setErrors = jest.fn();

    const result = PasswordValidator.matches(mockFormGroup);
    expect(result).toEqual({mismatches: true});
    expect(mockFormGroup.controls.password.setErrors).toHaveBeenCalledTimes(1);
    expect(mockFormGroup.controls.password.setErrors).toHaveBeenCalledWith({mismatches: true});
    expect(mockFormGroup.controls.confirm_password.setErrors).toHaveBeenCalledTimes(1);
    expect(mockFormGroup.controls.confirm_password.setErrors).toHaveBeenCalledWith({mismatches: true});
  });

  it('should return an error if form group has no controls', () => {
    const result = PasswordValidator.matches({} as FormGroup);
    expect(result).toEqual({mismatches: true});
  });

});
