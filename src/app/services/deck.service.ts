import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeckList } from '../pages/deck-list/deck-list.model';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = `${environment.apiUrl}/decks/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        if (!token) {
          return throwError(() => new Error('Token não encontrado'));
        }
        return [new HttpHeaders({ 'Authorization': `Token ${token}` })];
      })
    );
  }


  getDecks(): Observable<DeckList[]> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<{ results: DeckList[] }>(this.apiUrl, { headers })
      ),
      map(response => response.results)
    );
  }

  getDeck(id: number): Observable<DeckList> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<DeckList>(`${this.apiUrl}${id}/`, { headers })
      )
    );
  }

  createDeck(data: { name: string; description: string }): Observable<DeckList> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        if (!token) {
          return throwError(() => new Error('Token não encontrado'));
        }
        const headers = new HttpHeaders({
          'Authorization': `Token ${token}`
        });
        return this.http.post<DeckList>(this.apiUrl, data, { headers });
      })
    );
  }

  updateDeck(id: number, data: { name: string; description: string }): Observable<DeckList> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        if (!token) {
          return throwError(() => new Error('Token não encontrado'));
        }
        const headers = new HttpHeaders({
          'Authorization': `Token ${token}`
        });
        return this.http.put<DeckList>(`${this.apiUrl}${id}/`, data, { headers });
      })
    );
  }

  deleteDeck(id: number): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.delete(`${this.apiUrl}${id}/`, { headers })
      )
    );
  }
}
