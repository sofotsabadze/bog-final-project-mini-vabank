import {FormControl} from "@angular/forms";

export interface IRegisterForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    plusPoints: FormControl<number | null>;
}