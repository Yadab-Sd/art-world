import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Art } from './artists/artists.component';

@Injectable({
  providedIn: 'root',
})
export class ArtsDataService {
  constructor(private _http: HttpClient) {}

  getAll(artistId: string): Observable<Art[]> {
    const url = environment.apiUrl + '/artists/' + artistId + '/arts';
    return this._http.get<Art[]>(url);
  }

  getOne(artistId: string, artId: string): Observable<Art> {
    const url = environment.apiUrl + '/artists/' + artistId + '/arts/' + artId;
    return this._http.get<Art>(url);
  }

  createOne(artistId: string, data: any): Observable<Art> {
    const url = environment.apiUrl + '/artists/' + artistId + '/arts';
    return this._http.post<Art>(url, data);
  }

  updateOne(artistId: string, artId: string, data: any): Observable<Art> {
    const url = environment.apiUrl + '/artists/' + artistId + '/arts/' + artId;
    return this._http.put<Art>(url, data);
  }

  deleteOne(artistId: string, artId: string): Observable<Art> {
    const url = environment.apiUrl + '/artists/' + artistId + '/arts/' + artId;
    return this._http.delete<Art>(url);
  }
}
