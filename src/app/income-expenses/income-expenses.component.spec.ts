import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpensesComponent } from './income-expenses.component';

describe('IncomeExpensesComponent', () => {
  let component: IncomeExpensesComponent;
  let fixture: ComponentFixture<IncomeExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeExpensesComponent]
    });
    fixture = TestBed.createComponent(IncomeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
