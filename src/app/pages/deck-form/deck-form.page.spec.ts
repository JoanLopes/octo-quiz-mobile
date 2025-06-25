import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckFormPage } from './deck-form.page';

describe('DeckFormPage', () => {
  let component: DeckFormPage;
  let fixture: ComponentFixture<DeckFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
