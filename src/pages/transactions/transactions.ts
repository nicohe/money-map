import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletService } from './../../services/wallets.service';
import { TransactionService } from './../../services/transactions.service';

import { Transaction } from '../../database';
import { AddingPage } from '../adding/adding';
/*

  Generated class for the Transactions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {

  transactions : any;
  title : string = "Movimientos";
  addingPage = AddingPage;

  constructor(public navCtrl: NavController, private walletService : WalletService,
   private transactionService : TransactionService) {}

  ionViewWillEnter() {

    this.walletService.validateFirstWallet();
    
    console.log(this.walletService.getID());
    

    this.loadTransactions();
  }

  loadTransactions(){
    this.transactions.all()
               .then((resultados) => this.transactions = resultados);
  }

}
