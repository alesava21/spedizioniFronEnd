import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataSearchService } from 'src/app/shared/service/data-search.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service'; 
import { SpedizioniService } from '../spedizioni.service';

export interface spedizioniForm extends FormGroup<{
  id: FormControl<any>;
  codiceSpedizione: FormControl<any>;
  descrizione: FormControl<string>;
  peso: FormControl<string>;
  altezza: FormControl<string>;
  lunghezza: FormControl<string>;
  nomeDestinatario: FormControl<string>;
  cognomeDestinatario: FormControl<string>;
  nomeMittente: FormControl<string>;
  cognomeMittente: FormControl<string>;
  indirizzo: FormControl<string>;
  civico: FormControl<string>;
  codicePostale: FormControl<string>;
  regione:FormControl<any>
}> { }

@Component({
  selector: 'app-detail-spedizioni',
  templateUrl: './detail-spedizioni.component.html',
  styleUrls: ['./detail-spedizioni.component.css']
})

export class DetailSpedizioniComponent {
  options: string[] = ['Abruzzo', 'Basilicata', '	Calabria','	Campania', 'Emilia-Romagna', 'Friuli Venezia Giulia','Lazio', 'Liguria',
   'Lombardia','Marche', 'Molise', 'Piemonte','Puglia', 'Sardegna', 'Sicilia','Toscana', 'Trentino-Alto Adige', '	Umbria','Valle dAosta', 'Veneto'];
  
 constructor(private spedizioniService: SpedizioniService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataSearchService: DataSearchService) {
  }

  spedizioniReactive: spedizioniForm = this.fb.group({
    id: this.fb.control(null),
    codiceSpedizione: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    peso: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
    altezza: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
    lunghezza: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
    nomeDestinatario: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognomeDestinatario: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    nomeMittente: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognomeMittente: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    indirizzo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    civico: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
    codicePostale: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
    regione: this.fb.control(null),
  });

  urlFlag: string = "";

  ngOnInit(): void {
    let operation = this.route.snapshot.queryParamMap.get('operation');
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    let codiceSpedizione: number = Number(this.route.snapshot.paramMap.get('codiceSpedizione'));
    if (operation?.includes("readOnly")) {
      this.spedizioniReactive.disable();
      this.urlFlag = "readOnlyActivated";
    }
    if (operation?.includes("edit")) {
      this.urlFlag = "editActivated";
    }
    if (operation?.includes("add")) {
      this.urlFlag = "addActivated";
    }
    if(operation?.includes("search")) {
      this.urlFlag = "searchActivated";
    }
    if (!operation?.includes("add") && !operation?.includes("search")) {
      this.spedizioniReactive.get('id')?.setValue(id);
      this.spedizioniReactive.get('codiceSpedizione')?.setValue(codiceSpedizione);
      this.spedizioniService.findById(id).subscribe(res => {
        this.spedizioniReactive.patchValue(res);
      });
    }

  }

  handleFormRequest(): void {
    if (this.urlFlag == "addActivated") {

      this.spedizioniService.create(this.spedizioniReactive.getRawValue()).subscribe({
        next: clienteItem => this.spedizioniReactive.patchValue(clienteItem),
        complete: () => this.router.navigate([`/spedizioni/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }

    if (this.urlFlag == "editActivated") {
      this.spedizioniService.update(this.spedizioniReactive.value).subscribe({
        next: clienteItem => this.spedizioniReactive  .patchValue(clienteItem),
        complete: () => this.router.navigate([`/spedizioni/list`], this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])!)
      });
    }
  }



}
