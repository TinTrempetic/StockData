import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFinancialsComponent } from './basic-financials.component';

describe('BasicFinancialsComponent', () => {
  let component: BasicFinancialsComponent;
  let fixture: ComponentFixture<BasicFinancialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicFinancialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
