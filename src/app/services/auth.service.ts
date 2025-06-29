import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth-token';

  constructor(
    private http: HttpClient,
    private storageService: Storage,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/token/`;
    return this.http.post<{ token: string }>(url, { username, password }).pipe(
      tap(async (response) => {
        if (response && response.token) {
          await this.saveToken(response.token);
        }
      })
    );
  }

  async saveToken(token: string) {
    await this.storageService.set(this.TOKEN_KEY, token);
  }

  async getToken(): Promise<string | null> {
    return this.storageService.get(this.TOKEN_KEY);
  }

  async logout() {
    await this.storageService.remove(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
