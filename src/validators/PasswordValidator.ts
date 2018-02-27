/**
 * PasswordValidator.ts
 *
 * Created by jake
 * Created on 2/26/18
 *
 * Validation for confirm password
 */
import { FormGroup } from "@angular/forms";


export default class PasswordValidator {

  static matches (formGroup: FormGroup): any {
    if (formGroup.controls) {
      const pw = formGroup.controls['password'];
      const c_pw = formGroup.controls['confirm_password'];
      if (pw.value == c_pw.value) {
        c_pw.setErrors(null);
        pw.setErrors(null);
        return null;
      } else {
        pw.setErrors(null); // Only show error on the confirm password field
        c_pw.setErrors({mismatches: true});
        return {mismatches: true}
      }
    }
    return {mismatches: true};
  }
}