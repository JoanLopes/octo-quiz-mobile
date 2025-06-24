import { Component, OnInit } from '@angular/core';
import { DeckListService } from './deck-list.service';
import { DeckList } from './deck-list.model';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './deck-list.page.html',
  styleUrls: ['./deck-list.page.scss']
})
export class DeckListPage implements OnInit {
  decks: DeckList[] = [];
  searchText = '';

  constructor(
    private deckService: DeckListService,
    private alertController: AlertController
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
