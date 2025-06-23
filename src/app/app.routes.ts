import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'deck-list',
    loadComponent: () => import('./pages/deck-list/deck-list.page').then( m => m.DeckListPage)
  },
  {
    path: 'flashcard-list',
    loadComponent: () => import('./pages/flashcard-list/flashcard-list.page').then( m => m.FlashcardListPage)
  },
  {
    path: 'flashcard-execute',
    loadComponent: () => import('./pages/flashcard-execute/flashcard-execute.page').then( m => m.FlashcardExecutePage)
  },
];
