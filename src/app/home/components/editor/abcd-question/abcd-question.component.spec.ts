import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcdQuestionComponent } from './abcd-question.component';

describe('AbcdQuestionComponent', () => {
  let component: AbcdQuestionComponent;
  let fixture: ComponentFixture<AbcdQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcdQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbcdQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
