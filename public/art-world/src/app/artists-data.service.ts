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

  getAll(offset: number, limit: number): Observable<Artist[]> {
    const url =
      environment.apiUrl + '/artists?' + 'offset=' + offset + '&count=' + limit;
    return this._http.get<Artist[]>(url);
  }

  getOne(artistId: string): Observable<Artist> {
    const url = environment.apiUrl + '/artists/' + artistId;
    return this._http.get<Artist>(url);
  }

  createOne(data: any): Observable<Artist> {
    const url = environment.apiUrl + '/artists';
    return this._http.post<Artist>(url, data);
  }

  updateOne(artistId: string, data: any): Observable<Artist> {
    const url = environment.apiUrl + '/artists/' + artistId;
    return this._http.put<Artist>(url, data);
  }

  deleteOne(artistId: string): Observable<Artist> {
    const url = environment.apiUrl + '/artists/' + artistId;
    return this._http.delete<Artist>(url);
  }
}
