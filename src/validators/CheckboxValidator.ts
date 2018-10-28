/**
 * CheckboxValidator.ts
 *
 * Created by jake
 * Created on 2/26/18
 *
 * Validate a checkbox is checked.
 */
import { FormControl } from "@angular/forms";


export default class CheckboxValidator {

  static isChecked (formControl: FormControl): any {
    if (formControl.value) {
      return null;
    }
    return { notChecked: true };
  }
}
