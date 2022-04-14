import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiderTransactionsComponent } from './insider-transactions.component';

describe('InsiderTransactionsComponent', () => {
  let component: InsiderTransactionsComponent;
  let fixture: ComponentFixture<InsiderTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsiderTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsiderTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
