import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { DeckList } from '../deck-list/deck-list.model';
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-deck-form',
  standalone: true,
  templateUrl: './deck-form.page.html',
  styleUrls: ['./deck-form.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class DeckFormPage implements OnInit {
  id?: number;
  name = '';
  description = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loadDeck();
    }
  }

  async loadDeck() {
    this.isLoading = true;
    const loading = await this.loadingController.create({ message: 'Carregando deck...' });
    await loading.present();

    this.deckService.getDeck(this.id!).subscribe({
      next: async (deck: DeckList) => {
        this.name = deck.name;
        this.description = deck.description;
        await loading.dismiss();
        this.isLoading = false;
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Erro ao carregar deck.');
      }
    });
  }

  async submitForm() {
    if (!this.name.trim()) {
      this.showToast('O nome é obrigatório.');
      return;
    }

    const data = { name: this.name, description: this.description };
    const loading = await this.loadingController.create({ message: 'Salvando...' });
    await loading.present();

    const callback = {
      next: async () => {
        await loading.dismiss();
        this.showToast(this.id ? 'Deck atualizado!' : 'Deck criado!');
        this.router.navigate(['/deck-list']);
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Erro ao salvar. Tente novamente.');
      }
    };

    if (this.id) {
      this.deckService.updateDeck(this.id, data).subscribe(callback);
    } else {
      this.deckService.createDeck(data).subscribe(callback);
    }
  }

  logout() {
    this.authService.logout()
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }
}
