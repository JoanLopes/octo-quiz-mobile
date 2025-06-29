import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { DeckList } from './deck-list.model';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './deck-list.page.html',
  styleUrls: ['./deck-list.page.scss']
})
export class DeckListPage implements OnInit {
  decks: DeckList[] = [];
  searchText = '';

  constructor(
    private deckService: DeckService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getDecks().subscribe(data => {
      this.decks = data;
    });
  }

  get filteredDecks() {
    return this.decks.filter(deck =>
      (deck.name + deck.description).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  logout() {
    this.authService.logout()
  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este deck?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => this.deleteDeck(id)
        }
      ]
    });

    await alert.present();
  }

  deleteDeck(id: number) {
    this.deckService.deleteDeck(id).subscribe(() => {
      this.decks = this.decks.filter(d => d.id !== id);
    });
  }
}
