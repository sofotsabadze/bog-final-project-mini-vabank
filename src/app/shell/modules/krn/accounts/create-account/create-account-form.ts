import {FormControl} from "@angular/forms";

export interface ICreateAccountForm {
    accountName: FormControl<string | null>;
    accountAmount: FormControl<number | null>;
}