import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms  : FormArray =this.fb.array([]);
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.addBankAccountForm();
  }
  addBankAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      BankAccountID:[0],
      AccountNumber:[''],
      AccountHolder:[''],
      BankID:[0],
      FSC:[''],
      Balance:[''],

    }));
  }
}
