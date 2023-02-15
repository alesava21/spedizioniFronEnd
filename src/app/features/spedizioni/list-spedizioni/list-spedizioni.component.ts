import { Component, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { spedizioni } from 'src/app/model/spedizioni';
import { DataSearchService } from 'src/app/shared/service/data-search.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SpedizioniService } from '../spedizioni.service';

@Component({
  selector: 'app-list-spedizioni',
  templateUrl: './list-spedizioni.component.html',
  styleUrls: ['./list-spedizioni.component.css']
})
export class ListSpedizioniComponent {

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private spedizioniService: SpedizioniService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, private dataSearchService: DataSearchService) {}
  dataSource: MatTableDataSource<spedizioni> = new MatTableDataSource<spedizioni>();
  displayedColumns: string[] = ['id', 'codiceSpedizione', 'descrizione', 'peso', 'altezza', 'lunghezza', 'nomeDestinatario', 'cognomeDestinatario',
   'dataSpedizione', 'nomeMittente', 'cognomeMittente', 'indirizzo', 'civico','regione', 'codicePostale','azioni'];
  displayedColumnsNoAdmin: string[] = ['id', 'codiceSpedizione', 'descrizione', 'peso', 'altezza', 'lunghezza', 'nomeDestinatario', 'cognomeDestinatario',
    'dataSpedizione', 'nomeMittente', 'cognomeMittente', 'indirizzo', 'civico','regione', 'codicePostale'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  ngOnInit(): void {
    this.getData();
  }

  openDialog(idCliente: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {idCliente}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.spedizioniService.getAllSpedizioni().subscribe(res => {
        this.dataSource.data = res;
      })
    });
  }


  getData() {
    this.spedizioniService.getAllSpedizioni().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["spedizioni/", id], {queryParams: {operation:"readOnly"}});
  }

  onClickDelete(id: number) {
    this.openDialog(id);
  }

  onClickAddNew() {
    this.router.navigate(["spedizioni/create"], {queryParams: {operation:"add"}});
  }

  onClickUpdate(id: number) {
    this.router.navigate(["spedizioni/edit/", id], {queryParams: {operation:"edit"}});
  }

  resetDataSource() {
    this.getData();
    this.urlSearchOperationFlag = "";
  }

}
