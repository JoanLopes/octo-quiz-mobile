import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [LoginGuard],
  },
  {
    path: 'deck-list',
    loadComponent: () => import('./pages/deck-list/deck-list.page').then(m => m.DeckListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'flashcard-list',
    loadComponent: () => import('./pages/flashcard-list/flashcard-list.page').then(m => m.FlashcardListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'flashcard-execute',
    loadComponent: () => import('./pages/flashcard-execute/flashcard-execute.page').then(m => m.FlashcardExecutePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
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
  {
    path: 'deck-form',
    loadComponent: () => import('./pages/deck-form/deck-form.page').then(m => m.DeckFormPage)
  },
  {
    path: 'deck-form/:id',
    loadComponent: () => import('./pages/deck-form/deck-form.page').then(m => m.DeckFormPage)
  },


];
