import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardFormPage } from './flashcard-form.page';

describe('FlashcardFormPage', () => {
  let component: FlashcardFormPage;
  let fixture: ComponentFixture<FlashcardFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
