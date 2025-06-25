import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Flashcard } from '../pages/flashcard-list/flashcard.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = `${environment.apiUrl}/flashcards/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      map(token => {
        if (!token) throw new Error('Token não encontrado');
        return new HttpHeaders({ Authorization: `Token ${token}` });
      })
    );
  }

  // Listar todos os flashcards
  getFlashcards(): Observable<Flashcard[]> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.get<{ results: Flashcard[] }>(this.apiUrl, { headers })
      ),
      map(response => response.results)
    );
  }

  // Obter um flashcard por ID
  getFlashcard(id: number): Observable<Flashcard> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.get<Flashcard>(`${this.apiUrl}${id}/`, { headers })
      )
    );
  }

  // Criar novo flashcard
  createFlashcard(data: { question: string; answer: string; deck: number }): Observable<Flashcard> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.post<Flashcard>(this.apiUrl, data, { headers })
      )
    );
  }

  // Atualizar flashcard
  updateFlashcard(id: number, data: { question: string; answer: string; deck: number }): Observable<Flashcard> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.put<Flashcard>(`${this.apiUrl}${id}/`, data, { headers })
      )
    );
  }

  // Deletar flashcard
  deleteFlashcard(id: number): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.delete(`${this.apiUrl}${id}/`, { headers })
      )
    );
  }
}
