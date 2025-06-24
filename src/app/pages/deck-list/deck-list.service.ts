import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeckList } from './deck-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckListService {
  private apiUrl = 'http://localhost:8000/api/decks/';

  constructor(private http: HttpClient) {}

  getDecks(): Observable<DeckList[]> {
    return this.http.get<DeckList[]>(this.apiUrl);
  }

  deleteDeck(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
