import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { DeckService } from '../../services/deck.service';
import { Flashcard } from '../flashcard-list/flashcard.model';
import { DeckList } from '../deck-list/deck-list.model';

@Component({
  selector: 'app-flashcard-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './flashcard-form.page.html',
  styleUrls: ['./flashcard-form.page.scss']
})
export class FlashcardFormPage implements OnInit {
  id: number | null = null;
  question = '';
  answer = '';
  deck: number | null = null;
  decks: DeckList[] = [];
  isLoading = false;

  constructor(
    private flashcardService: FlashcardService,
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loadFlashcard();
    }
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getDecks().subscribe(data => {
      this.decks = data;
    });
  }

  async loadFlashcard() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    await loading.present();

    this.flashcardService.getFlashcard(this.id!).subscribe({
      next: async (f: Flashcard) => {
        this.question = f.question;
        this.answer = f.answer;
        this.deck = f.deck;
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Erro ao carregar o flashcard.');
      }
    });
  }

  async submit() {
    if (!this.question.trim() || !this.answer.trim() || !this.deck) {
      this.showToast('Preencha todos os campos.');
      return;
    }

    const data = {
      question: this.question,
      answer: this.answer,
      deck: this.deck
    };

    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();

    const callback = {
      next: async () => {
        await loading.dismiss();
        this.showToast(this.id ? 'Flashcard atualizado!' : 'Flashcard criado!');
        this.router.navigate(['/flashcard-list']);
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Erro ao salvar o flashcard.');
      }
    };

    if (this.id) {
      this.flashcardService.updateFlashcard(this.id, data).subscribe(callback);
    } else {
      this.flashcardService.createFlashcard(data).subscribe(callback);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'primary',
      position: 'bottom'
    });
    await toast.present();
  }
}
