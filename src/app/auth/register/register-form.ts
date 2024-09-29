import {FormControl} from "@angular/forms";

export interface IRegisterForm {
  name: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
