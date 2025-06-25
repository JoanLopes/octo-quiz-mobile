import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-flashcard-form',
  templateUrl: './flashcard-form.page.html',
  styleUrls: ['./flashcard-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FlashcardFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
