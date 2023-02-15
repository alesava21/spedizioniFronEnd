import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router } from '@angular/router';
import {UtenteService} from "../utente.service";
import {User} from "../../../model/user";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-utente',
  templateUrl: './list-utente.component.html',
  styleUrls: ['./list-utente.component.css']
})
export class ListUtenteComponent implements OnInit{

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private userService: UtenteService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {}
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dateCreated', 'username', 'azioni'];
  displayedColumnsNoAdmin: string[] = ['id', 'nome', 'cognome', 'dateCreated', 'username'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getAllUsers().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["utenti/", id], {queryParams: {operation:"readOnly"}});
  }

  // onClickDelete(id: number) {
  //   this.openDialog(id);
  // }

  onClickAddNew() {
    this.router.navigate(["utenti/create"], {queryParams: {operation:"add"}});
  }

  onClickUpdate(id: number) {
    this.router.navigate(["utenti/edit/", id], {queryParams: {operation:"edit"}});
  }

}
