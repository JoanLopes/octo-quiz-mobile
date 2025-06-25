export interface Flashcard {
  id: number | null;
  question: string;
  answer: string;
  deck: number;
  deck_name: string;
  photo: string | null;
}
