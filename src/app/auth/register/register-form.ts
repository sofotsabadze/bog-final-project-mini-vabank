import {FormControl} from "@angular/forms";

export interface IRegisterForm {
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
