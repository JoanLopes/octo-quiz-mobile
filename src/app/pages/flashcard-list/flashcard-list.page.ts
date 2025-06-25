import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { Flashcard } from './flashcard.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-flashcard-list',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './flashcard-list.page.html',
  styleUrls: ['./flashcard-list.page.scss']
})
export class FlashcardListPage implements OnInit {
  flashcards: Flashcard[] = [];
  searchText = '';

  constructor(
    private flashcardService: FlashcardService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadFlashcards();
  }

  loadFlashcards() {
    this.flashcardService.getFlashcards().subscribe(data => {
      this.flashcards = data;
    });
  }

  get filteredFlashcards() {
    return this.flashcards.filter(f =>
      (f.question + f.deck_name).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  async logout() {
    await this.authService.logout();
  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Deseja excluir este flashcard?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => this.deleteFlashcard(id)
        }
      ]
    });

    await alert.present();
  }

  deleteFlashcard(id: number) {
    this.flashcardService.deleteFlashcard(id).subscribe(() => {
      this.flashcards = this.flashcards.filter(f => f.id !== id);
    });
  }
}
