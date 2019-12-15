import { Component, OnInit } from '@angular/core';
/* Manuel eklenenler */
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { BankService } from '../shared/bank.service';
import { BankAccountService } from '../shared/bank-account.service';


@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms  : FormArray =this.fb.array([]);
  bankList = [];
  constructor(private fb:FormBuilder,private bankService:BankService,private service :BankAccountService) { }

  ngOnInit() {
    /*Diziye verileri aktarmak için önce get metodunu çalıştırdıl */
    this.bankService.getBankList().subscribe(res =>this.bankList=res as [] );
    
    this.service.getBankAccountList().subscribe(
    res =>{
      if(res == [])
      this.addBankAccountForm();
      else{
        (res as []).forEach((bankAccount:any)=>{
          this.bankAccountForms.push(this.fb.group({
            BankAccountID:[bankAccount.bankAccountID],
            AccountNumber:[bankAccount.accountNumber,Validators.required],
            AccountHolder:[bankAccount.accountHolder,Validators.required],
            BankID:[bankAccount.bankID,Validators.min(1)],
            FSC:[bankAccount.fsc,Validators.required],
            Balance:[bankAccount.balance,Validators.required],
          }));
        });
      }
      }
    );
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
  /* Formdan gelen verilere göre bankaccount 'a insert etme metodu */
  recordSubmit(fg:FormGroup){
      this.service.postBankAccount(fg.value).subscribe(
        (res:any)=>{
          fg.patchValue({ BankAccountID:res.BankAccountID});

        }
      )
  }
}
