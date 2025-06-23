import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-flashcard-execute',
  templateUrl: './flashcard-execute.page.html',
  styleUrls: ['./flashcard-execute.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FlashcardExecutePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
