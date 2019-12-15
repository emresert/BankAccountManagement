import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private  http:HttpClient) { }
  postBankAccount(formData){
   return this.http.post(environment.apiBaseURI+'/BankAccount',formData)
 }
 getBankAccountList(){
  return this.http.get(environment.apiBaseURI+'/BankAccount')
 }
}
