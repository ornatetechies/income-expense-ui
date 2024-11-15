import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IncomeExpensesService, Transaction} from "./income-expenses.service";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent {
  transactionForm: FormGroup;
  formattedAmount: string = '';

  // Transaction types for the dropdown
  transactionTypes = [
    { label: 'Income', value: 'INCOME' },
    { label: 'Expense', value: 'EXPENSE' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private transactionService: IncomeExpensesService) {
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: [null, [Validators.required]],
      description: [null, [Validators.maxLength(255)]],
      transactionDate: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;

      console.log('Outgoing Payload:', formValue); // Add this for debugging

      const transaction: Transaction = {
        ...formValue,
        transactionDate: new Date(formValue.transactionDate).toISOString(), // Format date to ISO 8601
      };

      this.transactionService.sendTransaction(transaction).subscribe({
        next: (response: any) => {
          console.log('Transaction submitted successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error submitting transaction:', error);
        },
      });
    } else {
      console.error('Transaction Form is Invalid:', this.transactionForm.errors);
      this.transactionForm.markAllAsTouched();
    }
  }


  cancel(): void {
    this.router.navigate(['/dashboard']); // Update 'dashboard' to match your routing configuration
  }


}
