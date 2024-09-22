import {FormControl} from "@angular/forms";

export interface ISearchForm {
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  clientId: FormControl<string | null>;
}
