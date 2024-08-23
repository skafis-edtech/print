import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyFooterComponent } from './privacy-footer.component';

describe('PrivacyFooterComponent', () => {
  let component: PrivacyFooterComponent;
  let fixture: ComponentFixture<PrivacyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
