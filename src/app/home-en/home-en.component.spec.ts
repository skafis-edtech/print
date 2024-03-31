import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnComponent } from './home-en.component';

describe('HomeEnComponent', () => {
  let component: HomeEnComponent;
  let fixture: ComponentFixture<HomeEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
