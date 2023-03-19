import { AbstractControl } from '@angular/forms';

export class MyValidations {

  static correctPass(passConfim_Ing: String, _pass_Ing: String) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (passConfim_Ing != _pass_Ing) {
        return { correctPass: true };
      } else {
        return null;
      }
    };
  }

}
