import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';

    this.auth.login(this.username, this.password).subscribe({
      next: async (res: any) => {
        console.log('Login successful:', res);
        await this.auth.saveToken(res.token); // <-- CHAVE CERTA É 'token'
        this.router.navigate(['/home']);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos.';
      }
    });
  }

}
