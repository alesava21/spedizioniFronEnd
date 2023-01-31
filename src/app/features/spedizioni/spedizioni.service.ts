import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { spedizioni } from 'src/app/model/spedizioni';

@Injectable({
  providedIn: 'root'
})
export class SpedizioniService {

  private apiServer = 'http://localhost:8080/api/spedizioni';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllSpedizioni(): Observable<spedizioni[]> {
    return this.http.get<spedizioni[]>(this.apiServer);
  }

  findById(id: number): Observable<spedizioni> {
    return this.http.get<spedizioni>(this.apiServer + "/" + id);
  }

  create(spedizioniInput: spedizioni): Observable<spedizioni> {
    return this.http.post<spedizioni>(this.apiServer, spedizioniInput, this.httpOptions);
  }

  update(spedizioniInput: spedizioni): Observable<spedizioni> {
    return this.http.put<spedizioni>(this.apiServer + "/" + spedizioniInput.id, spedizioniInput, this.httpOptions);
  }
}
