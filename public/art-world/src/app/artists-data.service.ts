import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from './artists/artists.component';

@Injectable({
  providedIn: 'root',
})
export class ArtistsDataService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Artist[]> {
    const url = environment.apiUrl + '/artists';
    return this._http.get<Artist[]>(url);
  }

  getOne(artistId: string): Observable<Artist> {
    const url = environment.apiUrl + '/artists/' + artistId;
    return this._http.get<Artist>(url);
  }

  deleteOne(artistId: string): Observable<Artist> {
    const url = environment.apiUrl + '/artists/' + artistId;
    return this._http.delete<Artist>(url);
  }
}
