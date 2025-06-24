export interface DeckList {
  id: number;
  name: string;
  description: string;
  flashcards: any[]; // você pode criar um tipo específico se quiser
}