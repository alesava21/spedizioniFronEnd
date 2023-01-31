import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { spedizioni } from 'src/app/model/spedizioni';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { SpedizioniService } from '../spedizioni.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  clienteToDelete?: spedizioni;

  constructor(private spedizioniService: SpedizioniService, private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idCliente: number }) {
    if (data) {
      this.getCliente(data.idCliente);
    }
  }

  getCliente(idCliente: number) {
    this.spedizioniService.findById(idCliente).subscribe(res => {
      if (res) {
        this.clienteToDelete = { ...res }
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  // save() {
  //   this.spedizioniService.delete(this.data.idCliente).subscribe(res => {
  //     this.snackBarService.openSnackBar('Operazione effettuata correttamente.', ["blue"])
  //   });
  //   this.dialogRef.close();
  // }
}