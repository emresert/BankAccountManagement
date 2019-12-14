import { Component, OnInit } from '@angular/core';
/* Manuel eklenenler */
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { BankService } from '../shared/bank.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms  : FormArray =this.fb.array([]);
  bankList = [];
  constructor(private fb:FormBuilder,private bankService:BankService) { }

  ngOnInit() {
    /*Diziye verileri aktarmak için önce get metodunu çalıştırdıl */
    this.bankService.getBankList().subscribe(res =>this.bankList=res as [] );
    this.addBankAccountForm();
  }
  /* dropdown için push metodu */
  addBankAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      BankAccountID:[0],
      AccountNumber:['',Validators.required],
      AccountHolder:['',Validators.required],
      BankID:[0,Validators.min(1)],
      FSC:['',Validators.required],
      Balance:['',Validators.required],

    }));
  }
}
