import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtenteService} from "../utente.service";
import {AuthService} from "../../../core/auth/auth.service";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
export interface UserForm extends FormGroup<{
  id: FormControl<any>;
  nome: FormControl<string>;
  cognome: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<any>;
  confermaPassword: FormControl<any>;
}> { }
@Component({
  selector: 'app-detail-utente',
  templateUrl: './detail-utente.component.html',
  styleUrls: ['./detail-utente.component.css']
})
export class DetailUserComponent implements OnInit {

  constructor(private userService: UtenteService,
              private authService: AuthService,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('IT');
  }


  userReactive: UserForm = this.fb.group({
    id: this.fb.control(null),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confermaPassword: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
  });

  urlFlag: string = "";
  errorMessage: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (operation?.includes("readOnly")) {
      this.userReactive.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if (!operation?.includes("add")) {
      this.userReactive.get('id')?.setValue(id);
      this.userService.findById(id).subscribe(res => {
        this.userReactive.patchValue(res);
      });
    }
  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.userService.create(this.userReactive.getRawValue()).subscribe({
        next: userItem => this.userReactive.patchValue(userItem),
        complete: () => this.router.navigate([`list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.userReactive.get('password')?.disable();
      this.userReactive.get('confermaPassword')?.disable();
      console.log(this.userReactive.value);
      this.userService.update(this.userReactive.value).subscribe({
        next: userItem => this.userReactive.patchValue(userItem),
        complete: () => this.router.navigate([`list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }
  }


}
