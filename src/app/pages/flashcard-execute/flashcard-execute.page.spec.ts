import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardExecutePage } from './flashcard-execute.page';

describe('FlashcardExecutePage', () => {
  let component: FlashcardExecutePage;
  let fixture: ComponentFixture<FlashcardExecutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardExecutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
